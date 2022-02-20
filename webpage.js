//const pathfinder = require("./webapge.js");
//pathfinder.findBestRoute()

function emptyDOM(elem) {
    while (elem.firstChild) elem.removeChild(elem.firstChild);
}

function createDOM(htmlString) {
    let template = document.createElement("template");
    template.innerHTML = htmlString.trim();
    return template.content.firstChild;
}

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
    
    let marker = new google.maps.Marker({
        position: options.center,
        map: map,
    })

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

function findBestRoute() {
    let ownsBike = false;
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

    

   let stops = ["A", "B", "C"];
   let transportation;
   if (ownsBike == false) {
       transportation = "WALKING";
   } else {
       transportation = "BIKING";
   } // change transportation for the case when you drive there
   if (stops.length == 2) { // A --> B walk/bike
       onChangeHandler(stops[0], stops[1], transportation);
   }
   else { // A --> B --> C swap from driving to walk/bike
       onChangeHandler(stops[0], stops[1], "DRIVING");
       onChangeHandler(stops[1], stops[2], transportation);
   }

}




class WelcomeDisplay {
    constructor() {
        let self = this;
        this.instElem = document.getElementById("instruction-view");
        this.elem = document.getElementById("app-view");

        this.scrollButton = this.instElem.querySelector("input[name=scrollButton]");
        this.scrollButton.addEventListener("click", function() {
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
                return;
            }
            if (startingAddress == "" || endingAddress == "") {
                alert("Invalid data entry"); //Elaborate Error message
                return;
            }
            startingAddress = "";
            endingAddress = "";
            time = parseInt(self.inputTime.value);
            self.inputTime.value = "";
            self.startAddr.value = "";
            self.endAddr.value = "";
            findBestRoute();
        }, false);
    }
    
}

function main() {
    new WelcomeDisplay();
    //console.log(document);
}

// this.temp = document.querySelector("input[name=scrollButton]");
// console.log(this.temp);
// elem.addEventListener("click", function() {
//     console.log("button works");
// })



window.addEventListener("load", main, false);