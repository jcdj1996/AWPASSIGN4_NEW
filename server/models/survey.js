//By James 18TH DEC
//Import mongoose bcrypt
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//need an alias for mongoose.Schema
var Schema = mongoose.Schema;

//Define our user Schema
var SurveySchema = new Schema({ 
	username : String,
	title : String,
	type : String,	//either "agree" or "multi"
	question1 : String,
	q1answers : [],
	q1stats : [],
	question2 : String,
	q2answers : [],
	q2stats : [],
	question3 : String,
	q3answers : [],
	q3stats : [],
	question4 : String,
	q4answers : [],
	q4stats : [],
	question5 : String,
	q5answers : [],
	q5stats : [],
	created : {
		"type" : Date,
		"default" : +new Date
	},
	"updated" : {
		"type" : Date,
		"default" : +new Date
	}
}, {
	"collection" : "survey"
});



module.exports = mongoose.model('Survey', SurveySchema);