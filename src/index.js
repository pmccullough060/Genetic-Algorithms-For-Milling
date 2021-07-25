import { createScene, updateScene } from '../src/scene.js';
import "../css/main.css";

//creates the three.js scene:
const renderer = createScene();

//Adding event listeners and append domElements to appropriate elements.
window.onload = function () {
	document.getElementById("threescene").appendChild(renderer.domElement);
	document.getElementById("cutWidthSlider").addEventListener("input", updateCutWidth);
	document.getElementById("cutDepthSlider").addEventListener("input", updateCutDepth);

	//Load the geometry after the window has loaded to increase performance:
	updateGeometry();
};

function updateCutWidth(event) {
	document.getElementById("cutWidth").textContent = event.target.value;
	updateGeometry()
}

function updateCutDepth(event) {
	document.getElementById("cutDepth").textContent = event.target.value;
	updateGeometry();
}

function updateGeometry() {
	const cutWidth = document.getElementById("cutWidthSlider").value;
	const cutDepth = document.getElementById("cutDepthSlider").value;
	updateScene(cutWidth, cutDepth);
}
