const showBarDomId = '$$wsashowbar'

class Wbfwsa {
  public target
  public language: string
  public rate: number
  public pitch: number
  public showBarEl: HTMLDivElement | null = null
  private readonly utterThis: SpeechSynthesisUtterance | null = null
  private readonly handler

  constructor (options) {
    this.target = null
    this.language = 'zh-CN'
    this.rate = 1
    this.pitch = 1
    this.handler = (e) => {
      if (e.target !== this.target && e.target !== document.body) {
        this.target = e.target
        this.playAudio(e.target.innerText)
        if (this.showBarEl != null) this.showBarEl.innerText = e.target.innerText
      }
    }
  }

  open (): void {
    const showBar = this.createShowBarDom()
    this.showBarEl = showBar
    document.addEventListener('mousemove', this.handler)
  }

  close (): void {
    document.removeEventListener('mousemove', this.handler)
    this.removeShowBarDom()
  }

  playAudio (String): void {
    const msg = new SpeechSynthesisUtterance()
    msg.text = String
    msg.lang = this.language
    speechSynthesis.cancel()
    speechSynthesis.speak(msg)
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
    showBar.style.height = '80px'
    showBar.style.fontSize = '32px'
    showBar.style.fontWeight = 'bold'
    showBar.style.textAlign = 'center'
    showBar.style.lineHeight = '80px'
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
export default Wbfwsa
