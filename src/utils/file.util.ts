import { first } from 'lodash'
import { MediaType } from '../database'

export default {
  async toDataURL (file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        const dataUrl = reader.result as null | string
        if (dataUrl) resolve(dataUrl)
      })
      reader.readAsDataURL(file)
    })
  },

  async toContent (file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        const content = reader.result as null | string
        if (content) resolve(content)
      })
      reader.readAsText(file)
    })
  },

  getMimeType (file: File) {
    return file.type
  },

  getCategory (file: File) {
    const type = this.getMimeType(file)
    return first(type.split('/')) as MediaType
  }
}
