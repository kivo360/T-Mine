var Twit = require('twit'),
nlpl = require('../natlang/nlp.js');

var T = new Twit({
    consumer_key:         'ff4WvmZhnXLIsFuL0i6jFg'
  , consumer_secret:      '8ueYUQx5NloEN6RtNVz1J3bfO6aUT97PKx9vSl49s'
  , access_token:         '235529294-ZOYfJf1r6TCMNLCMIAEnz7q8deqRYz49FHbZkRkT'
  , access_token_secret:  'WToj3o25PVIv3sfgzdN2Vup0SZm5WuqWEW9sC80SeUbAm'
});


var stream = T.stream('statuses/filter', { track: ['cheese', 'world', 'fine'] });

stream.on('tweet', function (tweet) {
  nlpl.addTwitTask({texts: tweet, type:"twitter"});
});
