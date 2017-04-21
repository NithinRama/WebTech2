var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
	local: {
		username: String,
		password: String
	},
	facebook: {
		profileId : String,
		displayName : String,
		friends: Array,
		number_posts: Number
	},
	posts: [
		{
			post_id : Number,
			html: String,
			css: String,
			js: String
		}
	]
});

module.exports = mongoose.model('User', userSchema);
