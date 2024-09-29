const express=require('express')
const mongoose=require('mongoose');
const User= require('../models/users');
const nodemailer=require('nodemailer')
const bcrypt=require('bcrypt')
const secretkey='sKt408oGhEDVcX/su8oRkehvMoUkXvFtkkcvJdoNpqKO9ycQ.h0vIKA2s5QF0AVWUe'
const cookieParser=require('cookie-parser');
const jwt=require('jsonwebtoken');

const maxAge=24*60*60*365
function createtoken(id,time){
    return jwt.sign({id},secretkey,{
        expiresIn: time
    });
}

module.exports.signup_post=(req,res)=>{
    let {username, email, action}= req.body;
    User.findOne({ $or: [
        { username: username },
        { email: email }
      ]})
        .then(user=>{
            let messegeback={}
            if (user){
                messegeback.result='Username or mail exits.'
                if (action=='reset password'){
                    messegeback.username=user.username
                    messegeback.email=user.email
                }
                res.json(messegeback); 
            }else {
                messegeback.result='Username or mail no exits.'
                if (action=='create user'){
                    messegeback.username=username
                    messegeback.email=email
                }
                res.json(messegeback);  
            }   
        })
        .catch((err)=>console.log(err))
}

const messagebodyreset="We received a request to reset your password for your Eat Easy account. If you made this request, please use the code below to reset your password and regain access to your account:"
const messagebodycreate="You're almost ready to start enjoying Eat Easy. Just one more step! Use the code below to verify your email address and unlock access to delicious recipes and features."

module.exports.signupverifymail_post=async (req,res)=>{
    
    let {email, action}=req.body
    
    let randomverifycode=(Math.floor(Math.random()*1000000)).toString()
    let messagebody
    if (action=='create user'){

        messagebody=messagebodycreate
    }else if(action=='reset password'){
        messagebody=messagebodyreset
    }
    let mailhtml=
    `
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Eat Easy - Email Verification</title>
    <style>
        body {
        background-color: #fdfdfd;
        font-family: 'Helvetica Neue', Arial, sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        }

        .container {
        max-width: 500px;
        background-color: #fff;
        color: #333;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.1);
        text-align: center;
        border: 2px solid #f14f4f;
        }

        .title {
        font-size: 28px;
        color: #f14f4f;
        font-weight: bold;
        margin-bottom: 20px;
        }

        .messageusername {
        font-size: 20px;
        color: #555;
        margin-bottom: 15px;
        }

        .messagebody {
        font-size: 18px;
        color: #555;
        margin-bottom: 25px;
        line-height: 1.5;
        }

        .verify-code {
        background-color: #f14f4f;
        color: white;
        padding: 15px;
        border-radius: 8px;
        font-size: 22px;
        font-weight: bold;
        display: inline-block;
        letter-spacing: 2px;
        }

        .cta {
        margin-top: 30px;
        font-size: 16px;
        color: #777;
        }

        .footer {
        margin-top: 40px;
        font-size: 14px;
        color: #999;
        }
    </style>
    </head>
    <body>
    <div class="container">
        <div class="title">Confirm Your Email</div>
        <div class="messageusername">
        Hello There!
        </div>
        <div class="messagebody">
        ${messagebody}
        </div>
        <div class="verify-code">${randomverifycode}</div>
        <div class="cta">
        <p>Please enter this code in the app to confirm your email address.</p>
        </div>
        <div class="footer">
        If you didn't request this, you can safely ignore this email.
        </div>
    </div>
    </body>
    </html>

    `
    
    let messegeback={}
    let transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com', 
        port: 587,  
        secure: false,
        auth: {
          user: 'EatEasyApp@outlook.co.il',
          pass: '1989ASSAFliel',
        },
      });
    transporter.sendMail({
        from: 'EatEasyApp@outlook.co.il',
        to:email,
        subject:'Verification Code for Eat Easy App',
        html:mailhtml,
    })
    .then(async (info)=>{
        if(info.messageId){
            
            messegeback.result='messege sent'
            let token= createtoken(randomverifycode,600)
            res.cookie('jwt',token,{httpOnly:false, maxAge:600*1000})
            res.json(messegeback);
            
        }else{
            messegeback.result='messege not sent'
            res.json(messegeback);            
        }
    })
    .catch((e)=>console.log(e))

}

module.exports.signupcheckcode_post=async (req,res)=>{
    
    let decodedverifycode=req.decodedToken.id
    let messegeback=req.body
    let {verifycode}=req.body
    if (decodedverifycode==verifycode){
        
        messegeback.result='Varified, create password.'
        res.json(messegeback);
    }else {
        messegeback.result='Not varified, try again'
        res.json(messegeback); 
    }
}

module.exports.signupsetaccount_post=async (req,res)=>{
    let messegeback={}
    let{username,email,password,action,verifycode,cart,groceries,recipes}=req.body
    console.log(req.body)
    let decodedverifycode=req.decodedToken.id
    if (verifycode==decodedverifycode){
        if (action=='reset password'){
            
            let user=await User.findOne({ email: email });
            if (user){
                username=user.username
                cart=user.cart
                groceries=user.groceries
                cart=user.cart
                recipes=user.recipes
                await User.findOneAndDelete({ email: email });
            }else{
                messegeback.result="User doesn't exist."
                return res.json(messegeback);

            }

        }
        let hashedpassword= await bcrypt.hash(password,13)
        let newuser= new User({
            username:username,
            password:hashedpassword,
            email:email,
            groceries,
            cart,
            recipes
        })
        newuser.save()
            .then((result)=>{
                let token= createtoken(newuser._id,maxAge)
                res.cookie('jwt',token,{httpOnly:false, maxAge:maxAge*1000})
                messegeback.result='Varified,action completed.'
                res.json(messegeback);
            })
            .catch((err)=>console.log(err))
    
    }else{
        messegeback.result='Something went wrong'
        res.json(messegeback);
    }
}
    



module.exports.trytologin_post= async (req, res) => {
    let {username, password}= req.body;
    User.findOne({ $or: [
        { username: username },
        { email: username }
      ]})
        .then(async user=>{
            let messegeback={}
            if (user){
                let isvalid = await bcrypt.compare(password, user.password);
                if (isvalid) {
                ///////create token 
                let token= createtoken(user._id,maxAge)
                res.cookie('jwt',token,{httpOnly:false, maxAge:maxAge*1000})
                messegeback.result='login sucessful. Retrieving your data'
                messegeback.username=user.username
                }else if (!isvalid){
                messegeback.result='Username or Password are incorrect.'
                
                }
            }else {
                messegeback.result='Username does not exit.'
                
            }
            res.json(messegeback); 
        })
        .catch((err)=>console.log(err))
  
}

