import { Texture } from 'pixi.js'

export default new class {
  private _fireTextures: Texture[] = []
  public get fireTextures () { return this._fireTextures }

  loadFireTextures () {
    for (let i = 0; i < 15; i++) {
      const name = `fire-${(`${i}`).padStart(2, '0')}`
      const texture = Texture.from(name)
      this._fireTextures.push(texture)
    }
    return this.fireTextures
  }
}()
