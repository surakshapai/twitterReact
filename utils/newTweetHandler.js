// When there is a new related tweet from the API, 
// this takes in the data, saves to the db
// Also sends it as an event to the client side

var Tweet = require('../models/tweetModel');

module.exports = function(stream, socketIO) {
	stream.on('data', function(data) {
		var newTweet = {
			tweetData: data['id'],
			active: false,
			author: data['user']['name'],
			avatar: data['user']['profile_image_url'],
			body: data['text'],
			date: data['created_at'],
			screenName: data['user']['screen_name']
		};

		var tweetEntry = new Tweet(newTweet);

		tweetEntry.save(function(err) {
			if(!err) {
				socketIO.emit('newTweet', newTweet)
			}
		});
	});
};