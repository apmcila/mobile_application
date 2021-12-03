<template>
  <q-form
    ref="loginForm"
    class="
      q-mx-auto q-px-lg
      form-container
      column
      justify-center
      q-mt-lg q-mb-sm q-pb-xs
    "
  >
    <div class="text-h5 q-mb-xs text-semi-bold">Login</div>
    <div class="q-mt-md">
      <label class="text-subtitle1 text-semi-bold q-mb-xs">Email</label>
      <q-input
        outlined
        dense
        v-model="emailId"
        :rules="[rules.required, rules.email]"
        placeholder="abc@example.com"
      >
      </q-input>
      <div class="text-subtitle1 text-semi-bold q-mb-xs">Password</div>
      <q-input
        outlined
        dense
        v-model="password"
        :rules="[rules.required]"
        type="password"
        placeholder="Your Password"
      />
      <div class="text-primary text-subtitle1">Forgotten Password?</div>
    </div>
    <q-btn
      color="primary"
      unelevated
      icon-right="keyboard_arrow_right"
      :loading="loading"
      :disable="loading"
      @click="login"
      class="q-my-md text-subtitle1"
      style="border-radius: 10px"
      >LogIn
      <template v-slot:loading>
        <q-spinner-hourglass class="on-left" />
        Please Wait
      </template>
    </q-btn>
    <q-btn
      unelevated
      flat
      size="lg"
      style="border: 1px solid #e8edf2"
      class="q-my-xs"
    >
      <q-icon
        left
        size="xs"
        name="img:https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
      />
      <div class="text-subtitle1">Login with Google</div>
    </q-btn>
    <div class="text-body1 q-my-lg q-py-lg text-center">
      Don't have an account?
      <router-link to="/signup" class="text-primary">SignUp</router-link>
    </div>
  </q-form>
</template>

<script>
import { mapActions } from 'vuex'
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
      emailId: '',
      password: '',
      loading: false,
      rules
    }
  },
  methods: {
    ...mapActions('user', ['signIn']),
    async login() {
      const isValid = await this.$refs.loginForm.validate()
      if (!isValid) {
        this.$q.notify({
          type: 'negative',
          message: 'One or more fields are invalid !'
        })
        return
      }
      this.loading = true
      try {
        const user = await this.signIn({
          email: this.emailId,
          password: this.password
        })
        if (user) {
          this.resetForm()
          // Wait for form reset to reflect on DOM before routing
          this.$nextTick(function () {
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
}
.q-btn {
  text-transform: none;
}
</style>
