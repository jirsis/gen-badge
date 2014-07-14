var colours = ['brightgreen', 'green', 'yellowgreen', 'yellow', 'orange', 'red'];

module.exports.colours = colours;

module.exports.calculate = function(value, criticalValue){
  var interval = Math.ceil(criticalValue/colours.length);
  var lastColour = colours.length-1;
  var colour = lastColour;
  if(interval !== 0){
    colour = Math.ceil(value/interval);
  }
  if (colour > (lastColour) ) colour = lastColour;
  return colour;
}
