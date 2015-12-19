var express = require('express');
var passport = require('passport');
var router = express.Router();

var User = require('../models/user');

/* Utility function to check if user is authenticatd */
function requireAuth(req, res, next){

  // check if the user is logged in
  if(!req.isAuthenticated()){
    {login : false};
    return res.redirect('/login');
  } else {
    {login : true};
  }
  next(); 
}
/* Render the Add Users Page */
router.get('/register', function(req, res, next) {
  console.log('active: users.js:36');

    res.render('register', {
        title: 'Users',
        displayName: req.user ? req.user.displayName : ''
    });
});

/* process the submission of a new user */
router.post('/register', function(req, res, next) {
    var user = new User(req.body);
    var hashedPassword = user.generateHash(user.password);
    User.create({
        email: req.body.email,
        password: hashedPassword,
        username: req.body.username,
        displayName: req.body.displayName,
        provider: 'local',
        created: Date.now(),
        updated: Date.now()
    }, function(err, User) {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/users');
        }
    });
});
/*  MOVED TO SURVEY ROUTES
//GET survey page
router.get('/allSurveys', function(req, res, next) {
  res.render('allSurveys', { title: 'AWP Assignment 4 | All Surveys',
                      displayName: req.user ? req.user.displayName : '',
                      surveys: [] 
  });
});

//GET Submit Page
router.get('/submit', function(req, res, next) {
  res.render('submit', { title: 'AWP Assignment 4 | Submit',
                      displayName: req.user ? req.user.displayName : ''
  });
});
*/
//Get About Page
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'AWP Assignment 4 | About',
                        displayName: req.user ? req.user.displayName : ''
                          });
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'AWP Assignment 4',
                        displayName: req.user ? req.user.displayName : ''
  });
});



//Render LOGIN page. //
router.get('/login', function (req, res, next){
  if(!req.user) {
    console.log("rendering login");
    res.render('login', {
      title: 'Login',
      messages: req.flash('loginMessage'),
      displayName:req.user ? req.user.displayName : ''
    });
    return;
  }
  else {
    return res.redirect('/users');
  }
});

/* Process the Login Request */
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/users',
    failureRedirect: '/login',
    failureFlash: true
}));

module.exports = router;
/*MOVED TO users.js
/* Show Registration Page 
router.get('/register', function (req, res, next) {
    if (!req.user) {
        res.render('register', {
            title: 'Register1',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/');
    }
});*/

/* POST signup data. 
router.post('/register', passport.authenticate('local-registration', {
    //Success go to Profile Page / Fail go to Signup page
    successRedirect : '/users',
    failureRedirect : '/register',
    failureFlash : true
})); */


/* Process Logout Request */
router.get('/logout', function (req, res){
  req.logout();
  res.redirect('/');
});


//added in the registration and login : Karen Springford//
//finished implementing login handling - passport, logout, etc. : Amanda Field//