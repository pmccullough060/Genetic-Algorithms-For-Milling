import { Scene, WebGLRenderer } from 'three';

//this is where we will create the three.js scene etc.
export function createScene(){

    //TODO: complete this method.

    const scene = new Scene();
    const renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor("#e5e5e5");
    return renderer;
}

export function updateScene(parameters){
    //TODO: Updates the scene as required, typically after a genetic run has been completed.
}

//TODO: Set up a render loop etc.
