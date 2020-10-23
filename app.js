const express =require('express'); 
const mysql =require('mysql');
const path =require('path');
const app =express(); 
//const upload = require('express-fileupload'); 
const dotenv =require('dotenv');
const cookieParser = require('cookie-parser')  ; 
dotenv.config({path: './.env'}); 
const db= mysql.createConnection ({
    host: process.env.DATABASE_HOST, 
    user: process.env.DATABASE_USER, 
    password: process.env.DATABASE_PASSWORD, 
    database: process.env.DATABASE,

});

const publicDirectory =path.join(__dirname,'./public' )  ;
app.use(express.static(publicDirectory));
app.use(express.urlencoded({extended :false}));
app.use(express.json()); 
app.use(cookieParser()); 
app.set('view engine', 'hbs'); 


// app.set('view engine', 'ejs');
//app.use(upload());

db.connect((error)=>
 {
 if(error)
 console.log(error);
 else 
 console.log("Mysql connected succefuly"); 
 });

app.use('/' ,require('./routes/pages'));
app.use('/auth',require('./routes/auth'));

// upload file 
// app.use(upload()); 
// app.get('/',(req,res)=>{
//     res.sendFile(__dirname+'index.hbs')
// })
// app.post('/',(req,res)=>{
//     if(req.files)
//       console.log(req.files);  
//       var file =req.files.file ;
//       var filename=file.name ;
//       console.log(filename); 
//       file.mv('./uploads/'+filename,function (err){
//          if(err)
//             res.send(err); 
//           else {
//              console.log("file upload with success ")   ; 
//              res.redirect('/Home'); 
//           }  
//       })
// })
// uploade image 





app.listen(5001, ()=>
{
    console.log("server started on port 5001");
})

