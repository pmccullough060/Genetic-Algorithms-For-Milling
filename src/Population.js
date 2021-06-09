import { Member } from '../src/Member.js';
import * as Utilities from '../src/Utilities.js'; 

const toolHeight = 20;
const toolDia = 10;

class Population {

   constructor(size){
      this.size = size;
      this.members = [];
   }

   createPopulation(){
      for(let i = 0; i < this.size; i += 1){
         var axial = Utilities.getRandomInt(0,toolHeight);
         var radial = Utilities.getRandomInt(0,toolDia);
         this.members.push(new Member(radial, axial));
      }
   }

   _sumFitness(){
      return this.members.reduce((prev, curr) => prev + curr.fitness(),0);
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