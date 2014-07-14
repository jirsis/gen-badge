var fs = require('fs');
var http = require('http');
var path = require('path');

var shields = function(badge){
  var url ='http://img.shields.io/badge/'
    + badge.subject + '-'
    + badge.status + '-'
    + badge.color + '.svg';

  http.get(url, function(res) {
    var body = '';
    res.on('data', function(chunk) {
        body += chunk;
    });
    res.on('end', function() {
        var file = fs.createWriteStream(badge.path+ badge.subject+ '.svg');
        file.once('open', function(fd){
          file.write(body);
          file.close();
          console.log('Generated '+path.resolve(badge.subject)+'.svg');
        });
    });
  }).on('error', function(e) {
    console.log("Got error: ", e);
  });
}

module.exports.badge = shields;
