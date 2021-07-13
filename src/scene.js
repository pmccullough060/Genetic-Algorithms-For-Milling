import { rotationControls } from '../src/rotationControls.js'

import { Scene, 
         WebGLRenderer, 
         PerspectiveCamera, 
         Vector3, 
         AmbientLight, 
         PointLight,
         BoxGeometry,
         Mesh,
         MeshLambertMaterial } from 'three';

let camera, rotationControl, scene, renderer;

export function createScene(){
    scene = new Scene();
    renderer = new WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth/3, window.innerHeight/3);

    addCamera();
    addLighting();
    addGeometry();
    animate();
    
    rotationControl = new rotationControls(scene, camera, renderer, document);
    rotationControl.Add();

    window.addEventListener( 'resize', onWindowResize, false );

    return renderer;
}

function addCamera(){
    camera = new PerspectiveCamera( 60, (window.innerWidth/3) / (window.innerHeight/3), 1, 1000 );
    camera.up = new Vector3(0, 0, 1);
    camera.position.set(2, 2, 2);
    var centre = new Vector3();
    camera.lookAt(centre);
}

function addLighting(){
    const ambientLight = new AmbientLight( 0x222222 );
    scene.add( ambientLight );
    const pointLightOne = new PointLight( 0x222222, 5, 100 );
    pointLightOne.position.set(5,5,5);
    scene.add(pointLightOne);
}

function addGeometry(){
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshLambertMaterial({color: 0xFFCC00});
    const mesh = new Mesh(geometry, material);
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

