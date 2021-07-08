import { Population } from "../src/Population.js";
import { compareFitness } from '../src/Utilities.js'; 

function generate(size, mutationRate, generations){

    //Create a population and evolve for N generations
    const population = new Population(size, mutationRate);
    population.evolve(generations);

    //Sorting based on fitness
    population.members.sort( compareFitness );

    for(let i = population.members.length-1; i >= 0; i--){
        const member = population.members[i];

        //temp output:
        console.log("///////////////////////////////////////////////")
        console.log(`Member: ${ i + 1 }`);
        console.log(`Axial: ${ member.axial }`);
        console.log(`Radial: ${ member.radial }`);
        console.log(`Axial Passes: ${ member.noPassesAxial() }`);
        console.log(`Radial Passes: ${ member.noPassesRadial() }`);
        console.log(`Total Cutting Time: ${ member.totalCuttingTime() }`);
        //console.log(`Fitness: ${ member.fitness() }`);
        //console.log();
    }
}

generate(50, 0.5, 10);
