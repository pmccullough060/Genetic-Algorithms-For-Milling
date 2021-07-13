import { createScene } from '../src/scene.js'
import "../css/main.css";

//creates the three.js scene:
const renderer = createScene();

//Adding event listeners and append domElements to appropriate elements.
window.onload = function () {
    document.getElementById("threescene").appendChild(renderer.domElement);
    document.getElementById("axialslider").addEventListener("change", updateAxialCut);
  };

function updateAxialCut(event) {
    document.getElementById("textInput").textContent=event.target.value; 
    updateScene();
  }

function updateScene(){
    console.log(document.getElementById("axialslider").value);
}

