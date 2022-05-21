import { emphasizeClassName, showBarDomId } from './../src/util'
import Wbf from '../src/index'

describe('test Wbf class', () => {
  it('should be singleton', () => {
    expect.assertions(1)
    Wbf.clearInstance()
    const instance1 = Wbf.getInstance()
    const instance2 = Wbf.getInstance()
    expect(instance1 === instance2).toBe(true)
  })

  it('When it executes open or close, it should render or remove the corresponding element by default, and change its state', () => {
    expect.assertions(11)
    Wbf.clearInstance()
    const wbf = Wbf.getInstance()
    wbf.open()
    expect(wbf.opening).toBe(true)
    expect(wbf.readMode).toBe('finger')
    expect(document.querySelectorAll('.consoleEl-main').length).toBe(1)
    expect(document.getElementById(showBarDomId)).not.toBe(null)
    expect(wbf.volume).toBe(1)
    expect(wbf.pitch).toBe(1)
    expect(wbf.rate).toBe(1)
    expect(wbf.language).toBe('zh-CN')
    wbf.close()
    expect(wbf.opening).toBe(false)
    expect(document.querySelectorAll('.consoleEl-main').length).toBe(0)
    expect(document.getElementById(showBarDomId)).toBe(null)
  })

  it('When passing different options, there should be different properties', () => {
    expect.assertions(4)
    Wbf.clearInstance()
    const wbf = Wbf.getInstance({
      language: 'en',
      rate: 0.5,
      pitch: 0.5,
      volume: 0.5,
      readMode: 'finger'
    })
    expect(wbf.volume).toBe(0.5)
    expect(wbf.pitch).toBe(0.5)
    expect(wbf.rate).toBe(0.5)
    expect(wbf.language).toBe('en')
  })

  it('It should be possible to change the wbf attribute via the changeoption method and the limit value cannot be exceeded', () => {
    expect.assertions(11)
    Wbf.clearInstance()
    const wbf = Wbf.getInstance()
    expect(wbf.volume).toBe(1)
    expect(wbf.pitch).toBe(1)
    expect(wbf.rate).toBe(1)
    expect(wbf.language).toBe('zh-CN')
    wbf.setOption('volume', 0.5)
    wbf.setOption('pitch', 0.5)
    wbf.setOption('rate', 0.5)
    wbf.setOption('language', 'en')
    expect(wbf.volume).toBe(0.5)
    expect(wbf.pitch).toBe(0.5)
    expect(wbf.rate).toBe(0.5)
    expect(wbf.language).toBe('en')
    wbf.setOption('volume', 20)
    wbf.setOption('pitch', 20)
    wbf.setOption('rate', 20)
    expect(wbf.volume).toBe(1)
    expect(wbf.pitch).toBe(2)
    expect(wbf.rate).toBe(10)
  })

  it('When calling changeMode, there should be a corresponding property change', () => {
    expect.assertions(2)
    Wbf.clearInstance()
    const wbf = Wbf.getInstance()
    expect(wbf.readMode).toBe('finger')
    wbf.changeMode('continuous')
    expect(wbf.readMode).toBe('continuous')
  })

  it('When calling emphasize method, the corresponding element should have a class name', () => {
    expect.assertions(2)
    Wbf.clearInstance()
    const wbf = Wbf.getInstance()
    const div = document.createElement('div')
    wbf.emphasize(div)
    expect(div.classList.contains(emphasizeClassName)).toBe(true)
    wbf.removeEmphasize(div)
    expect(div.classList.contains(emphasizeClassName)).toBe(false)
  })
})
