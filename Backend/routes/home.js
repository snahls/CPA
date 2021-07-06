var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();
const app = express();
const authenticateUser = require("../middlewares/authenticateUser");
const mongoose = require("mongoose");

var bodyParser=require("body-parser");

const cookieSession = require("cookie-session");
const bcrypt = require("bcrypt");
var path = require('path');
//const User = require("../models/User");

const UserSchemaa = new mongoose.Schema({
  email: {
    type: String,
   // required: true,
  },
  password: {
    type: String,
    //required: true,
  },

});

const Userm=new mongoose.model("Userm", UserSchemaa);


//Connecting MongoDB Atlas
const uri="mongodb+srv://akhi9878:Akhilesh@123456@cluster0.mnn6c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connected to Mongodb Atlas cloud! :)");
  })
  .catch((err) => {
    console.log(err);
  });

router
  .get("/", (req, res) => {
    res.redirect("copr.html");
  });
  // .get("/log", (req, res) => {
  //   res.redirect("copr.html");
  // })
  // .get("/reg", (req, res) => {
  //   res.redirect("copr.html");
  // })
  // .get("/home", authenticateUser, (req, res) => {
  //   res.redirect("homes.html", { user: req.session.user });
  // });
 
// route for handling post requirests
router
  .post("/log", async(req, res) => {
    const { email1, password1 } = req.body;
    const doesUserExits = await Userm.findOne({ 'email':email1 });

    //If Email doesn't exist in DB ,we return False
    if (!doesUserExits) {                 
      res.send(false);    
     // res.send("invalid Email");
      return;
    }

    const doesPasswordMatch = await bcrypt.compare(
      password1,
      doesUserExits.password
    );
    
    //If Password Doesn't Match,we retuen False
    if (!doesPasswordMatch) {
      res.send(false);
      //res.send("Invalid  password");
      return;
    }




    // // else he\s logged in
    // req.session.user = {
    //   email1,
    // };

   // res.redirect("homes.html");
   res.send(true)
   
  })

  
  .post("/reg", async(req, res) => {
    const { email, password, cpassword } = req.body;
    const doesUserExitsAlready = await Userm.findOne({'email':email });
    if (doesUserExitsAlready)
    {
      console.log(email);
      res.send(true);
      // res.send("A user with that email already exits please try another one!");
      // return;
    }
    else{
      const hashedPassword = await bcrypt.hash(password, 12);
      const latestUser = new Userm({ email, password:hashedPassword});
      latestUser.save()
      .then(() => {
        res.send(false);
        //res.send("registered account!");
        return;
      })
      .catch((err) => console.log(err));

    }
  })
  
    // check for missing fields
  //   if (!email || !password || !cpassword) {
  //     res.send("Please enter all the fields");
  //     return;
  //   }

  //   const doesUserExitsAlready = await User.findOne({ email });

  //   if (doesUserExitsAlready) {
  //    res.send(false);
  //   // res.send("A user with that email already exits please try another one!");
  //    return;
  //   }

  //   var filter = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   if(!filter.test(email))
  //   {
  //     res.send("Invalid Email");
  //     return;
  //   }

	//   if(!(password.match(/[a-z]/g) && password.match( /[A-Z]/g) && 
  //   password.match(/[0-9]/g) && password.match(/[^a-zA-Z\d]/g) && password.length >= 8) )
  //   {
  //       res.send("Password must Contain Minimum 8 Characters (Atleast 1 uppercase character (or) Atleast 1 lowercase character (or) Atleast 1 digit (or) Atleast 1 special character");
  //       return;
  //     } 
  
	// if(password!=cpassword){
	// 	res.send("Password didn't match");
  //   return;
	// }
	// else
	// {
  //   res.send(true);
	// 	 // lets hash the password
  //   // const hashedPassword = await bcrypt.hash(password, 12);
  //   // const latestUser = new User({ email, password: hashedPassword });
  //   // latestUser
  //   //   .save()
  //   //   .then(() => {
  //   //     res.send(true);
  //   //     //res.send("registered account!");
  //   //     return;
  //   //   })
  //   //   .catch((err) => console.log(err));

	// }});
    
//logout
router.get("/logout", authenticateUser, (req, res) => {
    req.session.user = null;
    res.redirect("copr.html");
  });
 
module.exports = router;