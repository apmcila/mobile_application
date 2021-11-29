import { removeToken, setToken } from 'src/utils/auth'
import { firebaseAuth, firestore } from 'src/boot/firebase'
import axios from 'axios'
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
      type: 'positive',
      message: 'Sign in successful !'
    })
    return user
  } catch (err) {
    const error = {
      errorCode: err.code,
      errorMessage: err.message
    }
    console.log(error)
    Notify.create({
      type: 'negative',
      message: err.message
    })
    // commit('setError', error)
  }
}

export async function signUp(
  { commit },
  { email, password, firstName, lastName, phoneNumber }
) {
  try {
    const { user } = await firebaseAuth.createUserWithEmailAndPassword(
      email,
      password
    )
    await firestore.collection('users').doc(user.uid).set({
      firstName,
      lastName,
      email,
      phoneNumber
    })
    Notify.create({
      type: 'positive',
      message: 'User registered successfully !'
    })
    return true
  } catch (error) {
    Notify.create({
      type: 'negative',
      message: error.message
    })
    console.log('An error occured: ', error)
  }
}

export async function signOut({ commit }) {
  try {
    await firebaseAuth.signOut()
    commit('removeUser')
    commit('setLoggedIn', false)
    removeToken()
    Notify.create({
      type: 'positive',
      message: 'You have logged out successfully !'
    })
    return true
  } catch (err) {
    console.log('An error occured : ', err)
    Notify.create({
      type: 'negative',
      message: 'Logout failed'
    })
  }
}

export async function fetchUser({ commit }, user) {
  try {
    const response = await firestore.collection('users').doc(user.uid).get()
    commit('setUser', response.data())
  } catch (err) {
    Notify.create({
      type: 'negative',
      message: 'An error occured while fetching user details'
    })
    console.log('An error occured ', err)
  }
}

export async function setLoggedIn({ commit }, payload) {
  commit('setLoggedIn', payload)
}

export async function fetchUsers({ commit }, page = 1) {
  try {
    const response = await axios.get(`${process.env.USERS_URL}?page=${page}`)
    return response.data
  } catch (err) {
    console.log('An error occured: ', err)
  }
}

export async function getUserInfo({ commit }, userId) {
  return await axios.get(`${process.env.USERS_URL}/${userId}`)
}

export async function addUser({ commit }, { name, email, gender, status }) {
  return await axios.post(
    `${process.env.USERS_URL}?access-token=${process.env.API_ACCESS_TOKEN}`,
    { name, email, gender, status }
  )
}

export async function editUser(
  { commit },
  { userId, name, email, gender, status }
) {
  return axios.patch(
    `${process.env.USERS_URL}/${userId}?access-token=${process.env.API_ACCESS_TOKEN}`,
    { name, email, gender, status }
  )
}

export async function deleteUser({ commit }, userId) {
  try {
    const response = await axios.delete(
      `${process.env.USERS_URL}/${userId}?access-token=${process.env.API_ACCESS_TOKEN}`
    )
    return response
  } catch (err) {
    console.log('An error occured: ', err)
  }
}
