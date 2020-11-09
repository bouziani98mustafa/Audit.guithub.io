const mysql = require("mysql");
var http  =require('http'); 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const config = require("../config/auth.config");

const express =require('express'); 
var app =express(); 
const bodyparser = require('body-parser'); 
app.use(bodyparser.json());

// const db = mysql.createConnection({
//   host: process.env.DATABASE_HOST,
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE,
// });




exports.creer = async (req, res) => {
  try {
    const {id, name, Rname } = req.body;
    if (!name || !Rname) {
      return res.status(400).render("creer", {
        message: "Name and  NameRoom is required",
      });
    }

    db.query(
      'SELECT * FROM users WHERE name= ?',
      [name],
      async (error, results) => {
        console.log(results);
        
        // if (
        //   !results ||
        //   !(await bcrypt.compare(Rname, results[0].Rname))
        // ) {
         

        //   res.status(401).render('creer', {
        //     message: " or password is incorrect",
        //   })}
          
            //else {
              
         const data=req.body.name; 
          return res.status(409).render("home", {
        data: data,
      });
          res.redirect('/LoginHome'+name+Rname);      
          
          const id = results[0].id;
          const token = jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
          });
          console.log("token is " + token);
          const cookieOptions = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 *60*60*1000),
            httpOnly : true  

          }
          res.cookie('jwt',token, cookieOptions); 
          
          res.status(200).redirect("/"); 
        
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.join = (req, res) => {
  //console.log(req.body);
  
  //const name=req.body.name;
  //const email =req.body.email;
  //const password =req.body.password;
  //const passwordConfirm =req.body.passwordConfirm;

  const { name, Rname, Role ,password } = req.body;

  db.query(
    "SELECT * FROM users WHERE Role= ?",
    [Role],
    async (error, results) => {
      if (error) console.log(error);
      if (!name || !Rname || !Role) {
      return res.status(400).render("join", {
        message: "Name and  NameRoom is required",
      }); }
      // else if (results.length > 0) {
      //   return res.render("join", {
      //     message: "that email is already in use",
      //   });
      // } 
     
      //req.users.Role ==='admin';

      //let hashedPassword = await bcrypt.hash(password, 8);
      console.log(results);
      res.redirect('/LoginHome'); 
       const data=req.body.Rname;
      // db.query(
      //   "INSERT INTO users SET ?",
      //   { name: name, Rname: Rname, Role: Role,password: password },
      //   (error, results) => {
      //     if (error) {
      //       console.log(error);
      //     } else {
      //       console.log(results);
      //       return res.render("join", {
      //         message: "user regustred",
      //       });
      //     }
      //   }
      // );
    }
  );
};
