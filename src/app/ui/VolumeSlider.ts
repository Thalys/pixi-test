import { Slider } from '@pixi/ui'
import { Graphics } from 'pixi.js'
import { Label } from '@/app/ui/Label'
import { SKY, ZINC } from '@/app/utils/colors'

/**
 * A volume slider component to be used in the Settings popup.
 */
export class VolumeSlider extends Slider {
  public messageLabel: Label

  constructor (label: string, min = -0.1, max = 100, value = 100) {
    const width = 280
    const height = 20
    const radius = 20
    const border = 4
    const handleRadius = 14
    const handleBorder = 4

    const meshColor = SKY[900]
    const fillColor = SKY[300]
    const borderColor = SKY[900]
    const backgroundColor = '#FFFFFF'

    const bg = new Graphics()
      .roundRect(0, 0, width, height, radius)
      .fill({ color: borderColor })
      .roundRect(
        border,
        border,
        width - border * 2,
        height - border * 2,
        radius,
      )
      .fill({ color: backgroundColor })

    const fill = new Graphics()
      .roundRect(0, 0, width, height, radius)
      .fill({ color: borderColor })
      .roundRect(
        border,
        border,
        width - border * 2,
        height - border * 2,
        radius,
      )
      .fill({ color: fillColor })

    const slider = new Graphics()
      .circle(0, 0, handleRadius + handleBorder)
      .fill({ color: meshColor })

    super({
      bg,
      fill,
      slider,
      min,
      max,
    })

    this.value = value

    this.messageLabel = new Label({
      text: label,
      style: {
        align: 'left',
        fill: ZINC[600],
        fontSize: 20,
      },
    })
    this.messageLabel.anchor.x = 0
    this.messageLabel.x = 10
    this.messageLabel.y = -18
    this.addChild(this.messageLabel)
  }
}
