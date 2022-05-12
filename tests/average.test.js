const { TestWatcher } = require('jest')
const { average } = require('../utils/for_testing')

describe('Average of', () => {

    test.skip(' one value is the value itself', () => {
        expect(average([1])).toBe(1)
    })

    test.skip(' many is calculated correctly', () => {
        expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5)
    })

    test.skip(' empty array is zero', () => {
        expect(average([])).toBe(0)
    })

    test.skip(' undefined is undefined', () => {
        expect(average()).toBeUndefined()
    })


})