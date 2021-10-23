class Wbfwsa {
  public target
  public language
  private readonly handler

  constructor (options) {
    this.target = null
    this.language = 'zh-CN'
    this.handler = (e) => {
      if (e.target !== this.target && e.target !== document.body) {
        this.target = e.target
        console.log('tag', e.target.tagName)
        console.log('text', e.target.innerText)
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
    speechSynthesis.speak(msg)
  }
}
export default Wbfwsa
