import { tw } from 'tailwind-variant-group'
import { actions, useStore } from '@/store'

window.$tw = tw
window.$actions = actions
window.$useStore = useStore

declare global {
  var $tw: typeof tw
  var $actions: typeof actions
  var $useStore: typeof useStore
}

import './index'
