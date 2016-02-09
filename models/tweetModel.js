var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	tweetData: String,
	active: Boolean,
	author: String,
	avatar: String,
	body: String,
	date: Date,
	screenName: String
});

// Skip is to keep the context intact. Suppose there are 5 new tweets, but the user is on the 
// next page, context needs to handle (existing+newPage - 5) tweets on the view

schema.statics.getTweets = function(page, skip, cb) {
	var tweets = [],
	start = (page*10) + (skip*1);

	Tweet.find({}, 'tweetData active author avatar body date screenName', {skip: start, limit:10}).sort({date: 'desc'}).exec(function(err, docs){
		if(!err) {
			tweets = docs;
			tweets.forEach(function(tweet){
				tweet.active = true;
			});
		}
		cb(tweets);
	});
};

module.exports = Tweet = mongoose.model('Tweet', schema);