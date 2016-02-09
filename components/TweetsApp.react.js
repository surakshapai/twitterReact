module.exports = TweetsApp = React.createClass({
	render: function() {
		return (
			<div classname="tweets-app">
				<Tweets tweets={this.state.tweets} />
				<Loader paging={this.state.paging} />
				<NotificationBar count={this.state.count} onShowNewTweets={this.showNewTweets} />
			</div>
		)
	}
});