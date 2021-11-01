export const descriptionTag = (tagName: string): string | null => {
  const tag = tagName.toLowerCase()
  switch (tag) {
    case 'a':
    case 'nav':
      return '链接'
    case 'image':
      return '图片'
    default:
      return null
  }
}

export const getNotContainChildText = (el: HTMLElement): string => {
  const notContainChildText: string = Array.prototype.filter.call(el.childNodes, (node: { nodeType: number }) => node.nodeType === 3).map(node => node.nodeValue.trim()).join('')
  return notContainChildText
}
