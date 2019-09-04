let express          = require('express'),
    app              = express(),
    flash            = require('connect-flash'),
    mongoose         = require('mongoose'),
    passport         = require('passport'),
    bodyParser       = require('body-parser'),
    localPassport    = require('passport-local'),
    methodOverride   = require('method-override'),
    campsRoutes      = require('./routes/camps'),
    commentsRoute    = require('./routes/comments'),
    userRoutes       = require('./routes/authenticate');


    // connect mongoose
    mongoose.connect(process.env.DATABASEPATH,{useNewUrlParser:true});
    app.use(express.static('public'));
    app.use(methodOverride('_method'));
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(flash());
    app.set('view engine','ejs');
    
    //passport config
    app.use(require('express-session')({
        secret: 'developing stage',
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new localPassport(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    app.use((req,res,next)=>{
        res.locals.currentUser = req.user;
        res.locals.error       = req.flash('error');
        res.locals.success     = req.flash('success');
        next();
    })

    app.use(campsRoutes);
    app.use(commentsRoute);
    app.use(userRoutes);











    app.listen(3000,()=>{
        console.log('summercamp is on port 3000');
    })