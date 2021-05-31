
//Test stuff for getting the unit tests up and going.
hello();

export function hello(){
   console.log("hello");
   return "hello";
};

//material enums.. might get rid of this...
const materials ={
   ALUMINIUM: "Aluminium",
   STEEL: "Steel"
}

//materials and their respective roughing and finishing cutting speeds.
const cuttingSpeeds =Object.freeze( {
   [materials.ALUMINIUM]: [70,90],
   [materials.STEEL] : [23, 28]
});

//operation enums.
const operations ={
   FINISHING: "Finishing",
   ROUGHING: "Roughing"
}

//Calculation constants
const thinWall = 10;

const feedPerTooth = Object.freeze({
   Under3Inc: 0.04,
   Under10Inc: 0.08,
   Under20Inc: 0.12,
   Over20: 0.16
})

//Number of cutting flutes.
const noFLutes = 4;

runSimulation(50, 40, materials.STEEL);

function runSimulation(partWidth, cutWidth, material){

   var thinWall = thinWallCondition(partWidth, cutWidth);

   var roughCutSpeed = cuttingSpeed(material, operations.ROUGHING);

   var finishCutSpeed = cuttingSpeed(material, operations.FINISHING);

   

}

function thinWallCondition(partWidth, cutWidth){
   return (partWidth - cutWidth <= thinWall);
}

function cuttingSpeed(material, operation){
   return operation === operations.ROUGHING ? cuttingSpeeds[material][0] : cuttingSpeeds[material][1]
}

function SpindleSpeeds(cuttingSpeed, toolDia){
   return (vc * 1000) / (Math.PI * toolDia);
}

function tableFeed(feedPerTooth, toolDia, spindleSpeed){
   return feedPerTooth * noFlutes * spindleSpeed;
}

function machiningStrategy(thinWall, toolDia){

   var radialStock = radialStockToLeave(thinWall, toolDia);

   var axialStock = axialStockToLeave(toolDia);

   

}

function radialStockToLeave(thinWall, toolDia){
   return thinWall ? toolDia : toolDia * 0.05;
}

function axialStockToLeave(toolDia){
   return toolDia * 0.01;
}
