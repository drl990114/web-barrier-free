import './index.css'

const showBarDomId = '$$wsashowbar'
const emphasizeClassName = 'emphasizeStyle'

class Wbf {
  public target
  public language: string
  public rate: number
  public pitch: number
  public showBarEl: HTMLDivElement | null = null
  private readonly overHandler
  private readonly outHandler

  constructor (options?: Options) {
    this.target = null
    this.language = options?.language ?? 'zh-CN'
    this.rate = options?.rate ?? 1
    this.pitch = options?.pitch ?? 1
    this.overHandler = (e: { target: HTMLElement }) => {
      if (
        e.target !== document.body &&
        e.target.tagName.toLowerCase() !== 'html'
      ) {
        this.target = e.target
        this.emphasize(e.target)
        const descriptionTag = this.descriptionTag(e.target.tagName.toLowerCase())
        const text = descriptionTag !== null ? `${descriptionTag}: ${e.target.innerText}` : e.target.innerText
        this.playAudio(text)
        if (this.showBarEl != null) {
          if (text.length > 150) {
            this.showBarEl.style.fontSize = '24px'
          } else if (text.length > 100) {
            this.showBarEl.style.fontSize = '26px'
          } else if (text.length > 50) {
            this.showBarEl.style.fontSize = '28px'
          } else if (text.length > 20) {
            this.showBarEl.style.fontSize = '30px'
          } else {
            this.showBarEl.style.fontSize = '32px'
          }
          this.showBarEl.innerText = text
        }
      }
    }
    this.outHandler = (e: { target: HTMLElement }) => {
      this.removeEmphasize(e.target)
    }
  }

  open (): void {
    const showBar = this.createShowBarDom()
    this.showBarEl = showBar
    document.addEventListener('mouseover', this.overHandler)
    document.addEventListener('mouseout', this.outHandler)
  }

  close (): void {
    const emphasizeEls = document.querySelectorAll(`.${emphasizeClassName}`)
    emphasizeEls.forEach((el) => {
      this.removeEmphasize(el)
    })
    document.removeEventListener('mouseover', this.overHandler)
    document.removeEventListener('mouseout', this.outHandler)
    this.removeShowBarDom()
  }

  playAudio (String: string): void {
    const msg = new SpeechSynthesisUtterance()
    msg.text = String
    msg.lang = this.language
    speechSynthesis.cancel()
    speechSynthesis.speak(msg)
  }

  emphasize (el: HTMLElement | Element): void {
    el.classList.add(emphasizeClassName)
  }

  removeEmphasize (el: HTMLElement | Element): void {
    el.classList.remove(emphasizeClassName)
  }

  descriptionTag (tagName: string): string | null {
    switch (tagName) {
      case 'a':
      case 'nav':
        return '链接'
      case 'image':
        return '图片'
      default:
        return null
    }
  }

  createShowBarDom (): HTMLDivElement {
    const prev = document.getElementById(showBarDomId) as HTMLDivElement
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
    }
  }
}

interface Options {
  language?: string
  rate?: number
  pitch?: number
}

export default Wbf
