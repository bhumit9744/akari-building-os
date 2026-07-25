import { GLTFLoader } from 'three-stdlib'
import { DRACOLoader } from 'three-stdlib'

/**
 * Production AssetManager for loading GLTF/GLB models with Draco compression support and caching.
 */
class AssetManager {
  constructor() {
    this.cache = new Map()
    this.gltfLoader = new GLTFLoader()
    this.dracoLoader = new DRACOLoader()

    // Configure Draco Decoder path (using standard Google CDN)
    this.dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')
    this.gltfLoader.setDRACOLoader(this.dracoLoader)
  }

  /**
   * Loads a GLTF/GLB asset with caching and progress callbacks
   */
  async loadGLTF(url, onProgress) {
    if (this.cache.has(url)) {
      return this.cache.get(url).clone()
    }

    return new Promise((resolve, reject) => {
      this.gltfLoader.load(
        url,
        (gltf) => {
          this.cache.set(url, gltf.scene)
          resolve(gltf.scene.clone())
        },
        (xhr) => {
          if (onProgress && xhr.total > 0) {
            onProgress(xhr.loaded / xhr.total)
          }
        },
        (error) => {
          console.error(`AssetManager failed to load model at ${url}:`, error)
          reject(error)
        },
      )
    })
  }

  /**
   * Clears cached models from memory
   */
  clearCache() {
    this.cache.clear()
  }
}

export const assetManager = new AssetManager()
