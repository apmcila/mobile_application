import { removeToken, setToken } from 'src/utils/auth'
import { firebaseAuth, firestore } from 'src/boot/firebase'
import { Notify } from 'quasar'

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
    Notify.create({
      type: "positive",
      message: "Sign in successful !"
    })
    return user
  } catch (err) {
    const error = {
      errorCode: err.code,
      errorMessage: err.message
    }
    console.log(error)
    Notify.create({
      type: "negative",
      message: err.message
    })
    // commit('setError', error)
  }
}

export async function signOut({ commit }) {
  try {
    await firebaseAuth.signOut()
    commit('removeUser')
    commit('setLoggedIn', false)
    removeToken()
    Notify.create({
      type: "positive",
      message: "You have logged out successfully !"
    })
    return true
  } catch (err) {
    console.log('An error occured : ', err)
    Notify.create({
      type: "negative",
      message: "Logout failed"
    })
  }
}

export async function fetchUser({ commit }, user) {
  try {
    const response = await firestore
      .collection('users')
      .doc(user.uid)
      .get()
    commit('setUser', response.data())

  } catch (err) {
    Notify.create({
      type: "negative",
      message: "An error occured while fetching user details"
    })
    console.log("An error occured ", err)
  }
}

export async function setLoggedIn({ commit }, payload) {
  commit('setLoggedIn', payload)
}
