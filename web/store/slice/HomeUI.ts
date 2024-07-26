import { createSlice } from 'react-rtk'
import { TableSingleItem } from '../../config/types'

const initialState = {
  status: {
    wrapperPaddingWidth: 0,
    refreshButtonAnimation: false,
    items: [] as TableSingleItem[],
  },

  config: {
    showType: 'list' as 'grid' | 'list',
  },
}

const sessionState: typeof initialState = {
  ...initialState,
  config: {
    ...initialState.config,
    ...JSON.parse(localStorage.getItem('homeui-config') || '{}'),
  },
}

export default createSlice('homeui', {
  initialState: { ...sessionState },
  reducers: {
    setState(state, status: Partial<(typeof initialState)['status']>) {
      for (const key in status) {
        state.status[key] = status[key]
      }
    },

    setConfig(state, config: Partial<(typeof initialState)['config']>) {
      for (const key in config) {
        state.config[key] = config[key]
      }

      localStorage.setItem('homeui-config', JSON.stringify(state.config))
    },
  },
})
