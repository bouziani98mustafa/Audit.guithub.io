const express=require('express');
const router= express.Router();
      
router.get('/',(req,res)=>
{
    
    res.render('login.hbs')
} ); 
router.get('/register',(req,res)=>
{
   
    res.render('register.hbs')
} ); 
router.get('/login',(req,res)=>
{
   
    res.render('login.hbs')
} ); 
router.get('/Home',(req,res)=>
{
   
    res.render('index.hbs')
} ); 
router.get('/LoginHome',(req,res)=>
{
   
    res.render('home.hbs')
} );
router.get('/Achat',(req,res)=>
{
   
    res.render('Achat.hbs')
} );
router.get('/Budget',(req,res)=>
{
   
    res.render('Budget.hbs')
} );
router.get('/intervention',(req,res)=>
{
   
    res.render('intervention.hbs')
} );
router.get('/production',(req,res)=>
{
   
    res.render('production.hbs')
} );
router.get('/oginHome',(req,res)=>
{
   
    res.render('ome.ejs')
} );





module.exports= router