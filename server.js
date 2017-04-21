// requires - 3rd party
var express = require('express');
var app = express();
const Wreck = require('wreck')
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var FacebookStrategy = require('passport-facebook').Strategy;

// serve static files
app.use(express.static("wwwroot"));

app.get("/", function(req, res){
    res.redirect("/index.html");
    res.end();
}
);

// requires - custom
var configDB = require('./config/database.js');
var configFbAuth = require('./config/facebook.js');
var User = require('./models/user');

// middlewares

passport.serializeUser(function(user, done) {
	// console.log("SERIALIZING");
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
	// console.log("obj = " + JSON.stringify(obj));
  done(null, obj);
});

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({ secret: 'keyboard cat', key: 'sid'}));
app.use(passport.initialize());
app.use(passport.session());


passport.use(new FacebookStrategy({
    clientID: configFbAuth.appId,
    clientSecret: configFbAuth.appSecret,
    callbackURL: configFbAuth.callBackURL
  },
  function(accessToken, refreshToken, profile, cb) {

  	// req.session.passport.accessToken = accessToken;
    User.findOrCreate(profile, function(err, result){
    	if(err)
    		return cb(err, null);
    	profile.accessToken = accessToken;
	    return cb(null, profile);
    });
    // cb(null, profile);
  }));


// plugins - custom
User.findOrCreate = function(profile, cb){
	User.findOne({'facebook.profileId' : profile.id}, function(err, result){
		// console.log('result = ' + result);
		// console.log('profile = ' + JSON.stringify(profile));
		if(err)
			return cb(err, null);
		if(result==null) //creating
		{
			// console.log('FB PROFILE = ' + JSON.stringify(profile.friends));
			var newUser = new User();
			console.log("id",profile.id);
			newUser.facebook.profileId = profile.id;
			newUser.facebook.displayName = profile.displayName;
			newUser.facebook.number_posts=0;
			// newUser.facebook.friends = profile.friends.data;
			newUser.save();
			return cb(null, profile);
		}
		return cb(null, profile); // logging in
	});
}
User.findByPid = function(id, cb){
	User.findOne({'facebook.profileId' : id}, function(err, result){
		if(err || result == null)
			return cb(err, null);
		return cb(null, result);
	})
}


// routes

app.get('/api/fb/friends', function(req, res){
	if(req.user== null || req.user.accessToken == null )
		return res.send(401, "Unauthorized");
	Wreck.get('https://graph.facebook.com/v2.8/me?access_token=' + req.user.accessToken + "&debug=all&fields=friends&format=json&pretty=1", function(err, response, payload){
		// console.log("Error = " + tyerr);
		var friends = JSON.parse(payload.toString());

		res.send(friends.friends.data);
	});
});

app.get('/api/fb/friendsposts', function(req, res)
{
	if(req.user== null || req.user.accessToken == null )
		return res.send(401, "Unauthorized");
			data_friends = [];
	Wreck.get('https://graph.facebook.com/v2.8/me?access_token=' + req.user.accessToken + "&debug=all&fields=friends&format=json&pretty=1", function(err, response, payload){
		data_friends = [];
		friends = JSON.parse(payload.toString());
		console.log(friends.friends.data);
		var total_length = friends.friends.data.length;

		var append = function(i)
		{
			if(i == total_length)
			{
				res.send(data_friends);
				return;
			}

			User.find({'facebook.profileId':friends.friends.data[i].id}, function(err,data){
					if(err){console.log(error);
						data[i]="error";}

					else
					{
						console.log(data.length);
						if(data.length != 0)
						{
							console.log(data);
							response = {
							name: data[0].facebook.displayName,
							posts: data[0].posts
							}
							console.log(response);
							data_friends[i] = response;
						}
						else
						{
							//data_friends[i] = "{eeror}";
						}
						console.log(data_friends); 
					}
					console.log("i is" + i);
					console.log("length is : " + friends.friends.data.length);
					append(i+1);
			});
		}
		append(0);
	});
	

});


app.get('/api/auth/fb',passport.authenticate('facebook', { scope: 'user_friends' }));

app.get('/api/auth/fb/callback',
  passport.authenticate('facebook', { successRedirect: '/login/success',
                                      failureRedirect: '/login/failure' }));

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.get('/login/success', function(req, res){
	console.log(req.user.id);
	res.redirect('http://localhost:3000/')
})

app.get('/login/failure', function(req, res){
	res.send('Failed to log in');
})

app.post('api/updateposts',function(req,res){
	id = req.body.id;
	User.find({'facebook.profileId': req.user.id},function(err,doc){
		if(err){res.send(JSON.stringify('{error in facebook id}'));}
		else
		{
			length = doc[0].facebook.number_posts;
			for( i = 0; i<length; i++)
			{
				if(id == doc[0].posts[i].post_id)
				{
					User.u
				}
			}
		}
	})
})

app.get('/api/getprofile', function(req,res){
	User.find({'facebook.profileId':req.user.id},function(err,doc){
		if(err) {res.send("{error infeetching data}");}
		else
		{
			res.send(JSON.stringify(doc[0].facebook));
			console.log("PROFILE IS" + JSON.stringify(doc[0].facebook));
		}
	});
})

app.get('/api/sess', function(req, res){

	if(req == null || req.user == null || req.user.accessToken == null)

		return res.send(401, {session: false});

	res.send({session: true});

})

app.post('/api/postdata',function(req,res){
	response = {
		HTML:req.body.HTML,
		CSS:req.body.CSS,
		JS:req.body.JS,
	}

	console.log(response);
	c_posts = 0;
	User.find({'facebook.profileId': req.user.id},function(err,doc){
			this.c_posts = doc[0].facebook.number_posts;
			console.log(c_posts);
			User.update({'facebook.profileId': req.user.id},{$push: {posts :{$each: [{ post_id: c_posts+1,html: req.body.HTML,css: req.body.CSS,js: req.body.JS}]}}},function(err,doc){
			if(err){console.log(error);}
			else
			{   			
				c_posts += 1;
				User.updateOne({'facebook.profileId': req.user.id},{$set: {"facebook.number_posts" : c_posts}},function(err,doc1)
					{
						if (err) {console.log(err);}
					});
				console.log(doc)		}
			});
		});
	res.send(JSON.stringify("{POST Success!!}"));

})

app.get('/api/getpost',function(req,res){
	console.log("gettingpost,",req.user.id);
	User.find({'facebook.profileId':req.user.id},function(err,data){
		if(err){console.log(error);
			res.send("Error is fetching data");}
		else
		{
			response = {
				name: data[0].facebook.displayName,
				posts: data[0].posts
			}
			console.log(data[0].posts);
			console.log(data[0].facebook.displayName);
			res.send(JSON.stringify(response));
		}
	});
})


app.get('/:username/:password', function(req, res){
		var newUser = new User();
		newUser.local.username = req.params.username;
		newUser.local.password = req.params.password;
		console.log(newUser.local.username + " " + newUser.local.password);
		newUser.save(function(err){
			if(err)
				throw err;
		});
		res.send("Success!");
	});

app.put('/api/')

// server inits

mongoose.connect(configDB.url);

app.listen(3000, function(){
	console.log("Server is running on port 3000");
});