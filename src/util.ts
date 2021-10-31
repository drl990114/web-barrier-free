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
