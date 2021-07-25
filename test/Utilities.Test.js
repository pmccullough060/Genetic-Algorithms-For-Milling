import { assert } from 'chai'
import { randomNo, randomInt } from '../src/Utilities.js'

//These test are more to allow a convenient way to debug this method etc... 

describe('randomNo', () => {

    it('should return between 1 and 3', () => {
        const num = randomNo(1, 3);
        assert.isTrue(num > 1 && num < 3);
    })

    it('should return between 1.5 and 2', () => {
        const num = randomNo(1.5, 2);
        assert.isTrue(num >= 1.5 && num < 2);
    })
})

describe('randomInt', () => {

    it('should return between 1 and 3 exclusive', () => {
        const num = randomInt(1, 3);
        assert.isTrue(num >= 1 && num < 3);
    })
})