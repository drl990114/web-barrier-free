// const

export const showBarDomId = '$$wsashowbar'
export const consoleDomId = '$$wsaConsole'
export const emphasizeClassName = 'emphasizeStyle'
export const consoleClassName = 'consoleEl'
export const optionsArr: string[] = ['language', 'rate', 'pitch', 'volume']

const cnGather: IGather = {
  a: '链接',
  img: '图片',
  nav: '链接',
  close: '关闭',
  continuousRead: '连读',
  fingerRead: '指读',
  volume: '音量',
  rate: '语速'
}
const enGather: IGather = {
  a: 'Link',
  img: 'Image',
  nav: 'Link',
  close: 'Close',
  continuousRead: 'ContinuousRead',
  fingerRead: 'FingerRead',
  volume: 'Volume',
  rate: 'Rate'
}
const lowerCaseImgTagName = 'img'
const modes = ['finger', 'continuous']

// fn
export const getGather = (language?: string): IGather => {
  let gather = cnGather
  if (language === 'en') {
    gather = enGather
  }
  return gather
}

export const getElText = (el: HTMLElement, language?: string): string => {
  const tag = descriptionTag(el.tagName, language)
  const notContainChildText = getNotContainChildText(el)
  const text =
    tag !== null ? `${tag}: ${notContainChildText}` : notContainChildText
  return text
}

export const descriptionTag = (
  tagName: string,
  language?: string
): string | null => {
  const tag = tagName.toLowerCase()
  const gather = getGather(language)
  return gather[tag] !== undefined ? gather[tag] : null
}

export const getNotContainChildText = (el: HTMLElement): string => {
  if (el.tagName.toLowerCase() === lowerCaseImgTagName) {
    return (el as HTMLImageElement).alt
  }
  const notContainChildText: string = Array.prototype.filter
    .call(el.childNodes, (node: { nodeType: number }) => node.nodeType === 3)
    .map((node) => node.nodeValue.trim())
    .join('')
  return notContainChildText
}

export const testReadMode = (mode: string): boolean => {
  return Array.prototype.includes.call(modes, mode)
}

export interface IGather {
  a: string
  img: string
  nav: string
  close: string
  continuousRead: string
  fingerRead: string
  volume: string
  rate: string
}
