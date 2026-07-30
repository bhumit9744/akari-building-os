export class ExportSystem {
  static captureScreenshot(canvas, resolution = '4k') {
    if (!canvas) {
      console.error('No WebGL canvas provided for screenshot capture.')
      return null
    }

    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
    if (!gl) return null

    // For a real 4K capture, we would resize the renderer temporarily, render, then restore.
    // Here we just grab the current canvas buffer.
    const dataUrl = canvas.toDataURL('image/png')
    
    return dataUrl
  }

  static downloadScreenshot(dataUrl, filename = 'akari-twin-snapshot.png') {
    if (!dataUrl) return
    const link = document.createElement('a')
    link.download = filename
    link.href = dataUrl
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  static generateIframeEmbedCode(url = window.location.href) {
    return `<iframe src="${url}" width="100%" height="600" frameborder="0" allowfullscreen allow="xr-spatial-tracking"></iframe>`
  }
}
