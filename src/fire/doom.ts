import type { Container, Ticker } from 'pixi.js'
import type { TGridTraversalInfo } from '@/fire/grid.types'
import { Texture } from 'pixi.js'
import { engine } from '@/engine/engine.singleton'
import { DSprite } from '@/engine/scene/sprite.DOOM'
import { MAX_HEAT_LEVEL, MAX_INTENSITY_INDEX, paletteDOOM } from '@/fire/doom.data'
import { traverseGrid } from '@/fire/grid'
import { allowContinueAt, arrFrom } from '@/lib/fn'
import { clamp } from '@/lib/math'
import { rollFloat } from '@/lib/rand'
import { logger, red } from '@/tools/logger'

const log = logger.custom('fxDOOMFire', red)

const { floor } = Math

export function fxDOOMFire (parent: Container, opts?: { width: number, height: number }, ticker?: Ticker) {
  ticker ??= engine().ticker

  const cellW = 4
  const cellH = 4
  const width = Math.ceil((opts?.width ?? 640) / cellW)
  const height = Math.ceil((opts?.height ?? 480) / cellH)
  const traverse = traverseGrid({ width, height })
  const offsetX = 0
  const offsetY = 0

  const rows = height

  const getLuminosity = (i: number, heatLevel: number) => {
    return floor(heatLevel / MAX_HEAT_LEVEL * MAX_INTENSITY_INDEX)
  }

  const getHeatLevel = (i: number) => {
    const decay = rollFloat(0, 3) * ticker.deltaMS

    const bellowCell = cells[i - width]
    const proxyHeatLevel = bellowCell?.heatLevel

    const heatLevel = proxyHeatLevel - decay
    return heatLevel
  }

  const propagateHeat = ({ cell, col, row }: TGridTraversalInfo, i: number) => {

    /**
     * NOTE - DOOM - 3: Propagate Heat Upward
     * Recalculate heat from BOTTOM --> TOP, RIGHT --> LEFT (skip bottom row)
     * - Take heat values from BELLOW
     * - Subtract small random decay value
     * - Optionally adding rnd for flickering
     */

    if (row === 0) { // bottom row
      const color = paletteDOOM[MAX_INTENSITY_INDEX]
      cell.tint = color
      cell.heatLevel = MAX_HEAT_LEVEL
    } else {

      const heat = getHeatLevel(i)
      const heatLevel = clamp(heat, 0, MAX_HEAT_LEVEL)

      const luminosity = getLuminosity(i, heatLevel)
      const luminosityIndex = clamp(luminosity, 0, MAX_INTENSITY_INDEX)

      cell.heatLevel = heatLevel
      cell.tint = paletteDOOM[luminosityIndex]

    // Apply horizontal wind effect by offsetting the pixel position
    // const windOffset: number = Math.max(0, currentPixelIndex - decay)
    // pixelBuffer[windOffset] = newFireIntensity
    }
  }

  // Fire intensity values for each pixel (0-36 representing color palette indices)
  const cells: DSprite[] = arrFrom(width * height, () => parent.addChild(new DSprite(Texture.WHITE)))
  const setupCells = ({ cell, col, row }: TGridTraversalInfo, i: number) => {
    cell.x = offsetX + col * cellW
    cell.y = offsetY + (rows - 1 - row) * cellH
    cell.width = cellW
    cell.height = cellH
    if (row === 0) { // bottom row
      cell.tint = paletteDOOM[MAX_INTENSITY_INDEX]
      cell.heatLevel = MAX_HEAT_LEVEL
    } else {
      cell.tint = paletteDOOM[0]
    }
  }

  /**
   * NOTE - DOOM - 1. Init the Fire Source
   * Creates the fire source at the bottom of the canvas by setting the maximum
   * fire intensity MAX_INTENSITY_INDEX(36) for all pixels in the bottom row.
   */
  traverse(cells, setupCells)
  log('setup done')


  const hasReached = allowContinueAt(55)
  // kickstart the proper animations cycle
  ticker.maxFPS = 60
  ticker.add((ticker: Ticker) => {

    if (!hasReached(ticker.deltaMS)) return

    const startOffset = width
    traverse(cells, propagateHeat, startOffset)
  })

  // Step 4: Add Wind Effect (Optional)
  // To make the fire look more natural, add a slight horizontal offset when propagating heat. Instead of taking heat from directly below, sometimes take it from slightly to the left or right of the pixel below.
  // Step 5: Apply Heat Decay
  // Ensure heat values don't go below 0. The random decay in step 3 causes the fire to naturally diminish as it moves upward, creating the tapering flame effect.
  // Step 6: Render to Screen
  // Map each heat value to its corresponding color in your palette and draw the pixel to the screen.
  // Step 7: Repeat
  // Run this process continuously (typically 30-60 times per second) to create the animated fire effect.
}
