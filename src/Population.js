import { Member } from '../src/Member.js';
import * as Utilities from '../src/Utilities.js'; 

const toolHeight = 20;
const toolDia = 10;

export class Population {

   constructor(size){
      this.size = size;
      this.members = [];
   }

   createPopulation(){
      for(let i = 0; i < this.size; i ++ ){
         var axial = Utilities.randomNo(0.01,toolHeight);
         var radial = Utilities.randomNo(0.01,toolDia);
         this.members.push(new Member(radial, axial));
      }
   }

   sumFitness(){
      var sum = 0;
      for (var i = 0; i < this.members.length; i++){
         var mem = this.members[i];
         sum += mem.fitness();
      }
      return sum;
   }

   _createMatingPool(){
      const matingPool = [];
      const sumFitness = this._sumFitness();
      
      filteredMembers.forEach((m) => {
         
         //fitness proportionate selection:
         const f= Math.floor((m.fitness() / sumFitness) * 100 ) || 1;
         
         //fitter members are more populus in the mating pool:
         for(let i = 0; i < f; i += 1){
            matingPool.push(m);
         }
      });

      return matingPool;
   }

}