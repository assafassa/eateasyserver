const mongoose=require('mongoose');
let Schema=mongoose.Schema;
let recipeSchema=new Schema({
    Id:{
        type: String,
        required:true

    },
    title: {
        type: String,
        required:true
    },
    link: {
        type: String,
        required:true
    },
    recipe: {
        type: String,
        required:true
    }
},{timestamps: true});


function  createrecipeSchema(username){
    
    let Recipe = mongoose.model('Recipe', recipeSchema, username)
    return ({Recipe})
}

module.exports = {
    createrecipeSchema
    
};