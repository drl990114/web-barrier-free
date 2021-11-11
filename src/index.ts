import defaultOptions from './default'
import { testReadMode } from './util'
import { outHandler, overHandler } from './handlers'
import './index.css'

const showBarDomId = '$$wsashowbar'
const emphasizeClassName = 'emphasizeStyle'
const optionsArr: string[] = ['language', 'rate', 'pitch', 'volume']

class Wbf {
  public readMode: readMode = 'finger'
  public language: string
  public rate: number
  public pitch: number
  public volume: number
  public showBarEl: HTMLDivElement | null = null
  public externalFn: Function | null = null
  private readonly overHandler
  private readonly outHandler

  constructor (options?: Options) {
    if (options == null) options = defaultOptions
    options?.readMode !== undefined && (this.readMode = options.readMode)
    this.language = options?.language ?? defaultOptions.language
    this.rate = options?.rate ?? defaultOptions.rate
    this.pitch = options?.pitch ?? defaultOptions.pitch
    this.volume = options?.volume ?? defaultOptions.volume
    this.externalFn = options?.externalFn ?? null
    this.overHandler = (e: { target: HTMLElement }) => overHandler(e, this)
    this.outHandler = (e: { target: HTMLElement }) => outHandler(e, this)
  }

  open (): void {
    this.changeMode(this.readMode)
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
  }

  changeOptions (keyName: string, value): void {
    if (optionsArr.includes[keyName] === false && this[keyName] !== undefined) {
      throw new Error(`${keyName} options do not exist on wbf`)
    }
    this[keyName] = value
    console.log(this)
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

  playAudio (
    str: string
  ): SpeechSynthesisUtterance | undefined {
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

  removeShowBarDom (): void {
    if (this.showBarEl != null) {
      this.showBarEl.remove()
      this.showBarEl = null
    }
  }
}

type readMode = 'finger' | 'continuous'
interface Options {
  readMode?: readMode
  language?: string
  rate?: number
  pitch?: number
  externalFn?: Function
  volume?: number
}

export default Wbf
