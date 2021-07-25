//Tool Constants:
const feedPerTooth = 0.1;
const toolDia = 10;
const toolHeight = 40;
const noCuttingEdges = 4;
const spindleSpeed = 3000;
const tangForceMax = 0.05;
const spefCuttingForce = 1000;
const cutLength = 50;

export class Parameters {
    constructor(cutRadial, cutAxial){
        this.cutRadial = cutRadial;
        this.cutAxial = cutAxial;
    }
    get feedPerTooth(){
        return feedPerTooth;
    }
    get toolDia(){
        return toolDia;
    }
    get toolHeight(){
        return toolHeight;
    }
    get noCuttingEdges(){
        return noCuttingEdges;
    }
    get spindleSpeed(){
        return spindleSpeed;
    }
    get tangForceMax(){
        return tangForceMax;
    }
    get spefCuttingForce(){
        return spefCuttingForce;
    }
    get cutLength(){
        return cutLength;
    }
}