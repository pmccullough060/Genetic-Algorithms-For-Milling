import { Population } from "../src/Population.js";
import { Parameters } from "../src/Parameters.js";

function generate(size, mutationRate, generations){
    const parameters = new Parameters(20, 20);
    const population = new Population(size, mutationRate, parameters);
    population.evolve(generations);
}

generate(50, 0.5, 10);
