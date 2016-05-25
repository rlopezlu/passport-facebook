var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var dbConfig = require('../db');
var User = require('../models/user');

//the mongoUrl
var manualUrl = 'mongodb://localhost:27017/facebook';
var fileUrl = dbConfig.url;

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('index', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true  
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		res.render('home', { user: req.user });
	});

	//FIX THIS ASAP
	router.get('/deleteUserVerify', isAuthenticated, function(req, res){
		res.render('deleteUserVerify', {user: req.user});
	});

	router.get('/deleteUser', isAuthenticated, function(req, res){
		//console.log({user : req.user});
		console.log(req.user);
		User.remove({'fb.id': req.user.fb.id}, function(err){
			if(err){
				console.log("could not removed", err);
			}
			console.log("removed ", req.user.id);
			res.redirect('/signout');
		});
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		console.log('signing out user')
		req.logout();
		res.redirect('/');
	});

	router.get('/other', function(req, res){
		res.render('other');
	});


	// route for facebook authentication and login
	// different scopes while logging in
	//go here after clicking 'Login with facebook' button
	router.get('/login/facebook', 
		passport.authenticate('facebook', { scope : 'email' }
	));

	// handle the callback after facebook has authenticated the user
	router.get('/login/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/home',
			failureRedirect : '/'
		})
	);

	return router;
}





