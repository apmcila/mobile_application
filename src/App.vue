<template>
  <div id="q-app">
    <router-view key="$route.fullPath" />
  </div>
</template>
<script>
import { firebaseAuth } from './boot/firebase'
import { removeToken, setToken } from './utils/auth'
export default {
  name: 'App',
  created() {
    firebaseAuth.onAuthStateChanged(async user => {
      if (user) {
        try {
          const token = await user.getIdToken()
          removeToken()
          setToken(token)
          await this.$store.dispatch('user/setLoggedIn', true)
          await this.$store.dispatch('user/fetchUser', user)
        } catch (err) {
          console.log('An error occured : ', err)
        }
      } else {
        removeToken()
      }
    })
  }
}
</script>
