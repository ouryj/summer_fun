let express = require('express');
    router  = express.Router(),
    User    = require('../models/user'),
    passport = require('passport');



// register routes
router.get('/register',(req,res)=>{
    res.render('../views/register');
})
//sign up user route
router.post('/register',(req,res)=>{
    let newUser = new User({username:req.body.username});
    User.register(newUser, req.body.password,(err,user)=>{
        if(err){
            console.log(err);
            res.redirect('back');
        }else{
            passport.authenticate('local')(req,res,()=>{
                req.flash('success','you are successfully registered'+req.user.username);
                res.redirect('/camp');
            })
        }
    })
})
// login get route
router.get('/login',(req,res)=>{
    res.render('../views/login');
})
// login post route
router.post('/login', passport.authenticate('local',{
    successRedirect: '/camp',
    failureRedirect: '/login',
    
}),(req,res)=>{
    
})
//logout route 
router.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success','your are loged out');
    res.redirect('/');
})




    module.exports = router;
