import { assert } from 'chai';
import { Member } from '../src/Member.js';

describe('compensatedFeedPerTooth', () => {

   //Cut radial depth is greater than or equal to tooldia / 2:
   it('should return 0.1', () => {
      const member = new Member(10,10,20,20);
      assert.strictEqual(0.1,member.feedPerTooth);
   });

   //Cut radial depth is less than the tooldia / 2:
   it('should return 0.1155', () => {
      const member = new Member(2.5,10);
      assert.approximately(0.1155, member.feedPerTooth, 0.01);
   });
})

describe('tableFeed', () => {

   //Cut radial depth is greater than or equal to tooldia / 2:
   it('should return 1200 mm/min', () => {
      const member = new Member(10,10,20,20);
      assert.strictEqual(1200, member.tableFeed());
   });

   //Cut radial depth is less than the tooldia / 2:
   it('should return 1385.64 mm/min', () => {
      const member = new Member(2.5,10,20,20);
      assert.approximately(1385.64, member.tableFeed(), 0.01);
   });
})

describe('noRadialPasses', () => {

   //Cut radial depth is greater than or equal to tooldia / 2:
   it('should return 2', () => {
      const member = new Member(10,10,20,20);
      assert.strictEqual(2, member.noPassesRadial());
   });

   //Cut radial depth is less than the tooldia / 2:
   it('should return 8', () => {
      const member = new Member(2.5,10,20,20);
      assert.strictEqual(8, member.noPassesRadial());
   });
})

describe('noAxialPasses', () => {

   //Radial cut evenly divides:
   it('should return 4', () => {
      const member = new Member(10,5,20,20);
      assert.strictEqual(4, member.noPassesAxial());
   });

   //Radial cut does not evenly divide:
   it('should return 3', () => {
      const member = new Member(10,8,20,20);
      assert.strictEqual(3, member.noPassesAxial());
   });
})

describe('poorToolPositionFactor', () => {

   //No penalty, radial cut is < toolDia/2:
   it('should return 0', () => {
      const member = new Member(5,10,20,20);
      assert.strictEqual(0, member.poorToolPositionFactor());
   });

   //Maximum penalty radial cut is toolDia:
   it('should return 1', () => {
      const member = new Member(10,10,20,20);
      assert.strictEqual(1, member.poorToolPositionFactor());
   });

   //Maximum penalty radial cut is toolDia:
   it('should return 0.5', () => {
      const member = new Member(7.5,10,20,20);
      assert.strictEqual(0.5, member.poorToolPositionFactor());
      });
})

describe('poorToolPositionFactor', () => {

   //No penalty, radial cut is < toolDia/2:
   it('should return 0', () => {
      const member = new Member(5,10,20,20);
      assert.strictEqual(0, member.poorToolPositionFactor());
   });

   //Maximum penalty radial cut is toolDia:
   it('should return 1', () => {
      const member = new Member(10,10,20,20);
      assert.strictEqual(1, member.poorToolPositionFactor());
   });
})

describe('totalCuttingTime', () => {

   //No feed per tooth compensation:
   it('should return 0.167', () => {
      const member = new Member(10,10,20,20);
      assert.approximately(0.167, member.totalCuttingTime() ,0.01);
   });

   //Feed per tooth compensation:
   it('should return 0.33', () => {
      const member = new Member(2.5,10,20,20);
      assert.approximately(0.577, member.totalCuttingTime() ,0.01);
   });
})

describe('netPower', () => {

   it('should return 2 kW', () => {
      const member = new Member(10,10,20,20);
      assert.approximately(2, member.netPower() ,0.01);
   });
})

describe('torque', () => {

   //These numbers sound tiny but remember its only a 10mm Dia cutter.
   it('should return 6.367 Nm', () => {
      const member = new Member(10,10,20,20);
      assert.approximately(6.367, member.torque() ,0.01);
   });

   it('should return 12.732 Nm', () => {
      const member = new Member(10,20,20,20);
      assert.approximately(12.732, member.torque() ,0.01);
   });
})

describe('tangentialForce', () => {

   it('should return 6.366 N', () => {
      const member = new Member(10,10,20,20);
      assert.approximately(0.0637, member.tangentialForce(), 0.0001);
   });

   it('should return 12.732 N', () => {
      const member = new Member(10,20,20,20);
      assert.approximately(0.127, member.tangentialForce(), 0.001);
   });
})

describe('fitness', () => {

   //Not viable as tangential cutting force/cutting torques is too high....
   it('should return 0', () => {
      const member = new Member(10,20,20,20);
      assert.strictEqual(0, member.fitness());
   });

   it('should return 300', () => {
      const member = new Member(5,10,20,20);
      assert.strictEqual(300, member.fitness());
   });

   it('should return 270', () => {
      const member = new Member(10,5,20,20);
      assert.strictEqual(270, member.fitness());
   });
})

describe('crossover', () => {

   it('should mutate correctly', () => {
      const dad = new Member(5,10,20,20);
      const mum = new Member(1,2,20,20);
      const child = mum.crossover(dad);

      //verify that child contains genetic material from mum and dad:
      const dadGenes = [dad.radial, dad.axial];
      const mumGenes = [mum.radial, mum.axial];
      const childGenes = [child.radial, child.axial];
      
      assert.isTrue(dadGenes.filter(value => childGenes.includes(value)) > 0);
      assert.isTrue(mumGenes.filter(value => childGenes.includes(value)) > 0);
      assert.isFalse(mumGenes.filter(value => dadGenes.includes(value)) > 0);
   });
})