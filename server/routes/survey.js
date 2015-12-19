//By James 18TH DEC
var express = require('express');
var passport = require('passport');
var router = express.Router();
var User = require('../models/user');

var Surveys = require('../models/survey');

/* Utility function to check if user is authenticatd */
function requireAuth(req, res, next){

  // check if the User is logged in
  if(!req.isAuthenticated()){
    
    return res.redirect('/login');
  } else {

  }
  next();
}



/* Render the submit survey Page */
router.get('/add', requireAuth, function (req, res, next) {
    res.render('survey/add', { 
        title: 'Surveys',
        displayName: req.user ? req.user.displayName : ''

    });
});

/* process the submission of a new Survey James 18TH DEC*/
router.post('/add', requireAuth, function (req, res, next) {


var survey = new Surveys(req.body);
	if(req.body.formtype="agree"){	//agree/disagree survey
    Surveys.create({	//agree/disagree survey
        username: req.user.username,
        title: req.body.surveyname,
		question1 : req.body.qa1,
		q1answers : [{a0:"Agree",a1:"Disagree"}],
		q1stats : [{a0:0,a1:0}],
		question2 : req.body.qa2,
		q2answers : [{a0:"Agree",a1:"Disagree"}],
		q2stats : [{a0:0,a1:0}],
		question3 : req.body.qa3,
		q3answers : [{a0:"Agree",a1:"Disagree"}],
		q3stats : [{a0:0,a1:0}],
		question4 : req.body.qa4,
		q4answers : [{a0:"Agree",a1:"Disagree"}],
		q4stats : [{a0:0,a1:0}],
		question5 : req.body.qa5,
		q5answers : [{a0:"Agree",a1:"Disagree"}],
		q5stats : [{a0:0,a1:0}],
        created: Date.now(),
        updated: Date.now()
    }, function (err, Surveys) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/');
        }
    });}
	else{	//multi choice survey
    Surveys.create({	
        username: req.user.username,
        title: req.body.surveyname,
		question1 : req.body.qm1,
		q1answers : "",
		q1stats : "",
		question2 : req.body.qm2,
		q2answers : "",
		q2stats : "",
		question3 : req.body.qm3,
		q3answers : "",
		q3stats : "",
		question4 : req.body.qm4,
		q4answers : "",
		q4stats : "",
		question5 : req.body.qm5,
		q5answers : "",
		q5stats : "",
        created: Date.now(),
        updated: Date.now()
    }, function (err, Survey) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/');
        }
	
    });
	}
});
/* Render Surveys main page. */
router.get('/', function (req, res, next) {
    Surveys.find(function (err, survey) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('survey/index', {
				title : '',
                survey: survey,
                displayName: req.user ? req.user.title : ''
            });
        }
    });
});
/* Render the Survey Edit Page */
router.get('/:id', requireAuth, function (req, res, next) {
    // create an id variable
    var id = req.params.id;
    // use mongoose and our model to find the right Survey
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        Surveys.findById(id, function (err, survey) {
            if (err) {
                console.log(err);
                res.end(err);
            }
            else {
                //show the edit view
                res.render('survey/edit', {
                    title: 'Surveys',
                    survey: survey,
                    displayName: req.user ? req.user.displayName : ''
                });
            }
        });
    } else {
        res.redirect('/');
    }
});

/* process the edit form submission */
router.post('/:id', requireAuth, function (req, res, next) {
    var id = req.params.id;
    var Survey = new Surveys(req.body);
    Surveys._id = id;
    Surveys.updated = Date.now();
    
    // use mongoose to do the update
    Surveys.update({ _id: id }, Surveys, function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/survey');
        }
    });
});

/* run delete on the selected Survey */
router.get('/delete/:id', requireAuth, function (req, res, next) {
    var id = req.params.id;
    Surveys.remove({ _id: id }, function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('../');
        }
    });
});

module.exports = router;
