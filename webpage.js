const YOUR_API_KEY = "AIzaSyCUVPsRkh4YHvTIzdoh2f1EGrSlR24V_JE";

let script = document.createElement("script");
script.src = "https://maps.googleapis.com/maps/api/js?key="
    + "AIzaSyCUVPsRkh4YHvTIzdoh2f1EGrSlR24V_JE&libraries=places&callback=initAll";
script.async = true;

let startingAddress = "";
let endingAddress = "";
let onChangeHandler;
document.head.appendChild(script);

function initAll() {
    let options = {
        zoom: 14,
        center: {lat: 51.0776, lng: -114.1407},
        mapId: '88aed56e2f74a11'
    }
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;
    let map = new google.maps.Map(document.getElementById("map"), options);
    
    // let marker = new google.maps.Marker({
    //     position: options.center,
    //     map: map,
    // })

    directionsDisplay.setMap(map);

    startingAddr = new google.maps.places.Autocomplete(
        document.getElementById("startingAddress")
    );
    endingAddr = new google.maps.places.Autocomplete(
        document.getElementById("endingAddress")
    );

    startingAddr.addListener("place_changed", startingPlaceChanged);
    endingAddr.addListener("place_changed", endingPlaceChanged);

    onChangeHandler = function(startAddr, endAddr, transType) {
        calculateAndDisplayRoute(directionsService, directionsDisplay, startAddr, endAddr, transType);
    };
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, startAddr, endAddr, transType) {
    directionsService.route({
        origin: startAddr,
        destination: endAddr,
        travelMode: transType
    }, function(response, status) {
        if (status === "OK") {
            directionsDisplay.setDirections(response);
        } else {
            window.alert("directions request failed due to " + status);
        }
    });
}


function startingPlaceChanged() { 
    let place1 = startingAddr.getPlace();
    if (!place1.geometry) {
        document.getElementById("startingAddress").placeholder = "Enter a starting address...";
    } else {
        startingAddress = document.getElementById("startingAddress").value;
    }
}

function endingPlaceChanged() { 
    let place2 = endingAddr.getPlace();
    if (!place2.geometry) {
        document.getElementById("endingAddress").placeholder = "Enter a destination...";
    } else {
        endingAddress = document.getElementById("endingAddress").value;
    }
}

function findBestRoute(startAddr, endAddr, time, ownsBike) {
    /***
     * STEPS
     * 1: Check walking/biking time for shortest route. If less than or equal given time constraint, return that route
     * 
     * 
     * 2: Check to see if you can drive/bus there at all. If you cannot, show fastest route but let them know they cant make it in time
     * 
     * 
     * 3: If there is enough time, cut driving in half and walk half way.
     * 
     * 
     * 4. If possible, cut driving in half, if not cut walking in half
     * 
     * 
     */
    // let travelRoute = {
    //     origin: startingAddress,
    //     destination: endingAddress,
    //     provideRouteAlternatives = true,
    //     travelMode: 'WALKING'
    // }

    // DUMMY INSTRUCTIONS REMOVE LATER
    // route: A ---> B ---> C

    /*
    [A, B, C] 
    A->B DRIVING
    B->C WALKING/BIKING

    

    */
    let stops;
    let mode;
    if (ownsBike) mode = "bicycling";
    else mode = "walking";

    let start = startAddr.replaceAll(" ", "+");
    let end = endAddr.replaceAll(" ", "+");
    let config = {
        method: "get",
        url: "https://maps.googleapis.com/maps/api/directions/json?origin=" + start +
        "&destination=" + end + "&mode=" + mode + "&key=" + YOUR_API_KEY,
        headers: { }
    };
    onChangeHandler(startAddr, endAddr, "WALKING");
    return;
    axios(config).then(function (response) {
        let data = JSON.stringify(response.data);

        let legIndex = 0;
        let totalNonCarTime = 0;
        let totalCarTime = 0;
        let currentDriveMillage = 0;
        let carOrNot = false;
        for (let i = 0; i < data.routes.length; i++) {
            // sum up all the biking times
        }
        if (totalNonCarTime <= time) {
            stops = [startAddr, endAddr];
            return;
        } else {
            config.url = "https://maps.googleapis.com/maps/api/directions/json?origin=" + start +
            "&destination=" + end + "&mode=" + "driving" + "&key=" + YOUR_API_KEY;
            axios(config).then(function (secondResponse) {
                let dataCar = JSON.stringify(secondResponse.data);
                console.log("CAR DATA");
                console.log(dataCar);
                for (let j = 0; j < dataCar.routes.length; j++) {
                    // sum up all driving times
                }
                if (totalCarTime >= time) {
                    carOrNot = true;
                    stop = [startAddr, endAddr];
                } else {
                    let currentDriveTime = 0;
                    let currentNonCarTime = totalNonCarTime;
                    while ((currentDriveTime + currentNonCarTime) > time) {
                        currentDriveTime += dataCar.routes[legIndex]; // this is TIME
                        currentDriveMillage += dataCar.routes[legIndex]; // this is MILLAGE
                        currentNonCarTime = totalNonCarTime - (currentNonCarTime + data.routes[legIndex]); // this is TIME FOR BIKE
                        legIndex += 1;
                    }
                    stops = [startAddr, dataCar.routes[legIndex], endAddr]; // change here
                }

            })
        }
    })
    .catch(function (error) {
        return (error);
    })


    let transportation;
    if (ownsBike) transportation = "BIKING";
    else transportation = "WALKING";
    if (stops.length == 2) { // A --> B walk/bike
        if (carOrNot) onChangeHandler(stops[0], stops[1], "DRIVING");
        else onChangeHandler(stops[0], stops[1], transportation);
    }
    else { // A --> B --> C swap from driving to walk/bike
        onChangeHandler(stops[0], stops[1], "DRIVING");
        onChangeHandler(stops[1], stops[2], transportation);
    }
}

class WelcomeDisplay {
    constructor() {
        let self = this;
        /* Get the three main divs */
        this.instElem = document.getElementById("instruction-view");
        this.elem = document.getElementById("app-view");
        this.creditElem = document.getElementById("credits-view");

        /* Generate down arrow event listeners */
        this.scrollButton = this.instElem.querySelector("input[name=scrollButton]");
        this.scrollButton.addEventListener("click", function() {
            self.elem.scrollIntoView({behavior: "smooth"});
        }, false);

        this.scrollButton2 = this.elem.querySelector("input[name=newScrollButton]");
        this.scrollButton2.addEventListener("click", function() {
            self.creditElem.scrollIntoView({behavior: "smooth"});
        }, false);

        /* Generate up arrow event listeners */
        this.upArrow = this.elem.querySelector("input[name=upButton]");
        this.upArrow.addEventListener("click", function() {
        self.instElem.scrollIntoView({behavior: "smooth"});
        }, false);

        this.upArrow2 = this.creditElem.querySelector("input[name=newUpButton]");
        this.upArrow2.addEventListener("click", function() {
            self.elem.scrollIntoView({behavior: "smooth"});
        }, false);

        this.inputTime = this.elem.querySelector("input[name=time]"); //REMEMBER TO CHANGE
        this.inputBike = this.elem.querySelector("input[name=bike]"); //REMEMBER TO CHANGE
        this.searchButton = this.elem.querySelector("input[name=searchButton]");
        this.startAddr = this.elem.querySelector("input[name=startAdd]");
        this.endAddr = this.elem.querySelector("input[name=endAdd]");
        this.searchButton.addEventListener("click", function() {
            let bikeChecked = false;
            let time;
            if (self.inputBike.checked) {
                bikeChecked = true;
            }
            if (self.inputTime.value.trim() == "" || isNaN(self.inputTime.value) || parseInt(self.inputTime.value) <= 0) {
                alert("INVALID DATA ENTRY");
                self.clearInputs();
                return;
            }
            if (startingAddress == "" || endingAddress == "") {
                alert("Invalid data entry"); //Elaborate Error message
                self.clearInputs();
                return;
            }
            let start = startingAddress;
            let end = endingAddress;
            time = parseInt(self.inputTime.value);
            self.clearInputs();
            findBestRoute(start, end, time, bikeChecked);
        }, false);
    }

    clearInputs() {
        startingAddress = "";
        endingAddress = "";
        this.inputTime.value = "";
        this.startAddr.value = "";
        this.endAddr.value = "";
    }   
}

function main() {
    new WelcomeDisplay();
}

window.addEventListener("load", main, false);