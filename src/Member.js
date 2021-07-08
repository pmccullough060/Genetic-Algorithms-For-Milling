import { randomBool, randomNo } from '../src/Utilities.js'; 

const feedPerTooth = 0.1;
const toolDia = 10;

//temp sort this out ASAP
const toolHeight = 40;

const noCuttingEdges = 4;
const spindleSpeed = 3000;

//these params will be set by the user.....
const cutLength = 50;
const cutAxial = 30;
const cutRadial = 30;

//Max tangential cutting force
const tangForceMax = 0.05;

//Specific cutting force alu
const spefCuttingForce = 1000;

export class Member {

   //would be beneficial if radial and axial where immutable?
   constructor(radial, axial){

      this.radial = radial;
      this.axial = axial;
      this.feedPerTooth = feedPerTooth;

      this.compensatedFeedPerTooth();
   }

   crossover(partner){
      //we can bias the crossover too if need by changing randomBool method:
      return randomBool() ? new Member(this.radial, partner.axial) 
                          : new Member(partner.radial, this.axial);
   }

   mutate(mutationRate){
      //Mutate radial:
      if(Math.random() < mutationRate){
         this.axial = randomNo(0.01, toolHeight);
         
      }
      //Mutate axial:
      if(Math.random() < mutationRate){
         this.radial = randomNo(0.01, toolDia);
      }
   }

   compensatedFeedPerTooth(){
      //Increasing the feed per tooth to compensate for radial chip thinning
      // radial (mm), toolDia (mm), feedPerTooth (mm) 
      if(this.radial < toolDia/2){
         this.feedPerTooth = (feedPerTooth * toolDia)/(2 * Math.sqrt(toolDia * this.radial - Math.pow(this.radial , 2)));
      }
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
      if(this.radial > toolDia/2){
         return (this.radial-toolDia/2) / (toolDia/2);
      }
      else{
         return 0;
      }
   }

   totalCuttingTime(){
      //table feed (mm/min), cutLength (mm), result (min)
      return (this.noPassesAxial() * this.noPassesRadial() * cutLength) / this.tableFeed();
   }

   netPower(){
      //radial (mm), axial (mm), tableFeed (mm/min), spefCuttingForce (N/mm2), result (kW)
      return (this.radial * this.axial * this.tableFeed() * spefCuttingForce) / 6e7;
   }

   torque(){
      //netPower (kW), spindleSpeed (r/min), result (Nm)
      return (this.netPower() * 3e4) / (Math.PI * spindleSpeed);0
   }

   tangentialForce(){
      //torque (Nm), toolDia (mm), result (N)
      return this.torque() * toolDia / 1000;
   }

   fitness(){
      //Tool will fail so particular member is not valid.
      if(this.tangentialForce() >= tangForceMax){
         return 0.0;
      }

      //Inverse of the time taken to cut, make things conceptual a bit easier understand later on if we optimize for max fitness.
      //totalCuttingTime (mm)
      var intialFitness = (1 / this.totalCuttingTime() * 100);

      //The penalty for poor tool position can be up to 20% of the cutting time where radial = toolDia;
      var finalFitness = intialFitness - this.poorToolPositionFactor() * intialFitness* 0.2;

      return finalFitness
   }
}
