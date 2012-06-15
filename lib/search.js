var Core = require('Timeliner.Core');
var fs = require('fs');
var searchScript = fs.readFileSync(__dirname + '/search.lua');

/**
 *
 * @param query String
 * @param callback Function function(error, String[documentIDs])
 */
function search(query, redisClient, callback) {
    "use strict";
    Core.tokenizeText(query, function (error, keys) {
        if (error) {
            callback(error, null);
        } else {
            redisClient.eval(searchScript, 1, "keys", JSON.stringify(keys), function (error, response) {
                if (error) {
                    return callback(error, null);
                } else {
                    // After the new key with the document ids is generated we return it in reverse order
                    // this will be chronologically reversed. Newest ones are first
                    /*
                     redisClient.zrevrange(searchIndexKey, 0, -1, function (error, ids) {
                     var multi = redisClient.multi();
                     ids.forEach(function (id) {
                     multi.hgetall('T:' + id);
                     });
                     multi.exec(function (error, documents) {
                     if (error) {
                     return callback(error, null);
                     }
                     callback(null, documents, searchKey);
                     });
                     });
                     */
                    callback(error, response);
                }
            });
        }
    });
}

module.exports = search;