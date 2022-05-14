import Wbf from '../src/index'

describe('test Wbf class', () => {
  it('should be singleton', () => {
    const instance1 = Wbf.getInstance()
    const instance2 = Wbf.getInstance()
    expect(instance1 === instance2).toBe(true)
  })
})
