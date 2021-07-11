import { createScene } from '../src/scene.js'

//creates the three.js scene:
const renderer = createScene();



//When the window has loaded append the renderer.domElement to the appropriate div.
window.onload = function () {
    document.getElementById('threescene').appendChild(renderer.domElement);
  };