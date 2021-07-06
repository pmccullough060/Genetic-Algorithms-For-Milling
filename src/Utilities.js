//returns any random number between min INCLUDED and max NOT INCLUDED
export function randomNo(min, max){
   return Math.random() * (max - min) + min;
}

//returns an Int random number between min INCLUDED and max EXCLUDED
export function randomInt(min, max){
   return Math.floor(Math.random() * (max - min)) + min;
}

//returns a random boolean value
export function randomBool(){
   return Math.random() < 0.5;
}

//Comparator, sorts the fitest to the start of the array
export function compareFitness(a, b){
   if(a.fitness() > b.fitness()){
      return -1;
   }
   if(a.fitness() < b.fitness()){
      return 1;
   }
   return 0;
}