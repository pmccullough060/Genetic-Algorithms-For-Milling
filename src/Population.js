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

   sumFitness(){
      var sum = 0;
      for (var i = 0; i < this.members.length; i++){
         var mem = this.members[i];
         sum += mem.fitness();
      }
      return sum;
   }

   //Roulette wheel.
   createMatingPool(){
      const matingPool = [];
      const sumFitness = this.sumFitness();
      
      //the mating pool will
      this.members.forEach((m) => {
         
         //fitness proportionate selection:
         const f= Math.floor((m.fitness() / sumFitness) * 100 ) || 0;
         
         //fitter members are more populus in the mating pool:
         for(let i = 0; i < f; i ++){
            matingPool.push(m);
         }
      });

      //Pick the best to mate:
      //matingPool.sort( compareFitness );

      //Resizing the population keeping the best of a generation
      //const reducedMatingPool = matingPool.slice(0, this.size);
      return matingPool;
   }

   //tournament selection
   //https://cstheory.stackexchange.com/questions/14758/tournament-selection-in-genetic-algorithms


   reproduce(matingPool){
      //before this step we should potentially reduce the size of the population
      for (let i = 0; i < this.size; i++){
         
         //pick two random members from the mating pool:
         const mum = matingPool[randomInt(0, matingPool.length)];
         const dad = matingPool[randomInt(0, matingPool.length)];

         //crossover
         const child = mum.crossover(dad);

         //mutation
         child.mutate(this.mutationRate);

         //member is "replaced" with a new child
         this.members[i] = child;
      }
   }

   evolve(generations){
      for(let i = 0; i < generations; i++){
         const pool = this.createMatingPool();

         //temp output for debugging:
         if(i % 2 == 0){
            console.log(`Generation: ${ i } Fitness: ${ pool[0].fitness() }`)
         }

         this.reproduce(pool);
      }
   }
}