const express=require("express");
const app=express();
const path=require("path");
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override')
const port=8000;

//middleware
app.set("views engine","ejs");
app.set("views",path.join(__dirname,"views"))

app.use(express.static(path.join(__dirname,"public")));
app.use(express.static("public"));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(methodOverride('_method'))
//create Students 
let students=[
    {   id:uuidv4(),
        name:"shiv",
        rollno:"01",
        address:"abcdss"
    }
]

//route
app.get("/students",(req,res)=>{
 res.render("index.ejs",{students});
})

app.get("/students/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/students",(req,res)=>{
 let{name,rollno,address}=req.body;
 let id=uuidv4();
 students.push({id,name,rollno,address});
 res.redirect("/students");
})
//find by id
app.get("/students/:id",(req,res)=>{
    let {id}=req.params;
    let student=students.find((st)=>id===st.id);
    res.render("show.ejs",{student});
})
//patch
app.patch("/students/:id",(req,res)=>{
    let{id}=req.params;
    let newname=req.body.name;
    let newrollno=req.body.rollno;
    let newaddress=req.body.address;
    let student=students.find((st)=>id===st.id);
    student.rollno=newrollno;
    student.address=newaddress;
    student.name=newname;
    res.redirect("/students");
})
app.get("/students/:id/edit",(req,res)=>{
    let{id}=req.params;
    let student=students.find((st)=>id===st.id);
    res.render("edit.ejs",{student});
})
//server
app.listen(port,()=>{
    console.log(`server running on ${port}`);
})