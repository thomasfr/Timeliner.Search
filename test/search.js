var should = require('should');
var search = require('../lib/search');
var redis = require('redis');
var client = redis.createClient();
var Index = require('Timeliner.Index');

var dummyText1 = "Foo Bar and Lorem Ipsum is what i say all day and night long.";
var dummyText2 = "Another test with more meaningful and powerful words";
var dummyText3 = "Hello this may be my last test with a word of Lorem in the night";

describe('#search', function () {
    var index = Index.createClient();
    beforeEach(function (done) {
        index.purge();
        index.add([dummyText1, dummyText2, dummyText3], done);
    });
    after(function () {
        index.purge();
    });
    it('should make a bo bo without any errors', function (done) {
        search('lorem', client, function () {
            console.log(arguments);
            done();
        });
    });
});