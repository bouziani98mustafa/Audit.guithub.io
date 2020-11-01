const mysql = require("mysql");
var http  =require('http'); 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const express =require('express'); 
var app =express(); 
const bodyparser = require('body-parser'); 
app.use(bodyparser.json());

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});




exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).render("login", {
        message: "email and jgkgk password is required",
      });
    }

    db.query(
      'SELECT * FROM users WHERE email= ?',
      [email],
      async (error, results) => {
        console.log(results);
        
        if (
          !results ||
          !(await bcrypt.compare(password, results[0].password))
        ) {
         

          res.status(401).render('login', {
            message: "email or password is incorrect",
          })}
          
            else {
              
      
          res.redirect('/LoginHome');           
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
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.register = (req, res) => {
  console.log(req.body);
  //const name=req.body.name;
  //const email =req.body.email;
  //const password =req.body.password;
  //const passwordConfirm =req.body.passwordConfirm;

  const { name, email, password, passwordConfirm } = req.body;

  db.query(
    "SELECT email FROM users WHERE email= ?",
    [email],
    async (error, results) => {
      if (error) console.log(error);
      if (results.length > 0) {
        return res.render("register", {
          message: "that email is already in use",
        });
      } else if (password !== passwordConfirm) {
        return res.render("register", {
          message: "confirm password is not password",
        });
      }
      let hashedPassword = await bcrypt.hash(password, 8);
      console.log(hashedPassword);
      db.query(
        "INSERT INTO users SET ?",
        { name: name, email: email, password: hashedPassword },
        (error, results) => {
          if (error) {
            console.log(error);
          } else {
            console.log(results);
            return res.render("register", {
              message: "user regustred",
            });
          }
        }
      );
    }
  );
};


//image upload 
// exports.home = function(req, res){
//   message = '';
//  if(req.method == "POST"){
//     var post  = req.body;
//     var id= post.id;
// console.log('kfkfkfkf')
//   if (!req.files)
//       return res.status(400).send('No files were uploaded.');

//   var file = req.files.uploaded_image;
//   var img_name=file.name;

//      if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                               
//             file.mv('public/images/'+file.name, function(err) {
                           
//               if (!err)

//                 //return res.status(500).send(err);
                 
//               var sql = "INSERT INTO `images`( `id` ,`images`) VALUES ('"+id + "','" + img_name + "')";

//               var query = db.query(sql, function(err, result) {
//                  res.redirect('oginHome/');
//                  console.log('woooooooow image upload '); 
//               });
//            });
//         } else {
//           message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
//           res.render('ome.ejs');
//         }
//  } else {
//     //res.render('home');
//  }

// };