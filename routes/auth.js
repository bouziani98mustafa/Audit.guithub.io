const express=require('express');
const router= express.Router();
const authController =require('../controllers/auth');

      
router.post('/join', authController.join ); 
router.post('/creer', authController.creer ); 
//router.post('/home', authController.home ); 
router.post('/users/:id', authController.creer ); 



module.exports= router ; 