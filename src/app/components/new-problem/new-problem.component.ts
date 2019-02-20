import { Component, OnInit } from '@angular/core';
import { Problem } from '../../models/problem.model';
import { DataService } from '../../services/data.service';

const DEFAULT_PRO: Problem = Object.freeze({
  id: 0,
  name: '',
  description: '',
  difficulty: 'easy'
})
@Component({
  selector: 'app-new-problem',
  templateUrl: './new-problem.component.html',
  styleUrls: ['./new-problem.component.css']
})

export class NewProblemComponent implements OnInit {
  newProblem: Problem;
  difficulties: string[] = ['easy', 'medium', 'hard', 'super'];
  constructor(private dataService : DataService) { }
  ngOnInit() {
    this.newProblem = Object.assign({ }, DEFAULT_PRO);
  }
  addProblem() {
    this.dataService.addProblem(this.newProblem);
    this.newProblem = Object.assign({}, DEFAULT_PRO);
  }
}
