import { v4 as uuid4 } from 'uuid'

export const randomUUID = () => uuid4().toString()
export const resolveFilename = (fileType, name) => name + '.' + fileType

export function generateRandomCharacters(length) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

