import { createSlice } from 'react-rtk'

const initialState = {
  jwt: undefined as string | undefined,
  authEnabled: false,
  readOnly: false,
}

export default createSlice('auth', {
  initialState: { ...initialState },
  actions: {
    setReadOnly(state, readOnly: boolean) {
      state.readOnly = readOnly
    },

    login(state, jwt: string) {
      state.jwt = jwt
      state.authEnabled = true
    },

    enableAuth(state) {
      state.authEnabled = true
    },

    disableAuth(state) {
      state.authEnabled = false
      this.logout(state)
    },

    logout(state) {
      Object.assign(state, initialState)
    },
  },
})
