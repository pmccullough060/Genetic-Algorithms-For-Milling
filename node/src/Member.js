import { randomBool, randomNo } from '../src/Utilities.js'; 

export class Member {
   constructor(radial, axial, parameters){
      this.radial = radial;
      this.axial = axial;
      this.parameters = parameters;
      this.feedPerTooth = this.parameters.feedPerTooth;
      this.compensatedFeedPerTooth();
   }

   static createMember(parameters){
      //Getting constants from parameters object:
      const toolHeight = parameters.toolHeight;
      const toolDia = parameters.toolDia;
      const cutRadial = parameters.cutRadial;
      const cutAxial = parameters.cutAxial;

      const maxRadial = cutRadial <= toolDia ? cutRadial : toolDia;
      const radial = randomNo(0.01, maxRadial);
      const maxAxial = cutAxial <= toolHeight ? cutAxial : toolHeight; 
      const axial = randomNo(0.01, maxAxial);

      return new Member(radial, axial, parameters);
   }

   crossover(partner){
      const first = new Member(this.radial, partner.axial, this.parameters);
      const second = new Member(partner.radial, this.axial, this.parameters);
      return first.fitness() > second.fitness() ? first : second;
   }

   mutate(mutationRate){
      if(Math.random() < mutationRate){

         if(randomBool){
            this.axial = randomNo(this.axial, this.parameters.toolHeight);
         }
         else{
            this.radial = randomNo(this.parameters.toolDia/6, this.parameters.toolDia / 2);
         }
      }
   }

   compensatedFeedPerTooth(){
      const toolDia = this.parameters.toolDia;
      const feedPerTooth = this.parameters.feedPerTooth;

      //Increasing the feed per tooth to compensate for radial chip thinning
      // radial (mm), toolDia (mm), feedPerTooth (mm) 
      if(this.radial < this.parameters.toolDia/2){
         this.feedPerTooth = (feedPerTooth * toolDia)/(2 * Math.sqrt(toolDia * this.radial - Math.pow(this.radial , 2)));
      }
   }

   tableFeed(){
      const spindleSpeed = this.parameters.spindleSpeed;
      const noCuttingEdges = this.parameters.noCuttingEdges;

      //feedperTooth (mm), toolDia (mm), spindleSpeed (r/min), tableFeed (mm/min)
      return this.feedPerTooth * spindleSpeed * noCuttingEdges;
   }

   noPassesAxial(){
      const cutAxial = this.parameters.cutAxial;

      //cutAxial (mm)
      return Math.ceil(cutAxial/this.axial);
   }

   noPassesRadial(){
      const cutRadial = this.parameters.cutRadial;

      //cutRadial (mm)
      return Math.ceil(cutRadial/this.radial);
   }

   poorToolPositionFactor(){
      const toolDia = this.parameters.toolDia;

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
      const cutLength = this.parameters.cutLength;

      //table feed (mm/min), cutLength (mm), result (min)
      return (this.noPassesAxial() * this.noPassesRadial() * cutLength) / this.tableFeed();
   }

   netPower(){
      const spefCuttingForce = this.parameters.spefCuttingForce;

      //radial (mm), axial (mm), tableFeed (mm/min), spefCuttingForce (N/mm2), result (kW)
      return (this.radial * this.axial * this.tableFeed() * spefCuttingForce) / 6e7;
   }

   torque(){
      const spindleSpeed = this.parameters.spindleSpeed;

      //netPower (kW), spindleSpeed (r/min), result (Nm)
      return (this.netPower() * 3e4) / (Math.PI * spindleSpeed);
   }

   tangentialForce(){
      const toolDia = this.parameters.toolDia;

      //torque (Nm), toolDia (mm), result (N)
      return this.torque() * toolDia / 1000;
   }

   fitness(){
      const tangForceMax = this.parameters.tangForceMax;

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
