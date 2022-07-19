export interface ErrorMessage {
  message: string
  stack: Array<{
    line: number
    column: number
    filename: string
  }>
}

export function parseError(err: Error): ErrorMessage {
  const errArr = (err.stack || '').split('\n')
  if (errArr.length < 2) {
    return {message: '', stack: []}
  }
  const message = errArr[0].split(':')[1]?.trim() || ''
  console.log(errArr)
  const stack: Array<{line: number, column: number, filename: string}> = errArr.slice(1).filter(line => line.includes('http')).map(line => {
    const [,filename, lineStr, columnStr] = line.match(/^.*(http?:\/\/.+):(\d+):(\d+)/) || []
    return {
      line: parseInt(lineStr),
      column: parseInt(columnStr),
      filename: filename
    }
  })

  return { message, stack }
}