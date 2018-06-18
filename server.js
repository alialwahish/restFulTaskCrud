var express = require("express");
var app=express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restfulUsers_db');


var MongoSchema = new mongoose.Schema({
    title:{type: String, required:true, minlength:3},
    description:{type:String,default:""},
    complete:{type:Boolean,default:false}   
    },
    {timestamps:true}
)

mongoose.model("Mongo",MongoSchema);

var Mongo = mongoose.model('Mongo');
app.use(express.static(__dirname+'/fistAng/dist/fistAng'))

var path= require("path");
var bodyParser= require("body-parser");


app.use(bodyParser.json());

// Mongo.remove({},function(done){});



// app.get('/editTsk/:id',function(req,res){
//     var id=req.param.id
//     console.log("id "+req.param.id);
//     console.log("from server js the req.body",req.body)
//     Mongo.update({_id:req.params.id},{$set:{title:req.body.title,description:req.body.description}},function(err,task){
        
//         res.json(task.name);
//     })
// })



app.post('/remTask',function(req,res){
    
    console.log("at the server deleting id ",req.body._id)
    
    
    console.log("deleting task id"+ req.param.id )
    Mongo.deleteOne({id:req.param.id},function(err){
        console.log("removed task")
    })
    Mongo.find({},function(err,data){
        res.json(data)
    })

    
})



app.post('/editTsk',function(req,res){
    
    console.log("in the server printing sent request",req.body)

    console.log("in the server printing sent task id",req.body._id)
    console.log("in the server printing sent task titel ",req.body.title)
    console.log("in the server printing sent task desc ",req.body.description)

    Mongo.findByIdAndUpdate(req.body._id,{$set:{title:req.body.title,description:req.body.description}},function(err,task){
        console.log("Comming after update",task)
        
        if(err){
            console.log("update Error")
        }
        else{
            console.log("update Complete showing result in the server")
           Mongo.find({},function(err,data){
                res.json(data)
            })
                
        }
     })

    // Mongo.findByIdAndUpdate(id)



})




app.get('/task/:id',function(req,res){
    console.log("grabbing one task , task id "+req.params.id)
    Mongo.find({_id:req.params.id},function(err,task){
        res.json(task);
    })
})




app.get('/tasks',function(req,res){

    console.log("entering db")
    Mongo.find({},function(err,data){
        res.json(data)
    })

})


app.post('/cTask',function(req,res){
    console.log("in the server",req.body)
})



app.post('/task',function(req,res){
    console.log("creating a title ");
    Mongo.create({title:req.body.title,description:req.body.description,complete:req.body.complete},function(err){
        if(err){
            res.json({m:"err"})
        }
        else{
            console.log("task added");
    
        Mongo.find({},function(err,tasks){
            if(err){
                res.json({message:"Error",error:err})
            }
            else{
                console.log("responding");
    
                res.json({message:"success",tasks})
          
            }
        })
        }
        
        
    })
    
    
    

})



app.listen(8000,function(){
    console.log("Listining on port 8000")
})
app.use(bodyParser.json());