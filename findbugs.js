var cheerio = require('cheerio');
var fs = require('fs');
var coloursValues = require('./colours').colours;
var colours = require('./colours');

var calculateColor = function(low, medium, high){
  var color = colours.calculate(low, 50);
  color = Math.max(color, colours.calculate(medium, 25));
  color = Math.max(color, colours.calculate(high, 8));
  return coloursValues[color];
}

var analyze = function(budge, shields){
  fs.readFile(budge.path+budge.subject+'.xml', function(err, data){
    var $ = cheerio.load(data.toString(), {xmlMode: true});
    budge.status = $('BugInstance').toArray().length+ ' bugs';
    var low = 0;
    var medium = 0;
    var high = 0;
    $('BugInstance').toArray().forEach(function(item){
      if($(item).attr('priority') === 'Low'){
        low++;
      }else if($(item).attr('priority') === 'Normal'){
        medium++;
      }else {
        high++;
      }
    });
    budge.status = 'H:'+high+' M:'+ medium + ' L:' + low + ' bugs';
    budge.color = calculateColor(low, medium, high);
    shields(budge);
  });
}

module.exports.analysis = function(data, shields){
  data.subject= 'findbugs';
  data.status= 'fail';
  data.color= 'FF6161';
  analyze(data, shields);
};
