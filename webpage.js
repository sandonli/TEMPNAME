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
document.head.appendChild(script);

function initAll() {
    let options = {
        zoom: 14,
        center: {lat: 51.0776, lng: -114.1407}
    }
    let map = new google.maps.Map(document.getElementById("map"), options);
    let marker = new google.maps.Marker({
        position: options.center,
        map: map,
    })

    startingAddr = new google.maps.places.Autocomplete(
        document.getElementById("startingAddress"),
        {
            /*types: ["establishment"],
            fields: ["place_id", "geometry", "name"]*/
        }
    );
    endingAddr = new google.maps.places.Autocomplete(
        document.getElementById("endingAddress"),
        {
            /*types: ["establishment"],
            fields: ["place_id", "geometry", "name"]*/
        }
    );

    startingAddr.addListener("place_changed", startingPlaceChanged);
    endingAddr.addListener("place_changed", endingPlaceChanged);
}

function startingPlaceChanged() { 
    let place1 = startingAddr.getPlace();
    if (!place1.geometry) {
        document.getElementById("startingAddress").placeholder = "Enter a starting address...";
    } else {
        //DO SOMETHING HERE
        //document.getElementById("details").innerHTML = place.name;
        startingAddress = document.getElementById("startingAddress").value;
    }
}

function endingPlaceChanged() { 
    let place2 = endingAddr.getPlace();
    if (!place2.geometry) {
        document.getElementById("endingAddress").placeholder = "Enter a destination...";
    } else {
        //DO SOMETHING HERE
        //document.getElementById("details").innerHTML = place.name;
        endingAddress = document.getElementById("endingAddress").value;

    }
}

function findBestRoute() {
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
     * 
     */
    let travelRoute = {
        origin: startingAddress,
        destination: endingAddress,
        provideRouteAlternatives = true,
        travelMode: 'WALKING'
    }
}




class WelcomeDisplay {
    constructor() {
        let self = this;
        //this.elem = createDOM(/*add html here*/"");
        this.elem = document.getElementById("app-view");
        console.log(this.elem);
        this.inputTime = this.elem.querySelector("input[name=time]"); //REMEMBER TO CHANGE
        this.inputBike = this.elem.querySelector("input[name=bike]"); //REMEMBER TO CHANGE
        this.inputCar = this.elem.querySelector("input[name=car]"); //REMEMBER TO CHANGE
        this.searchButton = this.elem.querySelector("input[name=searchButton]");
        this.startAddr = this.elem.querySelector("input[name=startAdd]");
        this.endAddr = this.elem.querySelector("input[name=endAdd]");
        
        this.searchButton.addEventListener("click", function() {
            let bikeChecked = false;
            let carChecked = false;
            let time;
            if (self.inputBike.checked) {
                bikeChecked = true;
            }
            if (self.inputCar.checked) {
                carChecked = true;
            }
            if (self.inputTime.value.trim() == "" || isNaN(self.inputTime.value) || parseInt(self.inputTime.value) <= 0) {
                alert("INVALID DATA ENTRY");
            }
            if (startingAddress == "" || endingAddress == "") {
                alert("Invalid data entry"); //Elaborate Error message
            }
            startingAddress = "";
            endingAddress = "";
            time = parseInt(self.inputTime.value);
            self.inputTime.value = "";
            self.startAddr.value = "";
            self.endAddr.value = "";
            
            findBestRoute();
        })
    }
    
}
class LoadingScreen {

}

class MapDisplay {
    constructor() {
        this.elem = createDOM(/*add html here*/);
    }
}

function main() {
    let welcome = new WelcomeDisplay();
}

window.addEventListener("load", main, false);