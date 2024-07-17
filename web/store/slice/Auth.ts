import { createSlice } from 'react-rtk'

const initialState = {
  jwt: null,
}

const sessionState = {
  ...initialState,
  jwt: localStorage.getItem('jwt-token'),
}

export default createSlice('auth', {
  initialState: { ...sessionState },
  reducers: {
    login(state, jwt: string) {
      state.jwt = jwt
    },

    logout(state) {
      Object.assign(state, initialState)
    },
  },
})
