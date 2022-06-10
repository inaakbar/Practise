//For user authentication


const express=require('express');
const bodyParser=require('body-parser');
const app = express();
const mongoose=require('mongoose');
const session=require('express-session');
const passport=require('passport');
const https=require("https");
const passportLocalMongoose=require('passport-local-mongoose');
//const index = require('./modules/indexdb.js');
//const Localbase=require('localbase');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.static(__dirname + '/'));

app.use(session({
    secret: "Secret",
    resave: false,
    saveUninitialized: false
  }));

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect("mongodb+srv://project2:mshackathon@cluster1.e6cet.mongodb.net/formdb",{useNewUrlParser: true});
var con1 = new mongoose.Mongoose();
var con2 = new mongoose.Mongoose();
con1.connect('mongodb+srv://project2:mshackathon@cluster1.e6cet.mongodb.net/userdb',{useNewUrlParser: true});
con2.connect('mongodb+srv://project2:mshackathon@cluster1.e6cet.mongodb.net/formdb',{useNewUrlParser: true});
const userdbSchema = con1.Schema;
const formdbSchema = con2.Schema;



const userSchema=new userdbSchema({
    uid: String,
    password: Date,
});

const formSchema=new formdbSchema({
    uid: type=String,
    name: String,
  Gender: String,
  Address: String,
  Contactnumber: Number,
  Needtype: String,
  Needcategory: String,
  Amountneeded: Number,
  Percentage: Number,
  Attendance: Number,
  Dropoutyears: Number,
  Agenda: String,
  Reason: String
});
var l="on";
//language testing
app.post('/',function(req,res){

    l="off";
    const lang=req.body.name;
    console.log(lang);
  
           res.render('hindihome',{
               Home:"होमपेज",
               About: "हमारे बारे में",
               Contact: "संपर्क करें",
               Language: "भाषा",
               Login: "लॉग इन करें",
              Userl:"उपयोगकर्ता के रूप में लॉगिन करें",
              adminl:"व्यवस्थापक के रूप में लॉगिन करें"
          });
      
});


userSchema.plugin(passportLocalMongoose);
formSchema.plugin(passportLocalMongoose);


const User = con1.model("user", userSchema);
const Form = con2.model("form",formSchema);


passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//for session time out
app.get("/login",function(req,res){
    if(req.isAuthenticated()){
        res.render("main_form");
    }else{
        res.redirect("/userlogin");
    }
});



app.get("/",function(req, res){
    res.render("home");//name of home ejs file
});
app.get('/userlogin', function (req, res) {
    res.render("Userlogin");
  });
  
app.get("/adminlogin",function(req,res){

    res.render("Adminlogin");
});

//after clicking on login as user button on home screen
/*app.get("/login",function(req, res){
    
    res.render("main_form");//name of login ejs file for user
});*/


app.post("/userlogin",function(req,res){
   

    User.findOne({uid:req.body.uid},function(err,foundUser){
        if(err){console.log(err);
            console.log("incorrect password");
            res.redirect('/');

        }else{
            if(foundUser){
                if(foundUser.uid===req.body.uid){
                    res.render("main_form");
                }
                else{
                    console.log("still not found");
                    res.redirect('/userlogin');
                }
            }
        };
    });


   // res.render("main_form");
});

app.post("/login",function(req,res){
    console.log("req.body.Gender");
    const newform=new Form({
    uid:1234567,
    name: req.body.name,
    Gender: req.body.Gender,
    Address: req.body.Address,
    Contactnumber: req.body.phone,
    Needtype: req.body.needtype,
    Needcategory: req.body.needcategory,
    Amountneeded: req.body.amount
});
newform.save();
//db.collection('formdb').add(newform);
res.redirect('/userlogin');
});


/////////////////////////////////////////////////////////////

//localstorage.setItem("form1","javascrpt");



app.listen(3000,function(){
    console.log("server is running on port 7000");
  });

