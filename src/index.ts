import defaultOptions from './default'
import {
  consoleClassName,
  consoleDomId,
  emphasizeClassName,
  getGather,
  IGather,
  optionsArr,
  showBarDomId,
  testReadMode
} from './util'
import { outHandler, overHandler } from './handlers'
import './index.css'

class Wbf {
  public opening: boolean = false
  public readMode: readMode = 'finger'
  public language: language
  public rate: number
  public pitch: number
  public volume: number
  public showBarEl: HTMLDivElement | null = null
  public needConsole: boolean = true
  public externalFn: Function | null = null
  private readonly overHandler
  private readonly outHandler

  constructor (options?: Options) {
    if (options == null) options = defaultOptions
    options?.readMode !== undefined && (this.readMode = options.readMode)
    options?.needConsole !== undefined &&
      (this.needConsole = options.needConsole)
    this.language = options?.language ?? defaultOptions.language
    this.rate = options?.rate ?? defaultOptions.rate
    this.pitch = options?.pitch ?? defaultOptions.pitch
    this.volume = options?.volume ?? defaultOptions.volume
    this.externalFn = options?.externalFn ?? null
    this.overHandler = (e: { target: HTMLElement }) => overHandler(e, this)
    this.outHandler = (e: { target: HTMLElement }) => outHandler(e, this)
  }

  open (): void {
    if (this.opening) return
    this.changeMode(this.readMode)
    this.opening = true
    this.needConsole && this.createConsole()
  }

  close (): void {
    const emphasizeEls = document.querySelectorAll(`.${emphasizeClassName}`)
    emphasizeEls.forEach((el) => {
      this.removeEmphasize(el)
    })
    speechSynthesis.cancel()
    document.removeEventListener('mouseover', this.overHandler)
    document.removeEventListener('mouseout', this.outHandler)
    this.removeShowBarDom()
    this.removeConsole()
    this.opening = false
  }

  changeOptions (keyName: string, value): void {
    if (optionsArr.includes[keyName] === false && this[keyName] !== undefined) {
      throw new Error(`${keyName} options do not exist on wbf`)
    }
    if (typeof value === 'number') {
      value >= 2 && (value = 2)
    }
    this[keyName] = value
  }

  changeMode (readMode: readMode): void {
    if (!testReadMode(readMode)) {
      throw new Error(`readMode not includes this ${readMode}`)
    }
    this.readMode = readMode
    if (readMode !== 'finger') {
      const allText = document.body.innerText
      this.playAudio(allText)
    }
    this.addHandler()
  }

  addHandler (): void {
    if (this.showBarEl == null) {
      const showBar = this.createShowBarDom()
      this.showBarEl = showBar
    }

    document.addEventListener('mouseover', this.overHandler)
    document.addEventListener('mouseout', this.outHandler)
  }

  createUtterance (str): SpeechSynthesisUtterance {
    const msg = new SpeechSynthesisUtterance()
    msg.text = str
    msg.lang = this.language
    msg.pitch = this.pitch
    msg.rate = this.rate
    msg.volume = this.volume
    return msg
  }

  playAudio (str: string): SpeechSynthesisUtterance | undefined {
    if (this.externalFn != null) {
      this.externalFn(str)
    } else {
      speechSynthesis.cancel()
      const msg = this.createUtterance(str)
      speechSynthesis.speak(msg)
      return msg
    }
  }

  emphasize (el: HTMLElement | Element): void {
    el.classList.add(emphasizeClassName)
  }

  removeEmphasize (el: HTMLElement | Element): void {
    el.classList.remove(emphasizeClassName)
  }

  createShowBarDom (): HTMLDivElement {
    const prev = document.getElementById(showBarDomId) as HTMLDivElement | null
    if (prev != null) return prev
    const showBar = document.createElement('div')
    showBar.id = showBarDomId
    showBar.style.position = 'fixed'
    showBar.style.bottom = '0px'
    showBar.style.left = '0px'
    showBar.style.width = '100%'
    showBar.style.minHeight = '50px'
    showBar.style.maxHeight = '300px'
    showBar.style.fontWeight = 'bold'
    showBar.style.textAlign = 'center'
    showBar.style.wordBreak = 'break-word;'
    showBar.style.overflow = 'hidden'
    showBar.style.background = 'white'
    showBar.style.border = '2px solid #eee'

    document.body.appendChild(showBar)
    return showBar
  }

  createConsole (): void {
    const prev = document.getElementById(consoleDomId)
    if (prev != null) return
    const consoleEl = document.createElement('div')
    consoleEl.id = consoleDomId
    const gather: IGather = getGather(this.language)
    consoleEl.classList.add(consoleClassName)
    consoleEl.innerHTML = `
    <div class="${consoleClassName}-main">
      <div>
        <button id="_wbfClose">${gather.close}</button>
        <button id="_wbfContinuousRead">${gather.continuousRead}</button>
        <button id="_wbfFingerRead">${gather.fingerRead}</button> 
      </div>
        |
        <div>
        ${gather.volume}
          <button id="_wbfAddVolume">+</button>
          <button id="_wbfReduceVolume">-</button>
        </div>
        |
        <div>
        ${gather.rate}
          <button id="_wbfAddRate">+</button>
          <button id="_wbfReduceRate">-</button>
        </div>
    </div>`

    document.body.insertBefore(consoleEl, document.body.firstChild)
    const closeBtn = document.getElementById('_wbfClose')
    const continuousReadBtn = document.getElementById('_wbfContinuousRead')
    const fingerReadBtn = document.getElementById('_wbfFingerRead')
    const addVolumeBtn = document.getElementById('_wbfAddVolume')
    const reduceVolumeBtn = document.getElementById('_wbfReduceVolume')
    const addRateBtn = document.getElementById('_wbfAddRate')
    const reduceRateBtn = document.getElementById('_wbfReduceRate')

    closeBtn != null && (closeBtn.onclick = () => this.close())
    continuousReadBtn != null &&
      (continuousReadBtn.onclick = () => this.changeMode('continuous'))
    fingerReadBtn != null &&
      (fingerReadBtn.onclick = () => this.changeMode('finger'))
    addVolumeBtn != null &&
      (addVolumeBtn.onclick = () => this.changeOptions('volume', ++this.volume))
    reduceVolumeBtn != null &&
      (reduceVolumeBtn.onclick = () =>
        this.changeOptions('volume', --this.volume))
    addRateBtn != null &&
      (addRateBtn.onclick = () => this.changeOptions('rate', ++this.rate))
    reduceRateBtn != null &&
      (reduceRateBtn.onclick = () => this.changeOptions('rate', --this.rate))
  }

  removeConsole (): void {
    const consoleEl = document.getElementById(consoleDomId)
    if (consoleEl != null) {
      consoleEl.remove()
    }
  }

  removeShowBarDom (): void {
    if (this.showBarEl != null) {
      this.showBarEl.remove()
      this.showBarEl = null
    }
  }
}

type readMode = 'finger' | 'continuous'
export type language = 'en' | 'zh-CN'
interface Options {
  readMode?: readMode
  language?: language
  rate?: number
  pitch?: number
  externalFn?: Function
  volume?: number
  needConsole?: boolean
}

export default Wbf
