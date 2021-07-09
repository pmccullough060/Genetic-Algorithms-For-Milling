import { Population } from "../src/Population.js";

function generate(size, mutationRate, generations){
    //Create a population and evolve for N generations
    const population = new Population(size, mutationRate, 20, 20);
    population.evolve(generations);
}

generate(50, 0.5, 10);
