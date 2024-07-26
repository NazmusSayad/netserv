import { createStore } from 'react-rtk'
import Auth from './slice/Auth'
import HomeUI from './slice/HomeUI'

export const [store, useStore, actions] = createStore(Auth, HomeUI)
