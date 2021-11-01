import defaultOptions from './default'
import { descriptionTag, getNotContainChildText } from './util'
import { outHandler, overHandler } from './handlers'
import './index.css'

const showBarDomId = '$$wsashowbar'
const emphasizeClassName = 'emphasizeStyle'

class Wbf {
  public target
  public model: model
  public language: string
  public rate: number
  public pitch: number
  public showBarEl: HTMLDivElement | null = null
  public externalFn: Function | null = null
  private overHandler
  private readonly outHandler

  constructor (options?: Options) {
    if (options == null) options = defaultOptions
    this.target = null
    this.language = options?.language ?? defaultOptions.language
    this.rate = options?.rate ?? defaultOptions.rate
    this.pitch = options?.pitch ?? defaultOptions.pitch
    this.externalFn = options?.externalFn ?? null
    this.overHandler = (e: { target: HTMLElement }) => overHandler(e, this)
    this.outHandler = (e: { target: HTMLElement }) => outHandler(e, this)
  }

  open (overHandler?, outHandler?): void {
    if (this.showBarEl == null) {
      const showBar = this.createShowBarDom()
      this.showBarEl = showBar
    }

    document.addEventListener('mouseover', overHandler ?? this.overHandler)
    document.addEventListener('mouseout', outHandler ?? this.outHandler)
  }

  close (overHandler?, outHandler?, showBar = true): void {
    const emphasizeEls = document.querySelectorAll(`.${emphasizeClassName}`)
    emphasizeEls.forEach((el) => {
      this.removeEmphasize(el)
    })
    speechSynthesis.cancel()
    document.removeEventListener('mouseover', overHandler ?? this.overHandler)
    document.removeEventListener('mouseout', outHandler ?? this.outHandler)
    showBar && this.removeShowBarDom()
  }

  getElText (el: HTMLElement): string {
    const tag = descriptionTag(el.tagName)
    const notContainChildText = getNotContainChildText(el)
    const text = tag !== null ? `${tag}: ${notContainChildText}` : notContainChildText
    return text
  }

  continuousRead (): void {
    const allText = this.getElText(document.body)
    document.removeEventListener('mouseover', this.overHandler)
    this.overHandler = (e: { target: HTMLElement }): any => overHandler(e, this, false)

    this.open(this.overHandler)
    this.playAudio(allText)
  }

  playAudio (String: string): void {
    if (this.externalFn != null) {
      this.externalFn(String)
    } else {
      const msg = new SpeechSynthesisUtterance()
      msg.text = String
      msg.lang = this.language
      msg.pitch = this.pitch
      msg.rate = this.rate
      speechSynthesis.cancel()
      speechSynthesis.speak(msg)
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
    showBar.style.maxHeight = '140px'
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

interface Options {
  language?: string
  rate?: number
  pitch?: number
  externalFn?: Function
}

type model = 'continuousRead' | 'fingerRead'
export default Wbf
