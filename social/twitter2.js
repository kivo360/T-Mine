var Twit = require('twit');
var async = require('async');

var T = new Twit({
    consumer_key:         'ff4WvmZhnXLIsFuL0i6jFg'
  , consumer_secret:      '8ueYUQx5NloEN6RtNVz1J3bfO6aUT97PKx9vSl49s'
  , access_token:         '235529294-ZOYfJf1r6TCMNLCMIAEnz7q8deqRYz49FHbZkRkT'
  , access_token_secret:  'WToj3o25PVIv3sfgzdN2Vup0SZm5WuqWEW9sC80SeUbAm'
});

var stream = T.stream('statuses/filter', {track: ['cheese', 'world', 'fine']});


var cargo = async.cargo(function  (tasks, callback) {
	for (var i = 0; i < tasks.length; i++) {
		console.log(tasks[i].tweeter);	
	}
}, 3);


stream.on('tweet', function(tweet) {
	
	cargo.push({tweeter: tweet});
});

