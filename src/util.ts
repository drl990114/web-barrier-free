// const
const cnGather = {
  a: '链接',
  img: '图片',
  nav: '链接'
}
const enGather = {
  a: 'Link',
  img: 'Image',
  nav: 'Link'
}
const lowerCaseImgTagName = 'img'
const modes = ['finger', 'continuous']

// fn
const getGather = (language?: string): Object => {
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

export const descriptionTag = (tagName: string, language?: string): string | null => {
  const tag = tagName.toLowerCase()
  const gather = getGather(language)
  return gather[tag] !== undefined ? gather[tag] : null
}

export const getNotContainChildText = (el: HTMLElement): string => {
  if (el.tagName.toLowerCase() === lowerCaseImgTagName) {
    return (el as HTMLImageElement).alt
  }
  const notContainChildText: string = Array.prototype.filter.call(el.childNodes, (node: { nodeType: number }) => node.nodeType === 3).map(node => node.nodeValue.trim()).join('')
  return notContainChildText
}

export const testReadMode = (mode: string): boolean => {
  return Array.prototype.includes.call(modes, mode)
}
