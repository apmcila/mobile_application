export function setUser(state, user) {
  state.user = user
}

export function removeUser(state) {
  state.user = null
}

export function setLoggedIn(state, payload) {
  state.isLoggedIn = payload
}
