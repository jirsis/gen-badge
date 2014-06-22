var fs = require('fs');
var http = require('http');
var path = require('path');

var shields = function(budge){
  var url ='http://img.shields.io/badge/'
    + budge.subject + '-'
    + budge.status + '-'
    + budge.color + '.svg';

  http.get(url, function(res) {
    var body = '';
    res.on('data', function(chunk) {
        body += chunk;
    });
    res.on('end', function() {
        var file = fs.createWriteStream(budge.path+ budge.subject+ '.svg');
        file.once('open', function(fd){
          file.write(body);
          file.close();
          console.log('Generated '+path.resolve(budge.subject)+'.svg');
        });
    });
  }).on('error', function(e) {
    console.log("Got error: ", e);
  });
}

module.exports.budge = shields;
