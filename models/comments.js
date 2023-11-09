import mongoose from "mongoose";

const Schema = mongoose.Schema;

const  commentSchema = new Schema( {
    // id : {
    //     type: String ,
    //     required: true
    // }, 
    username : {
        type:String ,
        required:true
    } ,
    comment : {
        type :String ,
        required:true
    }
}  , {timestamps:true} );

const Comment = mongoose.model('Blog' , commentSchema);

export default Comment;

