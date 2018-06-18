import { Component, OnInit, NgModule } from '@angular/core';
import {HttpService } from "./http.service"
import { Observable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'MEAN';
  tasks ;
  clicked=false;
  descs=[];
  updtTask: any;
  uNew:any;
  i;
  newTask :any;
  frmClick =false;
  crntTsk:any;



  constructor(private  _HttpService: HttpService){
    
  }


  deleteTsk(data){
    
    console.log("compontnt Delete task ",data['_id'])
    let obsDat= this._HttpService.remTsk(data);
    obsDat.subscribe(data => {
      this.tasks= data;     
    })
  }


  editTask(){
    console.log("Edit task")

    var data = this.crntTsk;
    data.title=this.uNew.title;
    data.description=this.uNew.description;
    let obsDat= this._HttpService.editTask(data)
    console.log("sending to server update",data)
    obsDat.subscribe(data => {
      this.tasks= data;     
     
    })
    this.newTask={title:"",description:""}
    this.uNew={title:"",description:""}   
    this.frmClick=false;
  }


  

  clkEdit(desc){
    this.updtTask=desc;
    this.crntTsk=desc
    console.log(desc)
    this.frmClick =true;
  }


  onSubmit(){
    console.log(this.newTask)
    var data=this.newTask;
    let obsDat= this._HttpService.createTask(data)
    obsDat.subscribe(data => {
      console.log("Got Dat Frm Server",data)
      this.tasks= data;
    })
    obsDat= this._HttpService.getTasks()
    obsDat.subscribe(data => {
      this.tasks= data;

    }) 
    this.newTask={title:"",description:""}

  }



  ngOnInit(){
    this.newTask={title:"",description:""}
    this.uNew={title:"",description:""}
  }

  // crtTask(event){
    
  //   let obsDat= this._HttpService.createTask(data)
  //   obsDat.subscribe(data => {
  //     console.log("Got Dat Frm Server",data)
  //     console.log("The event: ${event}")
  //     this.tasks= data;
      


  //   })
    
  // }
  


  showDisc($event,index){
    this.clicked=true;
    this.descs.push(this.tasks[index]);
    this.i=index;
    this.frmClick=false;

  }
  getTasksFrmSrvc(event?){
    let obsDat= this._HttpService.getTasks()
    obsDat.subscribe(data => {this.tasks= data;})
  }
}
