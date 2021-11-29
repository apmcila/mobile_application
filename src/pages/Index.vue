<template>
  <q-page class="flex flex-center">
    <div class="text-center container">
      <q-img src="~assets/CILA-INCUBATOR-LOGO-CO.png" />
      <div class="text-h4">UI Starter Kit</div>
      <div class="text-h6" v-if="isLoggedIn">
        <router-link class="text-orange-9" to="/users"> Users</router-link> |
        <router-link class="text-orange-9" to="/profile"> Profile </router-link>
      </div>
      <div class="text-h6" v-else>
        <router-link class="text-orange-9" to="/login"> Login</router-link> |
        <router-link class="text-orange-9" to="/signup"> SignUp </router-link>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'PageIndex',
  computed: mapState('user', ['isLoggedIn'])
}
</script>
<style lang="scss" scoped>
.container {
  max-width: 1000px;
  width: 90%;
}
</style>
