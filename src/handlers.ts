const overHandler = (e: { target: HTMLElement }, wbf, needread: boolean = true): void => {
  if (
    e.target !== document.body &&
      e.target.tagName.toLowerCase() !== 'html'
  ) {
    wbf.target = e.target
    wbf.emphasize(e.target)
    const text = wbf.getElText(e.target)
    needread && wbf.playAudio(text)
    if (wbf.showBarEl != null) {
      if (text.length > 150) {
        wbf.showBarEl.style.fontSize = '24px'
      } else if (text.length > 100) {
        wbf.showBarEl.style.fontSize = '26px'
      } else if (text.length > 50) {
        wbf.showBarEl.style.fontSize = '28px'
      } else if (text.length > 20) {
        wbf.showBarEl.style.fontSize = '30px'
      } else {
        wbf.showBarEl.style.fontSize = '32px'
      }
      wbf.showBarEl.innerText = text
    }
  }
}

const outHandler = (e: { target: HTMLElement }, wbf): void => {
  wbf.removeEmphasize(e.target)
}
export { overHandler, outHandler }
