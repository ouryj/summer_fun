let Camp     = require('../models/camp'),
    Comment  = require('../models/comment');


    middleFunc = {};

    middleFunc.isLoggedin = function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }else{
            req.flash('error','you have to login first');
            res.redirect('/login');
        }
    }

    middleFunc.checkCampAuthor = function(req,res,next){
        if(req.isAuthenticated()){
            Camp.findById(req.params.id,(err,camp)=>{
                if(err){
                    req.flash('error','place not found');
                    res.redirect('back');
                }else{
                    if(camp.author.id.equals(req.user._id)){
                        next();
                    }else{
                        req.flash('error','you are not allowed to proceed');
                        res.redirect('back');
                    }
                }
            })
        } else {
            req.flash('error','you need to signin first');
            res.redirect('back');
        }
       }
       //comment ownership logic
       middleFunc.checkCommentAuthor = function(req,res,next){
           if(req.isAuthenticated()){
               Comment.findById(req.params.comment_id,(err,comment)=>{
                   if(err){
                       req.flash('error',err.message);
                       res.redirect('back');
                   }else{
                       if(comment.author.id.equals(req.user._id)){
                           next();
                       }else{
                           req.flash('error','permission not granted');
                           res.redirect('back');
                       }
                   }
               });
           }else{
               req.flash('error','you need to log in first');
               req.redirect('/login');
           }
       }

      



    module.exports = middleFunc;


    