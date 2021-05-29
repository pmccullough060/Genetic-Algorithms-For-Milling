import { strictEqual } from 'assert';
import * as App from '../src/App.js';

//describe - a logical grouping of tests
//it - a single test
//assert - how you validate that the test works.

describe('Simple Math Test', () => {
   it('should return 2', () => {
      strictEqual(1+1,2);
   });

   //Test stuff for now......
   it('should return hello', ()=>{
      strictEqual(App.hello(), "hello");
   });
})