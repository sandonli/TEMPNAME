function emptyDOM(elem) {
    while (elem.firstChild) elem.removeChild(elem.firstChild);
}

function createDOM(htmlString) {
    let template = document.createElement("template");
    template.innerHTML = htmlString.trim();
    return template.content.firstChild;
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
            time = parseInt(self.inputTime.value);
            self.inputTime.value = "";
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