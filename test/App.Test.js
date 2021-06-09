import { strictEqual } from 'assert';
import * as Test from '../src/Test.js';

describe('Simple Math Test', () => {
   it('should return 2', () => {
      strictEqual(1+1,2);
   });

   //Test stuff for now......
   it('should return hello', ()=>{
      strictEqual(Test.hello(), "hello peter");
   });
})