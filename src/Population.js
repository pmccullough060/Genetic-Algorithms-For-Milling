import { Member } from '../src/Member.js';
import { randomNo, randomInt, compareFitness } from '../src/Utilities.js'; 

const toolHeight = 40;
const toolDia = 10;

export class Population {

   constructor(size, mutationRate){
      this.size = size;
      this.mutationRate = mutationRate;
      this.members = [];

      //Creating the initial population
      this.createPopulation();
   }

   createPopulation(){
      for(let i = 0; i < this.size; i ++ ){
         var axial = randomNo(0.01,toolHeight);
         var radial = randomNo(0.01,toolDia);
         this.members.push(new Member(radial, axial));
      }
   }

   reproduce(){
      const matingPool = [];
      while(matingPool.length < this.size){
         const mum = this.tournamentSelection(2);
         const dad = this.tournamentSelection(2);
         const child = mum.crossover(dad);
         child.mutate(this.mutationRate);

         //It is not beneificial to add non-viable members to the gene pool.
         if(child.fitness() > 0){
            matingPool.push(child);
         }
      }
      this.members = matingPool;
   }

   //Binary tournament selection:
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

         //test code
         if(i >= generations/2){
            this.mutationRate = 0.05;
         }

         if(i >= generations/4){
            this.mutationRate = 0.2;
         }

         console.log(`Generation: ${ i } Fitness: ${ this.members[0].fitness() }`)
      }
   }

   //https://cstheory.stackexchange.com/questions/14758/tournament-selection-in-genetic-algorithms
}