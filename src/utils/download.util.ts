import download from 'downloadjs'

export default {
  arrayDownload (data: any[], filename: string) {
    const content = JSON.stringify(data, null, 2)
    download(content, filename, 'application/json')
  }
}
