var cheerio = require('cheerio');
var fs = require('fs');

var calculateColor = function(status){
  if(status === 0 ){
    return 'brightgreen';
  }else if (status > 0 && status <= 25){
    return 'green';
  }else if (status > 25 && status <= 50){
    return 'yellowgreen';
  }else if (status > 50 && status <= 75){
    return 'yellow';
  }else if (status > 75 && status <= 100){
    return 'orange';
  }else {
    return 'red';
  }
}

var analyze = function(budge, shields){
  fs.readFile(budge.path+budge.subject+'.xml', function(err, data){
    var $ = cheerio.load(data.toString(), {xmlMode: true});
    budge.status = $('violation').toArray().length+ ' violations';
    budge.color = calculateColor(budge.status);
    shields(budge);
  });
}

module.exports.analysis = function(data, shields){
  data.subject= 'pmd';
  data.status= 'fail';
  data.color= '01A9DB';
  analyze(data, shields);
}
