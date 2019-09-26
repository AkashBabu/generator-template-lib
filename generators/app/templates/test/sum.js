import {expect } from 'chai'

import sum from '../src'

describe('#sum', () => {
  it('should return the sum of a & b', () => {
    expect(sum(10, 20)).to.be.eql(30)
  })
})