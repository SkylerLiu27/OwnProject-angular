import { Injectable } from '@angular/core';

declare var io: any;
@Injectable()
export class CollaborationService {

  collaborationSocket: any;
  
  constructor() { }
  
  init(editor: any, sessionId: string): void{
    this.collaborationSocket = io(window.location.origin, {query: "sessionId=" + sessionId});
    this.collaborationSocket.on("change", (delta: string) => {
      console.log("collaboration editore changes by" + delta);
      //parse delta from string to object 
      delta = JSON.parse(delta);
      editor.lastAppliedChange = delta;
      //editor taks an array of deltas objects 
      //.applyDeltas(delta) will NOT working, [delta] will do
      editor.getSession().getDocument().applyDeltas([delta]);
    });
  }
  
  change(delta: string): void{
    this.collaborationSocket.emit("change", delta);
  }
  
  restoreBuffer(): void{
    this.collaborationSocket.emit("restoreBuffer");
  }

}
