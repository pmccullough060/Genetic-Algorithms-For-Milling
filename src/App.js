import { Population } from "../src/Population.js";
import { compareFitness } from '../src/Utilities.js'; 

function generate(size, mutationRate, generations){

    //Create a population and evolve for N generations
    const population = new Population(size, mutationRate);
    population.evolve(generations);

    //Sorting based on fitness
    population.members.sort( compareFitness );

    for(let i = 0; i < population.members.length; i++){
        const member = population.members[i];

        //temp output:
        console.log(`Member: ${ i + 1 }`);
        console.log(`Axial: ${ member.axial }`);
        console.log(`Radial: ${ member.radial }`);
        console.log(`Axial Passes: ${ member.noPassesAxial() }`);
        console.log(`Radial Passes: ${ member.noPassesRadial() }`);
        console.log(`Tangential Force: ${ member.tangentialForce() }`);
        console.log(`Fitness: ${ member.fitness() }`);
        console.log();
    }
}

generate(100, 0.05, 10000);