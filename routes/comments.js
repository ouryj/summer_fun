let express    = require('express'),
    router     = express.Router(),
    middleFunc = require('../middleware/check');
    Comment    = require('../models/comment'),
    Camp       = require('../models/camp');

    
    //new comments route
    router.get('/camp/:id/comments/new', middleFunc.isLoggedin,(req,res)=>{
        Camp.findById(req.params.id,(err,camp)=>{
            if(err){
                console.log(err);
               
            }else {
                res.render('../views/comments/new',{camp:camp});
            }
        })
        
    })
    //create comment routes
    router.post('/camp/:id/comments',middleFunc.isLoggedin,(req,res)=>{
        Camp.findById(req.params.id,(err,camp)=>{
            if(err){
                console.log(err);
                res.redirect('back');
            }else{
                Comment.create(req.body.comment,(err,comment)=>{
                    if(err){
                        console.log(err);
                    }else{
                        comment.author.id = req.user._id;
                        comment.author.username = req.user.username;
                        comment.save();
                        camp.comments.push(comment);
                        camp.save();
                        
                        res.redirect('/camp/'+req.params.id);
                    }
                })
            }
        })
    })
    // edit comment route
    router.get('/camp/:id/comments/:comment_id/edit', middleFunc.checkCommentAuthor,(req,res)=>{
        Comment.findById(req.params.comment_id,(err,comment)=>{
            if(err){
                console.log(err);
                res.redirect('back');
            }else {
                res.render('../views/comments/edit',{camp_id:req.params.id, comment:comment});

            }
        })
       
    })
    router.put('/camp/:id/comments/:comment_id',middleFunc.checkCommentAuthor,(req,res)=>{
        Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,(err)=>{
            if(err){
                console.log(err);
                res.redirect('back');
            }else{
                res.redirect('/camp/'+req.params.id);
            }
        })
    })
    router.delete('/camp/:id/comments/:comment_id',middleFunc.checkCommentAuthor,(req,res)=>{
        Comment.findByIdAndDelete(req.params.comment_id,(err)=>{
            if(err){
                console.log(err);
                res.redirect('back');
            }else {
                res.redirect('/camp/'+req.params.id);
            }
        })
    })


    module.exports = router;