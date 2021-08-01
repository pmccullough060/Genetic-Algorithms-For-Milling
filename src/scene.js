import * as THREE from 'three';
var OrbitControls = require('three-orbit-controls')(THREE)

let camera, scene, renderer;

const meshName = "StockToCut";

//add cut width and cut height as input parameters: 
export function createScene() {
	scene = new THREE.Scene();
	renderer = new THREE.WebGLRenderer({ alpha: true });
	renderer.setSize(window.innerWidth / 2.25, window.innerHeight / 2.25);

	addCamera();
	addLighting();
	animate();

	const controls = new OrbitControls(camera, renderer.domElement);
	//controls.enableZoom = false;

	var axisHelper = new THREE.AxesHelper(3);
	scene.add(axisHelper);

	window.addEventListener('resize', onWindowResize, false);

	return renderer;
}

function addCamera() {
	camera = new THREE.PerspectiveCamera(60, (window.innerWidth / 2.5) / (window.innerHeight / 2.5), 1, 10000);
	//camera.up = new THREE.Vector3(0, 1, 0);
	camera.position.set(300, 300, 300);
	var centre = new THREE.Vector3();
	camera.lookAt(centre);
}

function addLighting() {
	const ambientLight = new THREE.AmbientLight(0x222222);
	scene.add(ambientLight);
	const pointLightOne = new THREE.PointLight(0x222222, 12, 0, 1);
	pointLightOne.position.set(200, 200, 200);
	scene.add(pointLightOne);
}

//Adds the initial geometry:
function addGeometry(member) {

	//Getting the initial cutting parameters for the member:
	const parameters = member.parameters;
	var cutWidth = parameters.cutRadial;
	var cutHeight = parameters.cutAxial;

	//Dimensions of the workpiece:
	const height = 100;
	const width = 100;

	//50 is the max value of the slider - should this be percentage in future etc.
	//cutWidth = cutWidth / 50;
	//cutHeight = cutHeight / 50;

	const shape = new THREE.Shape();
	shape.moveTo(0, 0);
	shape.lineTo(width, 0);
	shape.lineTo(width, (height - cutHeight));
	shape.lineTo((width - cutWidth), (height - cutHeight));
	shape.lineTo((width - cutWidth), height);
	shape.lineTo(0, height);
	shape.lineTo(0, 0);

	const extrudeSettings = {
		steps: 10,
		depth: 150,
		bevelEnabled: false,
	}

	const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
	const material = new THREE.MeshLambertMaterial({ color: 0x037584 });
	const mesh = new THREE.Mesh(geometry, material);
	mesh.name = meshName;

	//now we need to add the cuts, each cut will be denoted as a rectangle that can be selected
	
	const noCutsWidth = member.noPassesRadial();
	const noCutsHeight = member.noPassesAxial();

	addToolPath(member, width, height);

	return mesh;
}

//Adding the toolpaths to the scene:
function addToolPath(member, width, height ){

	//remember the cut width was intially scaled (lol)

	//Getting require values from parameters object:
	const parameters = member.parameters;

	const noCutsWidth = member.noPassesRadial();
	const noCutsHeight = member.noPassesAxial();

	const cutsOriginX = width - parameters.cutRadial;
	const cutsOriginY = height - parameters.cutAxial;

	const widthIncrement = parameters.cutRadial / noCutsWidth;
	const heightIncrement = parameters.cutAxial / noCutsHeight;

	for(var i = 0; i < noCutsHeight; i++){

		//Here we want to loop through all of the width cuts

		for(var j = 0; j < noCutsWidth; j++){

			//adding the geometry for the width cuts:#
			//Depth is temporarily being set from a hard coded variable:
			var toolPath = new THREE.BoxBufferGeometry(widthIncrement, heightIncrement, 150);
			
			var widthOffset = cutsOriginX + j * widthIncrement + widthIncrement / 2;
			var heightOffset = cutsOriginY +  i * heightIncrement + heightIncrement / 2;

			toolPath.translate(widthOffset, heightOffset, 75);
			
			var material = new THREE.MeshLambertMaterial({ color: 0x808080, transparent:true, opacity: 0.5 });
			var toolPathMesh = new THREE.Mesh( toolPath, material );

			scene.add( toolPathMesh );
		}
	}
}

export function updateScene(member) {

	//Remove all objects in scene:
	for( var i = scene.children.length - 1; i >= 0; i--) { 
		var child = scene.children[i];
		if(child.type === "Mesh"){
			scene.remove(child); 
		}
   }

	//Removing the existing object from the scene:
	//const existingGeometry = scene.getObjectByName(meshName);

	//if (existingGeometry != null) {
		//existingGeometry.geometry.dispose();
		//existingGeometry.material.dispose();
		//scene.remove(existingGeometry);
	//}

	//Add Updated geometry to the scene:
	const mesh = addGeometry(member);

	//Add the new mesh to the scene:
	//this should probably be moved to the addGeometry Method:
	scene.add(mesh);
}

function animate() {
	renderer.render(scene, camera);
	var frameId = window.requestAnimationFrame(animate);
}

function onWindowResize() {
	camera.aspect = (window.innerWidth / 3) / (window.innerHeight / 3);
	camera.updateProjectionMatrix();
	renderer.setSize((window.innerWidth / 3), (window.innerHeight / 3));
}

