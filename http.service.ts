import { Injectable } from '@angular/core';
import {HttpClient } from "@angular/common/http";
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) {  
  
    
    // this.getTasks();
    // this.remTsk();
    // this.editTask();
    // this.getTask();
  }
 
  remTsk(data){
    console.log("at the service task id ")
    return this._http.post('/remTask',data);
  }



  editTask(data){
  //   console.log("grabbing one task");
  //   let tempObs = this._http.get('/editTsk/5b25986ea780a85280b75857');
  //   tempObs.subscribe(data => console.log("Got Task",data)) 
    return this._http.post('/editTsk',data);
}

  // getTask(){
  //   console.log("grabbing one task");
  //   let tempObs = this._http.get('/task/5b25986ea780a85280b75857');
  //   tempObs.subscribe(data => console.log("Got our tasks",data))  
  // }
  
  getTasks(){
 
  return this._http.get('/tasks');
  
  }

  createTask(data){
   return this._http.post('/task',data);
  }
  


  

}



