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

describe('createMatingPool',() => {
   
   it('should have 50 members', () => {
      const pop = new Population(50);
      pop.createPopulation();

      //Test code:

      var matingPool = pop.createMatingPool();
      assert.strictEqual(50, pop.members.length)
   });
});

