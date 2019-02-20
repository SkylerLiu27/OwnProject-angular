import { Injectable } from '@angular/core';
import { problems } from "../fake-data"
import { Problem } from "../models/problem.model"
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class DataService {

  private _problemSource  = new BehaviorSubject<Problem[]>([]);

  constructor(private http: HttpClient) { }
  
  getProblems(): Observable<Problem[]>{
    this.http.get('api/v1/problems')
      .toPromise()
      .then((res: any) => {
        this._problemSource.next(res);
      })
      .catch(this.handleErr);
      return this._problemSource.asObservable();
  }

  getProblem(id: number): Promise<Problem>{
    return this.http.get(`api/v1/problems/${id}`)
      .toPromise()
      .then((res: any) => {return res})
      .catch(this.handleErr)
  }

  addProblem(problem: Problem) {
    //use httpHeader to assign the content type, use JSON file
    let options  = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post('api/v1/problems', problem, options)
      .toPromise()
      .then((res: any) => {
        this.getProblems();
        return res;
      })
      .catch(this.handleErr);
  }
  
  handleErr(error: any): Promise<any>{
    return Promise.reject(error || error.body);
  }

  buildAndRun(data: any): Promise<any>{
    // http headers
    const option = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post('/api/v1/build_and_run', data, option)
      .toPromise()
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(this.handleErr);
  }

}
