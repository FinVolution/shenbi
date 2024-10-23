import { saveAs } from 'file-saver'

export const downloadImage = (url) => {
  const fileName = url.substring(url.lastIndexOf('/') + 1)
  saveAs(url, fileName)
}

export const downloadImageWithBlob = (imageInfo, fileName) => {
  const {data, headers} = imageInfo
  const contentType = headers['content-type']
  const blob = new Blob([data], { type: contentType })

  saveAs(blob, fileName)
}