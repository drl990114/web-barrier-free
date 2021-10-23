class Wbfwsa {
  public target
  public language: string
  public rate: number
  public pitch: number
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
      }
    }
  }

  open (): void {
    document.addEventListener('mousemove', this.handler)
  }

  close (): void {
    document.removeEventListener('mousemove', this.handler)
  }

  playAudio (String): void {
    const msg = new SpeechSynthesisUtterance()
    msg.text = String
    msg.lang = this.language
    speechSynthesis.cancel()
    speechSynthesis.speak(msg)
  }
}
export default Wbfwsa
