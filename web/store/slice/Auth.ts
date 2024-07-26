import { createSlice } from 'react-rtk'

const initialState = {
  jwt: undefined as string | undefined,
  authEnabled: false,
}

export default createSlice('auth', {
  initialState: { ...initialState },
  reducers: {
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
