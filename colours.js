var colours = ['brightgreen', 'green', 'yellowgreen', 'yellow', 'orange', 'red'];

module.exports.colours = colours;

module.exports.calculate = function(value, criticalValue){
  var interval = Math.ceil(criticalValue/colours.length);
  var colour = colours.length-1;
  if(interval !== 0){
    colour = Math.ceil(value/interval);
  }
  if (colour > (colours.length-1) ) colour = colours.length-1;
  return colour;
}
