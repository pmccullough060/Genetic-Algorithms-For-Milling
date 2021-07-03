//returns any random number between min INCLUDED and max NOT INCLUDED
export function randomNo(min, max){
   return Math.random() * (max - min) + min;
}

//returns an Int random number between min INCLUDED and max INCLUDED
export function randomInt(min, max){
   return Math.floor(Math.random()*(max - min + 1) + min);
}

//returns a random boolean value
export function randomBool(){
   return Math.random() < 0.5;
}