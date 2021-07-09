import { Member } from '../src/Member.js';
import { randomInt } from '../src/Utilities.js'; 

export class Population {

   constructor(size, mutationRate, parameters){
      this.size = size;
      this.mutationRate = mutationRate;
      this.parameters = parameters;
      this.members = [];
      this.createPopulation();
   }

   createPopulation(){
      for(let i = 0; i < this.size; i ++ ){
         this.members.push(Member.createMember(this.parameters));
      }
   }

   reproduce(){
      const matingPool = [];
      while(matingPool.length < this.size){
         const mum = this.tournamentSelection(2);
         const dad = this.tournamentSelection(2);
         const child = mum.crossover(dad);
         child.mutate(this.mutationRate);
         if(child.fitness() > 0){
            matingPool.push(child);
         }
      }
      this.members = matingPool;
   }

   tournamentSelection(tournamentSize){
      var best = null;
      for(let i = 0; i < tournamentSize; i++){
         let index = randomInt(0, this.members.length - 1);
         const curr = this.members[index];
         if(best == null || curr.fitness() > best.fitness()){
            best = curr;
         }
      }
      return best;
   }

   evolve(generations){
      for(let i = 0; i < generations; i++){
         this.reproduce();

         if(i >= generations / 4){
            this.mutationRate = 0.02;
         }
         if(i >= generations / 2){
            this.mutationRate = 0.01;
         }

         //For debugging purposes...
         //The population should create an Array[member] for the best of each generation.
         console.log(`Generation: ${ i } Fitness: ${ this.members[0].fitness() }`)
      }
   }
}