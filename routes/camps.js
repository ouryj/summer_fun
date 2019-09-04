let express = require('express'),
    middleFunc = require('../middleware/check');
    router = express.Router(),
    Camp   = require('../models/camp');

    //camps routes
    router.get('/',(req,res)=>{
        res.render('../views/home');
    })
    //get route
    router.get('/camp', middleFunc.isLoggedin,(req,res)=>{
        Camp.find({},(err,camps)=>{
            if(err){
                console.log(err);
                res.redirect('back');
            }else {
                res.render('../views/camps/index',{camps:camps});
            }
        })
    })
    //new  route
    router.get('/camp/new',middleFunc.isLoggedin, (req,res)=>{
        res.render('../views/camps/new');
    })
    //create route
    router.post('/camp', middleFunc.isLoggedin,(req,res)=>{
        let author = {
            id: req.user._id,
            username: req.user.username
        }
        let place = req.body.place;
        let image = req.body.image;
        let funtype = req.body.funtype;
        let newCamp = {place:place, image:image, funtype:funtype, author: author};
        Camp.create(newCamp,(err)=>{
            if(err){
                console.log(err);
                res.redirect('back');
            }else{
                res.redirect('/camp');
            }
        })
    })
    //show route 
    router.get('/camp/:id',middleFunc.isLoggedin,(req,res)=>{
        Camp.findById(req.params.id).populate('comments').exec((err,foundCamp)=>{
            if(err){
                console.log(err);
                res.redirect('back');
            }else {
                res.render('../views/camps/show',{showCamp: foundCamp});
            }
        })
    })
    // edit route
    router.get('/camp/:id/edit',middleFunc.checkCampAuthor ,(req,res)=>{
        Camp.findById(req.params.id,(err,foundCamp)=>{
            if(err){
                res.redirect('back');
            }else{
                res.render('../views/camps/edit',{edit: foundCamp});
            }
        })
    })
    // update route
    router.put('/camp/:id',middleFunc.checkCampAuthor ,(req,res)=>{
      Camp.findByIdAndUpdate(req.params.id,req.body.camp,(err)=>{
          if(err){
              res.redirect('back');
          }else{
              res.redirect('/camp/'+req.params.id);
          }
      })

    })
    // delete route
    router.delete('/camp/:id', middleFunc.checkCampAuthor ,(req,res)=>{
        Camp.findByIdAndDelete(req.params.id,(err)=>{
            if(err){
                console.log(err);
                res.redirect('back');
            }else {
                res.redirect('/camp');
            }
        })
    })



    module.exports = router;