import { assert } from 'chai';
import { Population } from '../src/Population.js';
import { Member } from '../src/Member.js';

describe('createPopulation',() => {
   
   it('should have 50 members', () => {
      const pop = new Population(50);
      pop.createPopulation();
      assert.strictEqual(50, pop.members.length)
   });
});

describe('sumFitness',() => {
   it('should sum fitness correctly', () => {
      const pop = new Population(10);
      pop.createPopulation();

      var sum = 0.0;

      assert.strictEqual(sum, pop.sumFitness());
   })
});