const { palindrome } = require('../utils/for_testing')

test.skip('palindrome of dario', () => {
    const result = palindrome('dario')

    expect(result).toBe('oirad')
})

test.skip('palindrome of empty string', () => {
    const result = palindrome('')

    expect(result).toBe('')
})

test.skip('palindrome of undefined', () => {
    const result = palindrome()

    expect(result).toBeUndefined()
})