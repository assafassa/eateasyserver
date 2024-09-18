
const express=require('express');
const mongoose=require('mongoose');
const app =express();
const cors = require("cors");
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",};
app.use(cors(corsOptions));
app.use(express.json());
const recipesRoutes=require('./routes/recipesRoutes');
const signupRoutes=require('./routes/signupRoutes');
const dbURI= 'mongodb+srv://assafas1412:QH0j0YCn6NmhNJ1x@easyeat.7liyu.mongodb.net/?retryWrites=true&w=majority&appName=easyeat';
const cookieParser=require('cookie-parser');
app.use(cookieParser());
const {requireAuth}=require('./middleware/authmiddleware');
const authController= require('./controllers/authcontrollers')
// mongodb://assafas1412:<db_password>@undefined/?replicaSet=atlas-fq6evc-shard-0&ssl=true&authSource=admin

// QH0j0YCn6NmhNJ1x

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(process.env.PORT || 3000))
    .catch((err) => console.log(err))

app.set('view engine', 'ejs')
app.use(express.static('public'))


app.post('/trytologin',authController.trytologin_post);
  
app.use('/signup',signupRoutes);
app.use('/recipes',recipesRoutes);

