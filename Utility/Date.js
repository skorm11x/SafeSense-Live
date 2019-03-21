exports.myDateTime = function () {
  var date = new Date();
  var current_hour = date.getHours();
  return (date+current_hour);  
};
