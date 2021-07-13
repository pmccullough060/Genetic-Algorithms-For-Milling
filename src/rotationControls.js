import { Vector3 } from 'three';

//https://github.com/pmccullough060/Orbit-Control-For-3.js/blob/master/JavaScriptFiles/index.js
export class rotationControls{

    constructor(inputCamera, inputRenderer){
        this.camera = inputCamera;
        this.renderer = inputRenderer;
    }

    Add(){
        var onClickStartX = null;
        var onClickStartY = null;
        const $this = this;

        function onMouseDown( event ){
            onClickStartX = event.clientX;
            onClickStartY = event.clientY;
        }

        function onMouseMove( event ){
            if(onClickStartX === null || onClickStartY === null){
                return;
            }
            else{
                $this.CalculateCameraPositions(event.clientX - onClickStartX,  event.clientY - onClickStartY);
            }
        }
        
        function onMouseUp( event ){

            $this.CalculateCameraPositions(event.clientX - onClickStartX, event.clientY - onClickStartY);
            onClickStartX = null;
            onClickStartY = null;
        }

        this.renderer.domElement.addEventListener("mousedown", onMouseDown);
        this.renderer.domElement.addEventListener("mouseup", onMouseUp);
        this.renderer.domElement.addEventListener("mousemove", onMouseMove);
    }

    CalculateCameraPositions(deltaX, deltaY){

        const sensitivity = 5000;
        var radianPerPixel = (Math.PI / sensitivity);
        var deltaPhi = radianPerPixel * deltaX;
        var deltaTheta = radianPerPixel * deltaY;
        var centre = new Vector3();
        var cameraPosition = this.camera.position.sub(centre);
        var radius = cameraPosition.length();
        var theta = Math.acos(cameraPosition.z / radius);
        var phi = Math.atan2(cameraPosition.y, cameraPosition.x);

        theta = Math.min(Math.max(theta - deltaTheta, 0), Math.PI);

        phi -= deltaPhi;

        cameraPosition.x = radius * Math.sin(theta) * Math.cos(phi);
        cameraPosition.y = radius * Math.sin(theta) * Math.sin(phi);
        cameraPosition.z = radius * Math.cos(theta);

        this.camera.position.add(centre);
        this.camera.lookAt(centre);
    }
}