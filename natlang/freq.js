var natural = require('natural'),
    TfIdf = natural.TfIdf,
    tfidf = new TfIdf();

tfidf.addDocument('this document is about node.');
tfidf.addDocument('this document is about ruby.');
tfidf.addDocument('this document is about ruby and node.');


tfidf.listTerms(0).forEach(function(item) {
    console.log(item.term + ': ' + item.tfidf);
});