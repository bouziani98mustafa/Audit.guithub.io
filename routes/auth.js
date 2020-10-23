const express=require('express');
const router= express.Router();
const authController =require('../controllers/auth');

      
router.post('/register', authController.register ); 
router.post('/login', authController.login ); 
//router.post('/home', authController.home ); 
router.post('/users/:id', authController.login ); 



module.exports= router ; 