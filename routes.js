var JSX = require('node-jsx').install(),
	React = require('react'),
	TweetsApp = require('./components/TweetsApp.react'),
	tweetModel = require('models/tweetModel');

module.exports = {

	index: function(req, res) {
		tweetModel.getTweets(0,0,function(tweets, pages) {

			var markup = React.renderComponentToString(
				TweetsApp({
					tweets: tweets
				})
			);

			res.render('home', {
				markup: markup,
				state: JSON.stringify(tweets)
			});
		});
	},

	page: function(req,res) {
		tweetModel.getTweets(req.params.page, req.params.skip, function(tweets) {
			res.send(tweets);
		});
	}
}