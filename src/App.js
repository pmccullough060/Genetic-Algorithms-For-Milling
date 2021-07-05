import { Population } from "../src/Population.js";

function generate(size, mutationRate, generations){
    //Create a population and evolve for N generations
    const population = new Population(size, mutationRate);
    population.evolve(generations);

    for(let i = 0; i < population.members.length; i++){
        console.log(member.fitness());
    }
}

generate(20, 0.05, 5);