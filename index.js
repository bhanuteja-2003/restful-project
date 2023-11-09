import express from 'express';
import { v4 as uuid } from 'uuid';
import  methodoverride  from 'method-override';
import mongoose from 'mongoose';
import Comment from './models/comments.js'


const app = express();
const port = 3000;

const dbURL ="mongodb+srv://bhanu2:bhanu2@nodetutsnetninja.395fujk.mongodb.net/" ;
mongoose.connect(dbURL).then((result)=>{
    console.log("connected to Data Base");
    app.listen(port , ()=>{
        console.log(`server listening on port ${port}`);
    })
})
.catch((err)=>{console.log(err);})

app.use(express.urlencoded({extended:true}))
app.use(methodoverride('_method'))

// let comments =[
//     {
//         id: uuid(),
//         username:"bhanu",
//         comment : "What is this??"
//     },
//     {
//         id: uuid(),
//         username:"Teja",
//         comment : "Who are you??"
//     },
//     {
//         id: uuid(),
//         username:"sunny",
//         comment : "Why did you do??"
//     },
//     {
//         id: uuid(),
//         username:"bunny",
//         comment : "What a shot??"
//     },
// ]


// ************************ GET requests **********************************
app.get('/', (req, res) => {
    // res.render("index.ejs");
    res.redirect("/comments")
})

app.get("/comments" , (req,res)=>{
    // to get all data from database perfrom find() on Comment  ,not on instance
    Comment.find().sort({createdAt:-1})
        .then((result)=>{
            console.log(result);
            res.render("index.ejs" , {
                comments : result,
            })
        })
        .catch((err)=>{console.log(err);})
    
})

app.get("/comments/new" , (req,res)=>{
    res.render("new.ejs");
})

app.get("/comments/:id" ,(req,res)=>{
    const {id} = req.params; // this will return a string
    console.log(id);
    
    // Comment.findById(id)
    // .then((result)=>{
    //     // console.log(result);
    //     const comment = result.find(c=>c.id===(id));
    //     res.render("show.ejs" , {comment})
    // })
    // .catch((err)=>{console.log(err);})
    Comment.findById(id)
    .then((result)=>{
        console.log("Comment with the specified ID: ",result);
        res.render("show.ejs" , {comment:result})
    })
    .catch((err)=>{console.log(err);})

    // console.log(comment);
    

})

app.get("/comments/:id/edit" , (req,res)=>{
    const {id }= req.params;
    Comment.findById(id)
    .then((result)=>{
        console.log("Comment with the specified ID: ",result);
        res.render("edit.ejs" ,{comment:result});
    })
    .catch((err)=>{console.log(err);})
    
    

})

// ************************ POST requests **********************************

app.post("/comments" , (req,res)=>{
    // console.log(req.body);
    
    const {username , comment} = req.body;
    const tcomment = new Comment({
        username:username ,
        comment:comment
    });
    // to add data to database we need to save on instance on Comment
    tcomment.save()
        .then((result)=>{
            res.redirect("/comments")
            console.log(result);
        })
        .catch((err)=>{console.log(err);})
        
    
})

// // ************************ PATCH requests **********************************
app.patch('/comments/:id' , (req,res)=>{
    const {id} = req.params;
    let newCommentObj = req.body;
    Comment.updateOne( {_id :id} , {$set:newCommentObj})
        .then(()=>{
            res.redirect("/comments");
        })
        .catch((err)=>{console.log(err);})
    
})

// // **************** DELETE request ********************************

app.delete("/comments/:id" , (req,res)=>{
    const {id} = req.params;
    Comment.findByIdAndDelete(id)
        .then(()=>{
            res.redirect("/comments");
        })
        .catch((err)=>{
            console.log(err);
        })
    // comments = comments.filter(c=>c.id!==(id));
    

})



