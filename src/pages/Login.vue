<template>
  <q-form
    ref="loginForm"
    class="q-mx-auto form-container column justify-center q-my-md"
  >
    <div class="text-h5 text-weight-bold text-center">Welcome,</div>
    <div class="text-h5 text-center text-grey-13">Login to continue!!</div>
    <div class="q-gutter-lg q-mt-lg">
      <q-input
        outlined
        autofocus
        v-model="emailId"
        :rules="[rules.required, rules.email]"
        placeholder="Email ID"
      />
      <q-input
        outlined
        v-model="password"
        :rules="[rules.required]"
        type="password"
        placeholder="Create Password"
      />
      <div class="text-grey-14 q-px-sm">Forgot Password?</div>
    </div>
    <q-btn
      size="md"
      color="grey-3"
      unelevated
      :loading="loading"
      :disable="loading"
      @click="login"
      class="q-mx-auto q-mt-lg q-px-xl q-py-xs text-grey-10 column"
      >LogIn
      <template v-slot:loading>
        <q-spinner-hourglass class="on-left" />
        Please Wait
      </template>
    </q-btn>
    <div class="text-teal-12 text-body1 q-my-xl text-center">
      Don't have an account?
      <router-link to="/signup" class="text-teal-12">SignUp</router-link>
    </div>
  </q-form>
</template>

<script>
export default {
  name: 'Login',
  data() {
    const rules = {
      required: val => !!val || 'This field is required',
      email: val => {
        if (
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            val
          )
        ) {
          return true
        }
        return 'Invalid email'
      }
    }
    return {
      emailId: 'apm@apm.com',
      password: 'apm@apm.com',
      loading: false,
      rules
    }
  },
  methods: {
    async login() {
      this.loading = true
      try {
        const user = await this.$store.dispatch('user/signIn', {
          email: this.emailId,
          password: this.password
        })
        if (user) {
          this.resetForm()
          // Wait for form reset to reflect on DOM before routing
          this.$nextTick(function() {
            const path = this.$route.query.redirect
              ? this.$route.query.redirect
              : '/users'
            this.$router.push(path)
          })
        }
      } catch (err) {
        console.log('An error occured: ', err)
      } finally {
        this.loading = false
      }
    },
    resetForm() {
      this.emailId = ''
      this.password = ''
      this.$refs.loginForm.reset()
    }
  }
}
</script>

<style lang="scss" scoped>
.form-container {
  max-width: 350px;
  min-height: 100vh;
}
.q-btn {
  text-transform: none;
}
</style>
