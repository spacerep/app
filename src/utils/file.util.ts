import { first } from 'lodash'
import { MediaType } from '../database'

export default {
  async toDataURL (file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        const result = reader.result as null | string
        if (result) resolve(result)
      })
      reader.readAsDataURL(file)
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
