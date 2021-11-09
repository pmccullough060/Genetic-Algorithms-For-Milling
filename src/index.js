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
	document.getElementById("button").onclick = updateGeometry;

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

function updateResult(bestMember) {
	document.getElementById("generationsResult").innerHTML = bestMember.generations;
	document.getElementById("fitnessResult").innerHTML = Math.round(bestMember.fitness());
	document.getElementById("widthCutResult").innerHTML = Math.round(bestMember.noPassesRadial());
	document.getElementById("heightCutResult").innerHTML = Math.round(bestMember.noPassesAxial());
	document.getElementById("machiningTimeResult").innerHTML = Number.parseFloat(bestMember.totalCuttingTime()).toPrecision(2);
	document.getElementById("cutForceResult").innerHTML = Number.parseFloat(bestMember.tangentialForce()).toPrecision(2);
}


function updateGeometry() {

	//Getting the slider values from the DOM:
	var cutWidth = document.getElementById("cutWidthSlider").value;
	var cutDepth = document.getElementById("cutDepthSlider").value;

	//Run the genetic alogorithm to update the scene:
	var bestMember = runGeneticAlgorithm(cutWidth, cutDepth);

	//We use our best member to update the scene:
	updateScene(bestMember);

	updateResult(bestMember);
}

function runGeneticAlgorithm(cutWidth, cutDepth) {

	//Simulation constants:
	const populationSize = 100;
	const mutationRate = 0.05;
	const generations = 50;

	//create a new parameters object:
	const parameters = new Parameters(cutWidth, cutDepth);

	//Create the new population:
	const population = new Population(populationSize, mutationRate, parameters);

	//Start the evolution process:
	const results = population.evolve(generations);

	//temp for debugging purposes:
	console.log(results);

	//Return the last iteration
	return results[results.length - 1];
}



