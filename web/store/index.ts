import { createStore } from 'react-rtk'
import Auth from './slice/Auth'

export const [store, useStore, actions] = createStore(Auth)
