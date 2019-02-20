import { Component, OnInit } from '@angular/core';
import { CollaborationService } from "../../services/collaboration.service"
import { ActivatedRoute, Params } from "@angular/router";
import { DataService } from "../../services/data.service"
//declare var ace
declare var ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  editor: any;
  languages: string[] = ['Java', 'Python'];
  language: string = 'Java';
  sessionID: string; 
  result: string; // the execution result of the code
  defaultContent = {
    'Java': `public static void main(String[] args) {
      // Type your Java code here.
    }`,
    'Python': `class Solution:
    def example():
      # write your python code here.` 
  }

  constructor(private collaboration: CollaborationService, private routes: ActivatedRoute,
              private dataService: DataService) { }

  ngOnInit() {
    //get sessionID and initEditor
    this.routes.params.subscribe(params => {
      this.sessionID = params['id'];
      //init the new editor
      this.initEditor();
      //resotre the previous data, if possible
      this.collaboration.restoreBuffer();
    })
  }

  initEditor(): void{
    //editor property setting
    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/eclipse");
    this.editor.setValue(this.defaultContent[this.language]);
    this.editor.session.setMode("ace/mode/java");

    //init editor collaboration service, pass editor as params for callback
    this.collaboration.init(this.editor, this.sessionID);
    this.editor.lastAppliedChange = null;
    
    //regist editor change. emit data to server
    //JSON.stringify, object => string
      this.editor.on("change", (e) => {
      console.log("editor changes: " + JSON.stringify(e));
      if(this.editor.lastAppliedChange != e){
        this.collaboration.change(JSON.stringify(e));
      }
    })
  }

  resetEditor(): void {
    //reset content 
    this.editor.setValue(this.defaultContent[this.language]);
    this.editor.getSession().setMode("ace/mode/" + this.language.toLowerCase());
  }

  setLanguage(language: string): void{
    this.language = language;
    this.resetEditor();
  }

  submit(): void {
    // get user's code from editor
    let user_code = this.editor.getValue();
    //console.log("User code: " + user_code);
    const data = {
      'code': user_code,
      'lang': this.language.toLowerCase()
    }
    this.dataService.buildAndRun(data)
      .then(res => {
        //console.log("res is: " + res);
        this.result = res;
      });
  }
}
