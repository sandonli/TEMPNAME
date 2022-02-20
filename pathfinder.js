const axios = require('axios');
var  YOUR_API_KEY = "AIzaSyCUVPsRkh4YHvTIzdoh2f1EGrSlR24V_JE";

var start = "Disneyland";
var dest = "Universal Studios Hollywood";

start = start.replaceAll(" ", "+");
dest = dest.replaceAll(" ", "+");

var config = {
  method: 'get',
  url: "https://maps.googleapis.com/maps/api/directions/json?origin=" + start + "&destination=" + dest  + "&key=" + YOUR_API_KEY,
  headers: { }
};

console.log(config);

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});