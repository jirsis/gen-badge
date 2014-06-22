var cheerio = require('cheerio');
var fs = require('fs');

var calculateColor = function(status){
  if(status === 0 ){
    return 'brightgreen';
  }else if (status > 0 && status <= 10){
    return 'green';
  }else if (status > 10 && status <= 20){
    return 'yellowgreen';
  }else if (status > 20 && status <= 30){
    return 'yellow';
  }else if (status > 30 && status <= 40){
    return 'orange';
  }else if (status > 40 && status <= 50){
    return 'red';
  }else {
    return 'FF0000';
  }
}

var analyze = function(budge, shields){
  fs.readFile(budge.path+budge.subject+'.xml', function(err, data){
    var $ = cheerio.load(data.toString(), {xmlMode: true});
    budge.status = $('BugInstance').toArray().length+ ' bugs';
    budge.color = calculateColor(budge.status);
    shields(budge);
  });
}

module.exports.analysis = function(data, shields){
  data.subject= 'findbugs';
  data.status= 'ok';
  data.color= 'FF6161';
  analyze(data, shields);
};
