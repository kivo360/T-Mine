var async = require('async');
var analyze = require('Sentimental').analyze,
    positivity = require('Sentimental').positivity,
    negativity = require('Sentimental').negativity;

// Setting up a the classifiers to find matches in designated markets
var natural = require('natural'),
    classifier = new natural.BayesClassifier(),
    TfIdf = natural.TfIdf,
    tfidf = new TfIdf();    

classifier.addDocument('no shit', 'contempt');
classifier.addDocument('chill the fuck out', 'frustation');
classifier.addDocument('bull crap', 'contempt');
classifier.addDocument('what the fuck man', 'anger');
classifier.addDocument('bust their ass', 'rage');
classifier.addDocument('bust my ass', 'rage');
classifier.addDocument('I love my friends', 'tender');
classifier.addDocument('I can\'t wait', 'excitement');
classifier.addDocument('I\'m so nervous', 'excitement');
classifier.addDocument('freaked me out', 'scared');
classifier.addDocument('I fucking love my friends', 'tender');
classifier.addDocument('I want to shoutout to my', 'tender');
classifier.addDocument('I want to love her', 'tender');
classifier.addDocument('She\'s so sweet', 'tender');
classifier.addDocument('He\'s so sweet', 'tender');
classifier.addDocument('I\'m sorry to say that the person is gone', 'sad');
classifier.addDocument('post Depression is not fun', 'sad');
classifier.addDocument('That concert I went to was awesome', 'happy');
classifier.addDocument('Let her continue to motivate others', 'tender');
classifier.addDocument('RIP Brother', 'tender');
classifier.addDocument('I\'m the only one in the world', 'pride');


classifier.addDocument('I just won a free gift card', 'spam');
classifier.addDocument('I just won a free iPad', 'spam');
classifier.addDocument('I just won a free iPhone', 'spam');
classifier.addDocument('Ive lost 8 pounds in 3 weeks', 'spam');

classifier.train();

var twitCargo = async.cargo(function (tasks, callback) {
  for (var i = 0; i < tasks.length; i++) {
    // console.log(tasks[i]);
    // Process the text appropiately
    process_text(tasks[i].texts.text, tasks[i].type)
  }
  callback();
}, 3)



exports.addTwitTask = function(task) {
  twitCargo.push(task);
}

function tweetext (text) {
  async.auto({
    senti: function (callback) {
      var pos = positivity(text);
      var neg = negativity(text);
      var all = analyze(text);
      callback(null, all);
    },
    // Get the most important word of each tweet
    importance: function (callback) {
      tfidf.addDocument(text);
      callback(null, tfidf.listTerms(tfidf.documents.length - 1));
    },
    emo: function(callback) {
       var emotion = classifier.getClassifications(text);

       callback(null, emotion);
    },
    tweet:function(callback) {
      callback(null, text);
    }
  }, function(err, results) {
    console.log(results);
    
  });
}

function process_text(text, type) {

  if(type === "twitter"){
    tweetext(text);
  }
  else if(type === "blog"){
    console.log("blog")
  }
  else if(type === "fbook"){
    console.log("Facebook");
  }
  else if(type === "g+"){
    console.log("Google+");
  }else{
    console.log("Something else");
  }
}

