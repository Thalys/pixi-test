import type {
  AnimateParamOptions,
  AnimateParamSubject,
  AnimateParamTargetValues,
  AnimateResultPlaybackControls,
} from '@/anime/anime.types'
import { animate as mAnimate } from 'motion'

export async function animate (
  subject: AnimateParamSubject,
  tValues: AnimateParamTargetValues,
  options?: AnimateParamOptions,
): Promise<AnimateResultPlaybackControls> {

  return mAnimate(subject, tValues, options)
}
