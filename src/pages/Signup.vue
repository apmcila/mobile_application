<template>
  <q-form
    ref="signupForm"
    class="q-mx-auto q-px-lg form-container column justify-center q-my-md"
  >
    <div class="text-h5 text-weight-bold text-center">Create Account</div>
    <div class="text-h6 text-center text-grey-13">Sign Up to get Started!!</div>
    <div class="q-gutter-sm q-mt-lg">
      <q-input
        outlined
        v-model="nameFirst"
        dense
        :rules="[rules.required, rules.name]"
        autofocus
        placeholder="First Name"
      />
      <q-input
        outlined
        dense
        v-model="nameLast"
        :rules="[rules.required, rules.name]"
        placeholder="Last Name"
      />
      <q-input
        outlined
        dense
        v-model="emailId"
        :rules="[rules.email]"
        placeholder="Email ID"
      />
      <q-input
        outlined
        dense
        type="number"
        :rules="[rules.phone]"
        v-model="phoneNumber"
        placeholder="Phone Number"
      />
      <q-input
        outlined
        dense
        v-model="password"
        :rules="[rules.password]"
        type="password"
        placeholder="Create Password"
      />
    </div>
    <q-btn
      size="md"
      color="grey-3"
      unelevated
      :loading="loading"
      :disable="loading"
      class="q-mx-auto q-mt-lg q-px-xl q-py-xs text-grey-10 column"
      @click="submitForm"
      >SignUp
      <template v-slot:loading>
        <q-spinner-hourglass class="on-left" />
        Please Wait
      </template>
    </q-btn>
    <div class="text-teal-12 text-body1 q-my-xl text-center">
      Have an Account?
      <router-link to="/login" class="text-teal-12">Login</router-link>
    </div>
  </q-form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Signup',
  data() {
    const rules = {
      required: val => !!val || 'This field is required',
      name: val => val.trim().length >= 3 || 'Minimum 3 characters required',
      phone: val => {
        if (/^[6-9][0-9]{9}$/.test(val)) {
          return true
        }
        return 'Invalid phone number'
      },
      email: val => {
        if (
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            val
          )
        ) {
          return true
        }
        return 'Invalid email'
      },
      password: val => val.length > 8 || 'Minimum 8 characters required'
    }
    return {
      nameFirst: '',
      nameLast: '',
      emailId: '',
      phoneNumber: null,
      password: '',
      loading: false,
      rules
    }
  },
  methods: {
    ...mapActions('user', ['signUp']),
    async submitForm() {
      const isValid = await this.$refs.signupForm.validate()
      if (!isValid) {
        this.$q.notify({
          type: 'negative',
          message: 'One or more fields are invalid !'
        })
        return
      }
      this.loading = true
      const response = await this.signUp({
        email: this.emailId,
        password: this.password,
        firstName: this.nameFirst,
        lastName: this.nameLast,
        phoneNumber: this.phoneNumber
      })
      if (response) {
        this.resetForm()
        this.$nextTick(function () {
          const path = this.$route.query.redirect
            ? this.$route.query.redirect
            : '/users'
          this.$router.push(path)
        })
      }
      this.loading = false
    },
    resetForm() {
      this.nameFirst = ''
      this.nameLast = ''
      this.emailId = ''
      this.phoneNumber = null
      this.password = ''
      this.$refs.signupForm.reset()
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
