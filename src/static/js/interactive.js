function clamp(num, min, max){ 
    return Math.min(Math.max(num, min), max);
}

var counter = 0;


var values = {
    'smoke': 0,
    'flame1': 0,
    'flame2': 0,
    'flame3': 0,
    'flame4': 0,
    'flame5': 0,
};

const valueTexts = {
    'smoke-text': document.getElementById("smoke-value"),
    'flame-text1': document.getElementById("flame-value-1"),
    'flame-text2': document.getElementById("flame-value-2"),
    'flame-text3': document.getElementById("flame-value-3"),
    'flame-text4': document.getElementById("flame-value-4"),
    'flame-text5': document.getElementById("flame-value-5"),
}

const valueSymbols = {
    'smoke-symbol': document.getElementById("smoke-symbol"),
    'flame-symbol1': document.getElementById("flame-symbol-1"),
    'flame-symbol2': document.getElementById("flame-symbol-2"),
    'flame-symbol3': document.getElementById("flame-symbol-3"),
    'flame-symbol4': document.getElementById("flame-symbol-4"),
    'flame-symbol5': document.getElementById("flame-symbol-5"),
}

const camImg = document.getElementById("cam-img")
const camPlaceholder = document.getElementById("cam-placeholder-img")


function doLoop(loopCount, intervalID, func) {
    counter++;
    func()

    if (counter >= loopCount) {
        clearInterval(intervalID);
    }
}

function updateValue(labelSplit, newValue){
    if(labelSplit[0] == "smoke"){
        var deltaSmokeValue = newValue - values['smoke'];
        if(deltaSmokeValue >= 5) {valueSymbols['smoke-symbol'].src = "/static/img/IncreaseSymbol.png";}
        if(deltaSmokeValue <= -5) {valueSymbols['smoke-symbol'].src = "/static/img/DecreaseSymbol.png";}
        if(deltaSmokeValue > -5 && deltaSmokeValue < 5) {valueSymbols['smoke-symbol'].src = "/static/img/ModerateSymbol.png";}
        valueTexts['smoke-text'].textContent = `${newValue}%`;
        values['smoke'] = newValue;
    }
    if(labelSplit[0] == "flame"){
        var deltaFlameValue = newValue - values[`flame${labelSplit[2]}`];
        if (deltaFlameValue >= 5) { valueSymbols[`flame-symbol${labelSplit[2]}`].src = "/static/img/IncreaseSymbol.png"; }
        if (deltaFlameValue <= -5) { valueSymbols[`flame-symbol${labelSplit[2]}`].src = "/static/img/DecreaseSymbol.png"; }
        if (deltaFlameValue > -5 && deltaFlameValue < 5) { valueSymbols[`flame-symbol${labelSplit[2]}`].src = "/static/img/ModerateSymbol.png"; }
        valueTexts[`flame-text${labelSplit[2]}`].textContent = `${newValue}%`;
        values[`flame${labelSplit[2]}`] = newValue;
    }
}

function getValue(){

    function initialize(response){
        for (i in response.results){
            var labelName = response.results[i].label;
            var labelSplit = labelName.split("_");
            var newValue = response.results[i].lastValue.value;
            updateValue(labelSplit, newValue);
        }
    }

    function initCamImage(response){
        if(response){
            if(response["new-photo"]){
                camPlaceholder.classList.add("hidden")
                camImg.classList.remove("hidden")
                camImg.src = response["new-photo"];
            }else{
                camPlaceholder.classList.remove("hidden")
                camImg.classList.add("hidden")
            }
        } else {
            camPlaceholder.classList.remove("hidden")
            camImg.classList.add("hidden")
        }
    }

    const ubidotsVariablesURL = "https://industrial.api.ubidots.com/api/v2.0/devices/~fitha-tool1/variables/";
    const xmlRequest = new XMLHttpRequest;
    try {
        xmlRequest.responseType = "json";
        xmlRequest.addEventListener("load", () => initialize(xmlRequest.response));
        xmlRequest.addEventListener("error", () => console.error("XHR error"));
        xmlRequest.open("GET", ubidotsVariablesURL, true);
        xmlRequest.setRequestHeader("X-Auth-Token", "BBUS-vPrY4JjuPuLa7uCmklaNEfx3naItpV");
        xmlRequest.send(null)
    } catch(error){
        console.log("ERROR LE", error);
    }

    const camUrl = "http://192.168.123.200:3000/v1/img";
    const xmlCam = new XMLHttpRequest;
    try {
        xmlCam.responseType = "json";
        xmlCam.addEventListener("load", () => initCamImage(xmlCam.response));
        xmlCam.addEventListener("error", () => console.error("XHR error"));
        xmlCam.open("GET", camUrl, true);
        xmlCam.setRequestHeader("X-Auth-Token", "FIT12354");
        xmlCam.send(null)
    } catch(error){
        console.log("ERROR LE", error);
    }
}

getValue();

counter = 0;
const intervalId = setInterval(function(){doLoop(20000, intervalId, getValue)}, 2000)