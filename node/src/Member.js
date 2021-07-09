import { randomBool, randomNo } from '../src/Utilities.js'; 

//Tool constants
const feedPerTooth = 0.1;
const toolDia = 10;
const toolHeight = 40;
const noCuttingEdges = 4;
const spindleSpeed = 3000;
const tangForceMax = 0.05;

//Workpiece constants
const cutLength = 50;

//Material constants
const spefCuttingForce = 1000;

export class Member {

   constructor(radial, axial, cutRadial, cutAxial){
      this.radial = radial;
      this.axial = axial;
      this.cutRadial = cutRadial;
      this.cutAxial = cutAxial;
      this.feedPerTooth = feedPerTooth;
      this.compensatedFeedPerTooth();
   }

   static createMember(cutRadial, cutAxial){
      const maxRadial = cutRadial <= toolDia ? cutRadial : toolDia;
      const radial = randomNo(0.01, maxRadial);
      const maxAxial = cutAxial <= toolHeight ? cutAxial : toolHeight; 
      const axial = randomNo(0.01, maxAxial);
      return new Member(radial, axial, cutRadial, cutAxial);
   }

   crossover(partner){
      const first = new Member(this.radial, partner.axial, this.cutRadial, this.cutAxial);
      const second = new Member(partner.radial, this.axial, this.cutRadial, this.cutAxial);
      return first.fitness() > second.fitness() ? first : second;
   }

   mutate(mutationRate){
      if(Math.random() < mutationRate){

         if(randomBool){
            this.axial = randomNo(this.axial, toolHeight);
         }
         else{
            this.radial = randomNo(toolDia/6, toolDia / 2);
         }
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
      return Math.ceil(this.cutAxial/this.axial);
   }

   noPassesRadial(){
      //cutRadial (mm)
      return Math.ceil(this.cutRadial/this.radial);
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
      var finalFitness = intialFitness - this.poorToolPositionFactor() * intialFitness * 0.1;

      return finalFitness
   }
}
