const feedPerTooth = 0.1;
const toolDia = 10;
const noCuttingEdges = 4;
const spindleSpeed = 3000;

//these params will be set by the user.....
const cutLength = 50;
const cutAxial = 20;
const cutRadial = 20;

//Max tangential cutting force
const tangForceMax = 5;

//Specific cutting force alu
const spefCuttingForce = 1000;

export class Member {

   constructor(radial, axial){

      this.radial = radial;
      this.axial = axial;
      this.feedPerTooth = feedPerTooth;

      this.compensatedFeedPerTooth();
   }

   compensatedFeedPerTooth(){
      //Increasing the feed per tooth to compensate for radial chip thinning
      // radial (mm), toolDia (mm), feedPerTooth (mm) 
      if(this.radial < toolDia/2){
         this.feedPerTooth = (feedPerTooth * toolDia)/(2 * Math.sqrt(toolDia * this.radial - Math.pow(this.radial , 2)));
      }
   }

   cuttingSpeed(){
      //spindleSpeed (r/min), toolDia (mm), cuttingSpeed (m/min)
      return (spindleSpeed * toolDia * noCuttingEdges) / 1000;
   }

   tableFeed(){
      //feedperTooth (mm), toolDia (mm), spindleSpeed (r/min), tableFeed (mm/min)
      return this.feedPerTooth * spindleSpeed * noCuttingEdges;
   }

   noPassesAxial(){
      //cutAxial (mm)
      return Math.ceil(cutAxial/this.axial);
   }

   noPassesRadial(){
      //cutRadial (mm)
      return Math.ceil(cutRadial/this.radial);
   }

   poorToolPositionFactor(){
      //Ranges from 0 (optimal) to 1 (poor)
      //Accounts for "Over cutting" in the axial direction where axial > toolDia/2 which overheats the tool.
      //The effect of radial chip thinning is mitigated by increasing the feedPerTooth so "light" cuts are not penalised.
      //axial (mm), toolDia (mm)
      if(this.axial > toolDia/2){
         return ((this.axial-toolDia/2) / (toolDia/2));
      }
   }

   totalCuttingTime(){
      //table feed (mm/min), cutLength (mm), result (min)
      return (this.noPassesAxial() * this.noPassesRadial() * cutLength) / this.tableFeed();
   }

   netPower(){
      //radial (mm), axial (mm), tableFeed (mm/min), spefCuttingForce (N/mm2), result (kW)
      return (this.radial * this.axial * this.tableFeed() * spefCuttingForce) / 60e6;
   }

   torque(){
      //netPower (kW), spindleSpeed (r/min), result (Nm)
      return (this.netPower() * 30e3) /(Math.PI * spindleSpeed);
   }

   tangentialForce(){
      //torque (Nm), toolDia (mm), result (N)
      return this.torque() * toolDia / 1000;
   }

   fitness(){

      //Tool will fail so particular member is not valid.
      if(this.tangentialForce() >= tangForceMax){
         return 0;
      }

      //Inverse of the time taken to cut, make things conceptual a bit easier understand later on if we optimize for max fitness.
      //totalCuttingTime (mm)
      const intialFitness = 1 / this.totalCuttingTime() * 100;

      //The penalty for poor tool position can be up to 20% of the cutting time where radial = toolDia;
      return intialFitness - this.poorToolPositionFactor() * intialFitness* 0.2;
   }
}
