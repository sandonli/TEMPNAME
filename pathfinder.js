//import axios from 'axios';

// const YOUR_API_KEY = "AIzaSyCUVPsRkh4YHvTIzdoh2f1EGrSlR24V_JE";

// var start = "Disneyland";
// var dest = "Universal Studios Hollywood";
// var inputTime = 30;

// start = start.replaceAll(" ", "+");
// dest = dest.replaceAll(" ", "+");

// var config = {
//   method: 'get',
//   url: "https://maps.googleapis.com/maps/api/directions/json?origin=" + start + "&destination=" + dest  + "&key=" + YOUR_API_KEY,
//   headers: { }
// };

// async function axiosGet(configuration) {
//   try {
//     const {data:response} = await axios(configuration) //use data destructuring to get data from the promise object
//     return response
//   }

//   catch (error) {
//     console.log(error);
//   }
// }

// var directions = axiosGet(config).then(function(result) {
//   console.log(result);
// });

// function getPath() {
//   console.log("IN PATHFINDER");
// }


/*
async function axiosGet(config) {
  try {
    const {data:response} = await axios(config) //use data destructuring to get data from the promise object
    console.log(JSON.stringify(response))
    return response
  }

  catch (error) {
    console.log(error);
  }
}
*/

/*
axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  response.data;
})
.catch(function (error) {
  console.log(error);
});
*/



/*

legIndex = 0; // Used to locate the optimal leg in array
legDriveMillage = 0; // Amount of miles driven in one leg
legDriveTime = 1; // Length of drive for one leg
legWalkTime = 3; // Length of walk for one leg

totalWalkOrBikeTime = 0;  // The sum the time in each leg for walk/bike
totalDriveTime = 0;    // The sum the time in each leg for driving
totalDriveMillage = 0;

// Calculate total walk and drive times 
for (let index = 0; index < array.length; index++) { // ARRAY LENGTH IS UNDEFINED, WILL BREAK CODE
  totalWalkOrBikeTime += legWalkTime;
  totalDriveTime += legDriveTime; 
  totalDriveMillage += legDriveMilage;
}

currentDriveMillage = 0;

if (totalWalkOrBikeTime > inputTime) {  // check if car can drive

  if (totalDriveTime < inputTime) { // You can drive, with time to spare

    currentDriveTime = 0; // Total of all legs driven so far
    
    currentWalkOrBikeTime = totalWalkOrBikeTime; // Total of all legs walked so far

    while ((currentDriveTime + currentWalkOrBikeTime) > inputTime) { // repeats until it takes too long to drive and 

      // Drive one leg
      currentDriveTime += legDriveTime;
      currentDriveMillage += legDriveMillage;

      // Walk/bike the rest of the legs
      currentWalkOrBikeTime = totalWalkOrBikeTime - (currentWalkOrBikeTime + legWalkTime);

      legIndex += 1; 
    }

  } else if (totalDriveTime == inputTime){    

    // Show route with all driving (without error) (A ------> C)

    currentDriveMillage = totalDriveMillage;

  } else {  // Destination cannot be reached in time by driving

    // Show route with all driving, and inform user will be late (A ------> C)

    currentDriveMillage = totalDriveMillage;
    
  }
} else { // destination is reach on time by walking

  // Show route with all walking (A ------> C)

}

// transport was switched

// Show route (A ------> B -------> C)

*/

// var totalEco = 0;

// for (const leg of walking.routes.legs){
//   totalEco += leg.duration.value;
// }

// if (totalEco <= InputTime){
//   return walking;
// }

// for (const leg of driving.routes.legs){
//   driving.routes;
// }


