function getPath(startAddr, endAddr, time, ownsBike) {
  console.log("IN PATH FINDER");
  let mode;
  if (ownsBike) mode = "bicycling";
  else mode = "walking";
  
  startAddr = startAddr.replaceAll(" ", "+");
  endAddr = endAddr.replaceAll(" ", "+");
  let config = {
    method: "get",
    url: "https://maps.googleapis.com/maps/api/directions/json?origin=" + startAddr +
      "&destination=" + endAddr + "&mode=" + mode + "&key=" + YOUR_API_KEY,
    headers: { }
  };
  axios(config).then(function (response) {
    let data = JSON.stringify(response.data);
    console.log(data);

    let legIndex = 0;
    for (let i = 0; i < data.routes.length; i++) {

    }





  })
  .catch(function (error) {
    return (error); // ???
  })
  
}

/*
data.routes []
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


