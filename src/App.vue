<template>
  <q-layout view="hhh lpr fff" id="q-app">
    <q-page-container>
      <router-view key="$route.fullPath" />
    </q-page-container>
    <q-footer class="footer text-white">
      <div class="row justify-between items-center q-px-md q-px-sm-xl q-pt-lg">
        <div
          class="
            col-xs-12 col-sm-6
            text-h5 text-bold
            q-px-xs-sm q-px-sm-none q-pt-md q-py-sm-sm
          "
        >
          Learn. Anywhere.
        </div>
        <div
          class="
            row
            col-xs-12 col-sm-6
            text-h5
            q-pb-xs-sm q-pb-sm-none q-pt-md q-py-sm-sm
            justify-sm-end
          "
        >
          <q-btn round dense size="md" icon="mdi-facebook" />
          <q-btn round dense size="md" icon="mdi-instagram" />
          <q-btn round dense size="md" icon="mdi-twitter" />
          <q-btn round dense size="md" icon="mdi-linkedin" />
        </div>
      </div>
      <div class="q-px-md q-py-lg q-px-sm-xl">
        <q-separator color="primary" />
      </div>
      <div
        class="
          row
          justify-between
          items-center
          q-pt-sm q-pb-sm-md q-px-md q-px-sm-xl
        "
      >
        <div class="col-12 col-sm-6 q-pb-lg">
          <span>&copy; 2021 CILA. All rights reserved</span>
        </div>
        <div
          class="
            row
            col-xs-12 col-sm-6 col-md-4
            q-pb-lg
            justify-start
            items-center
            justify-sm-end
          "
        >
          <span
            class="col-xs-3 col-sm-4 q-pb-xs-md q-pb-sm-none row justify-sm-end"
            >Terms of Use
          </span>
          <span
            class="col-xs-3 col-sm-4 q-pb-xs-md q-pb-sm-none row justify-sm-end"
            >Privacy policy
          </span>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>
<script>
import { firebaseAuth } from './boot/firebase'
import { mapActions } from 'vuex'
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
          await this.setLoggedIn(true)
          await this.fetchUser(user)
        } catch (err) {
          console.log('An error occured : ', err)
        }
      } else {
        removeToken()
      }
    })
  },
  methods: mapActions('user', ['setLoggedIn', 'fetchUser'])
}
</script>

<style lang="scss" scoped>
.footer {
  background: #152141;
}
</style>
