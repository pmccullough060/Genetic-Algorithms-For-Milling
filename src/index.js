import { createScene, updateScene } from '../src/scene.js';
import { Population } from '../src/Population.js'
import { Parameters } from '../src/Parameters.js';
import "../css/main.css";



//creates the three.js scene:
const renderer = createScene();

//Adding event listeners and append domElements to appropriate elements.
window.onload = function () {
	document.getElementById("threescene").appendChild(renderer.domElement);
	document.getElementById("cutWidthSlider").addEventListener("input", updateCutWidth);
	document.getElementById("cutDepthSlider").addEventListener("input", updateCutDepth);
	document.getElementById("button").onclick = runSimulation;
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

function runSimulation() {

	//Simulation constants:
	const populationSize = 50;
	const mutationRate = 0.5;
	const generations = 10;

	//getting the current cutting parameters:
	const cutWidth = document.getElementById("cutWidthSlider").value;
	const cutDepth = document.getElementById("cutDepthSlider").value;

	//create a new parameters object:
	const parameters = new Parameters(cutWidth, cutDepth);

	//Create the new population:
	const population = new Population(populationSize, mutationRate, parameters);

	//Start the evolution process:
	population.evolve(generations);

	//population.evolve should ideally return an array of the best member for each generation:


}

