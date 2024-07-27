import getClassName from 'get-classnames'
import { tw } from 'tailwind-variant-group'
import { actions, useStore } from '@/store'

window.$tw = tw
window.$cn = getClassName
window.$store = actions
window.$useStore = useStore

declare global {
  var $tw: typeof tw
  var $cn: typeof getClassName
  var $store: typeof actions
  var $useStore: typeof useStore
  var akdf: TestingAbc
}

import './index'
