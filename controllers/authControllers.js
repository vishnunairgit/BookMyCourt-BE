// const { response } = require('../app');
const { json } = require("express");
// const users = require('../models/userModel');
const users = require("../models/userModel");
const USERS = require("../models/userModel");
// password hiding -using bcrypt
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const doSignup = async (req, res) => {
  // checking the email is alredy exsist or not
  const users = await USERS.findOne({ email: req.body.email });
  if (users) {
    res.status(200).json({ message: "email already exists" });
    return;
  }
  console.log(req.body);
  // // password hiding - using bcrypt
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    console.log(hash);

    USERS({
      fname: req.body.firstName,
      lname: req.body.lastName,
      email: req.body.email,
      password: hash,
      // comfirmPassword:req.body.comfirmPassword
    })
      .save()
      .then((response) => {
        res.status(200).json({ message: "Sign up success" });
      });
    // Store hash in your password DB.
  });
  // console.log(req.body,'sign up data');
};



// login function


const doLogin = async (req, res) => {
  // console.log(req.body, "step 1");

  const user = await USERS.findOne({ email:req.body.email });
  // console.log(user, "step 2");

  if (user) {
    // comparing frond end password and backend storing password
    bcrypt.compare(req.body.password, user.password, (err, hashres) => {
      // console.log(hashres, "step 3");
      if (hashres) 
      
    //   GENERATING TOKEN
      {
        // console.log("credentioal true step 4", process.env.JWT_PASSWORD );
        console.log(jwt.sign);
        const token = jwt.sign(
          {
            userID:user.id,
            email:user.email,
            lname:user.lname,
            fname:user.fname,
            role:user?.role
          }, 
          // process.env.JWT_PASSWORD ?? "bookMyCourt",
          // { expiresIn: "2d" }
          process.env.JWT_PASSWORD,{ expiresIn: "1d" }

        );
        res.status(200).json({message:"Authentication successful", token, user:user});
        // we are tacking user dettails fron  here ((user:user)) that time we need to hide the password.
        // user.password=undefined

        // console.log('step 5', token);
      }
    });
  } else {
    res
      .status(200)
      .json({ message: "Invalid user credentials", token: "null" });
  }
};

module.exports = { doSignup, doLogin };
