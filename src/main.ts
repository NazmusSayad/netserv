import getClassName from 'get-classnames'
import { actions, useStore } from '@/store'

window.$cn = getClassName
window.$store = actions
window.$useStore = useStore

declare global {
  var $cn: typeof getClassName
  var $store: typeof actions
  var $useStore: typeof useStore
}

import './index'
