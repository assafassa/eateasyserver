const mongoose=require('mongoose');
let Schema=mongoose.Schema;
let recipeSchema=new Schema({
    title: {
        type: String,
        required:true
    },
    photolink: {
        type: String,
        required:false
    },
    link: {
        type: String,
        required:true
    },
    recipe: {
        type: String,
        required:false
    }
},{timestamps: true});


function  createrecipeSchema(username){
    
    let Recipe = mongoose.model('Recipe', recipeSchema, username)
    return ({Recipe})
}

module.exports = {
    createrecipeSchema
    
};