<template>
  <q-page v-if="user" class="flex flex-center">
    <div class="text-center container row items-center justify-center">
      <q-img src="https://picsum.photos/200" class="col-xs-8 col-sm-4" />
      <div class="col-8">
        <div class="text-h4 col">{{ user.firstName }} {{ user.lastName }}</div>
        <div class="text-body1 col">{{ user.email }}</div>
        <div class="text-body1 col">{{ user.phoneNumber }}</div>
        <q-btn
          size="md"
          outline
          color="grey-3"
          unelevated
          class="q-mx-auto q-mt-lg q-px-xl q-py-xs text-grey-10 column"
          @click="logout"
          >Logout</q-btn
        >
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Profile',
  computed: mapState('user', ['user']),
  methods: {
    async logout() {
      const result = await this.$store.dispatch('user/signOut')
      if (result) {
        this.$router.push('/login')
      }
    }
  },
  watch: {
    user: {
      handler: function(val) {
        if (val === null) {
          this.$q.loading.show({ message: 'Fetching user data...' })
        } else {
          this.$q.loading.hide()
        }
      },
      immediate: true
    }
  },
  beforeDestroy() {
    this.$q.loading.hide()
  }
}
</script>
<style lang="scss" scoped>
.container {
  max-width: 1000px;
  width: 90%;
}
</style>
