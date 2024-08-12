import { createSlice } from 'react-rtk'

export type InfoTargetWeb<T> = T & {
  selected?: boolean
}

const initialState = {
  status: {
    searchText: '',
    refreshButtonAnimation: false,
    renameItem: null as string | null,
    currentDir: null as InfoDirWeb | null,
    currentFile: null as InfoDetailedFile | null,
    rowContextMenu: null as {
      mouseX: number
      mouseY: number
      item: InfoChildDirWeb | InfoChildFileWeb
    } | null,
  },

  config: {
    showType: 'list' as 'grid' | 'list',
    sortByMode: 'asc' as 'asc' | 'dsc',
    sortBy: 'name' as 'name' | 'size' | 'modifiedAt',
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
  actions: {
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

    toggleItem(state, name: string) {
      if (!state.status.currentDir) return

      for (const key in state.status.currentDir.childDirs) {
        if (key === name) {
          state.status.currentDir.childDirs[name].selected =
            !state.status.currentDir.childDirs[name].selected
        }
      }

      for (const key in state.status.currentDir.childFiles) {
        if (key === name) {
          state.status.currentDir.childFiles[name].selected =
            !state.status.currentDir.childFiles[name].selected
        }
      }
    },

    selectAllItems(state) {
      if (!state.status.currentDir) return

      for (const key in state.status.currentDir.childDirs) {
        state.status.currentDir.childDirs[key].selected = true
      }

      for (const key in state.status.currentDir.childFiles) {
        state.status.currentDir.childFiles[key].selected = true
      }
    },

    unselectAllItems(state) {
      if (!state.status.currentDir) return

      for (const key in state.status.currentDir.childDirs) {
        state.status.currentDir.childDirs[key].selected = false
      }

      for (const key in state.status.currentDir.childFiles) {
        state.status.currentDir.childFiles[key].selected = false
      }
    },

    deleteItems(state, names: string[]) {
      if (!state.status.currentDir) return

      for (const name of names) {
        delete state.status.currentDir.childDirs[name]
        delete state.status.currentDir.childFiles[name]
      }
    },
  },
})
