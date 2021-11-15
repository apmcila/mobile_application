import { removeToken, setToken } from 'src/utils/auth'
import { firebaseAuth, firestore } from 'src/boot/firebase'

export async function signIn({ dispatch, commit }, { email, password }) {
  try {
    const { user } = await firebaseAuth.signInWithEmailAndPassword(
      email,
      password
    )
    const token = await user.getIdToken()
    removeToken()
    setToken(token)
    commit('setLoggedIn', true)
    await dispatch('fetchUser', user)
    return user
  } catch (err) {
    const error = {
      errorCode: err.code,
      errorMessage: err.message
    }
    console.log(error)
    // commit('setError', error)
  }
}

export async function signOut({ commit }) {
  try {
    await firebaseAuth.signOut()
    commit('removeUser')
    commit('setLoggedIn', false)
    removeToken()
    return true
  } catch (err) {
    console.log('An error occured : ', err)
  }
}

export async function fetchUser({ commit }, user) {
  const response = await firestore
    .collection('users')
    .doc(user.uid)
    .get()
  commit('setUser', response.data())
}

export async function setLoggedIn({ commit }, payload) {
  commit('setLoggedIn', payload)
}
