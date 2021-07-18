var THREE = require('three');
var OrbitControls = require('three-orbit-controls')(THREE)

let camera, scene, renderer;

//add cut width and cut height as input parameters: 
export function createScene(){
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth/2.5, window.innerHeight/2.5);

    addCamera();
    addLighting();
    addGeometry();
    animate();
    
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;

    var axisHelper = new THREE.AxesHelper(3);
    scene.add(axisHelper);

    window.addEventListener( 'resize', onWindowResize, false );
    return renderer;
}

function addCamera(){
    camera = new THREE.PerspectiveCamera( 60, (window.innerWidth/2.5) / (window.innerHeight/2.5), 1, 1000 );
    //camera.up = new THREE.Vector3(0, 1, 0);
    camera.position.set(4, 4, 4);
    var centre = new THREE.Vector3();
    camera.lookAt(centre);
}

function addLighting(){
    const ambientLight = new THREE.AmbientLight( 0x222222 );
    scene.add( ambientLight );
    const pointLightOne = new THREE.PointLight( 0x222222, 12, 100 );
    pointLightOne.position.set(5,5,5);
    scene.add(pointLightOne);
}

function addGeometry(){
    const height = 1.5;
    const width = 2;
    
    //these will be variables
    const cutHeight = 1;
    const cutWidth = 0.25;
    
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
        depth: 2,
        bevelEnabled: false,
    }

     const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
     const material = new THREE.MeshLambertMaterial({color: 0x037584});
     const mesh = new THREE.Mesh(geometry, material);
     
     mesh.name = "stock";

     if(scene.getObjectByName(mesh.name)){
        //scene.add(mesh);
     }    
     
     scene.add(mesh);
}

function animate(){
    renderer.render(scene, camera);
    var frameId = window.requestAnimationFrame(animate);
}

function onWindowResize() {
    camera.aspect = (window.innerWidth/3) / (window.innerHeight/3);
    camera.updateProjectionMatrix();
    renderer.setSize((window.innerWidth/3), (window.innerHeight/3));
}

export function updateScene(parameters){
    //TODO: Updates the scene as required, 
    //typically after a genetic run has been completed.
}

