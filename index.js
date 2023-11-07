import express from 'express';
import { v4 as uuid } from 'uuid';
import  methodoverride  from 'method-override';


const app = express();
const port = 3000;

app.use(express.urlencoded({extended:true}))
app.use(methodoverride('_method'))

let comments =[
    {
        id: uuid(),
        username:"bhanu",
        comment : "What is this??"
    },
    {
        id: uuid(),
        username:"Teja",
        comment : "Who are you??"
    },
    {
        id: uuid(),
        username:"sunny",
        comment : "Why did you do??"
    },
    {
        id: uuid(),
        username:"bunny",
        comment : "What a shot??"
    },
]
// ************************ GET requests **********************************
app.get('/', (req, res) => {
    res.render("index.ejs")
})

app.get("/comments" , (req,res)=>{
    res.render("index.ejs" , {
        comments : comments,
    })
})

app.get("/comments/new" , (req,res)=>{
    res.render("new.ejs");
})

app.get("/comments/:id" ,(req,res)=>{
    const {id} = req.params; // this will return a string
    const comment = comments.find(c=>c.id===(id));
    // console.log(comment);
    res.render("show.ejs" , {comment})

})

app.get("/comments/:id/edit" , (req,res)=>{
    const {id }= req.params;
    const comment = comments.find(c=>c.id===(id));
    res.render("edit.ejs" ,{comment});

})

// ************************ POST requests **********************************

app.post("/comments" , (req,res)=>{
    // console.log(req.body);
    let id =  uuid();
    const {username , comment} = req.body;
    comments.push({id, username, comment});
    // res.send("It worked")
    res.redirect("/comments")
})

// // ************************ PATCH requests **********************************
app.patch('/comments/:id' , (req,res)=>{
    const {id} = req.params;
    const newCommentText = req.body.comment;
    console.log(newCommentText);
    const Foundcomment = comments.find(c=>c.id===(id));
    Foundcomment.comment = newCommentText;
    res.redirect("/comments");
})

// // **************** DELETErequest ********************************

app.delete("/comments/:id" , (req,res)=>{
    const {id} = req.params;
    comments = comments.filter(c=>c.id!==(id));
    res.redirect("/comments");

})



app.listen(port , ()=>{
    console.log(`server listening on port ${port}`);
})