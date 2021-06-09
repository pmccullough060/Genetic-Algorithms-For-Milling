import { strictEqual } from 'assert';

import { Member } from '../src/Member.js';

describe('compensatedFeedPerTooth', () => {
   it('should return 0.1', () => {
      const member = new Member(10,10);
      strictEqual(0.1,member.feedPerTooth);
   });

   it('should return 0.1155', () => {
      const member = new Member(2.5,10);
      strictEqual(0.1155, member.feedPerTooth, 1);
   });
})