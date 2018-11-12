const openTag = tag => `<${tag}>`
const closeTag = tag => `</${tag}>`
const encloseTag = (text, tag) => `${openTag(tag)}${text}${closeTag(tag)}`
const consumeToken = (text, stopDelimiter) => {
  let index = 0
  let content = ''
  while (index < text.length && text[index] !== stopDelimiter) {
    content += text[index]
    index++
  }
  return content
}

const defaultTokens = {
  bold: {delimiter: '*', tag: 'strong'},
  italic: {delimiter: '/', tag: 'em'},
  underline: {delimiter: '_', tag: 'u'},
  strike: {delimiter: '~', tag: 'del'},
  code: {delimiter: '`', tag: 'code'},
  sup: {delimiter: '^', tag: 'sup'},
  sub: {delimiter: '¡', tag: 'sub'}
}

module.exports = (text, tokens = defaultTokens) => {
  const appendDefault = () => {
    html += text[index]
    index++
  }
  const parseToken = token => {
    index++
    if (text[index] === ' ') {
      html += token.delimiter
      appendDefault()
    } else {
      let tokenContent = consumeToken(text.substr(index), token.delimiter)
      html += encloseTag(tokenContent, token.tag)
      index += tokenContent.length + 1
    }
  }

  let html = ''
  let index = 0

  while (index < text.length) {
    switch (text[index]) {
      case tokens.bold.delimiter:
        parseToken(tokens.bold)
        break
      case tokens.italic.delimiter:
        parseToken(tokens.italic)
        break
      case tokens.underline.delimiter:
        parseToken(tokens.underline)
        break
      case tokens.strike.delimiter:
        parseToken(tokens.strike)
        break
      case tokens.code.delimiter:
        parseToken(tokens.code)
        break
      case tokens.sup.delimiter:
        parseToken(tokens.sup)
        break
      case tokens.sub.delimiter:
        parseToken(tokens.sub)
        break
      default:
        appendDefault()
    }
  }

  return html
}
