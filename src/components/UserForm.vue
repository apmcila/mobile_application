<template>
  <q-form
    ref="addForm"
    class="q-mx-auto form-container column justify-center q-my-md"
  >
    <div class="text-h5 text-weight-bold text-center">
      {{ `${!id ? 'Add New' : 'Edit'} User` }}
    </div>
    <div class="q-gutter-lg q-mt-sm">
      <q-input
        outlined
        v-model="name"
        :rules="[rules.required, rules.name]"
        autofocus
        placeholder="Name"
      />
      <q-input
        outlined
        v-model="email"
        :rules="[rules.email]"
        placeholder="Email ID"
      />
      <q-select
        label="Gender"
        outlined
        v-model="gender"
        :options="genderOptions"
        :rules="[rules.required]"
      />
      <q-field
        label="User status"
        filled
        stack-label
        :rules="[rules.required]"
        v-model="status"
      >
        <template v-slot:control>
          <q-option-group
            name="status"
            v-model="status"
            color="primary"
            :options="statusOptions"
            inline
          />
        </template>
      </q-field>
    </div>
    <div class="row justify-between">
      <q-btn
        size="md"
        color="black"
        unelevated
        class="q-mt-lg q-px-xl q-py-xs col-5"
        @click="$router.go(-1)"
        >Back
      </q-btn>
      <q-btn
        size="md"
        color="secondary"
        unelevated
        :loading="loading"
        :disable="loading"
        class="q-mt-lg q-px-xl q-py-xs col-5"
        @click="submitForm"
        >{{ !id ? 'Add' : 'Save' }}
        <template v-slot:loading>
          <q-spinner-hourglass class="on-left" />
          Please Wait
        </template>
      </q-btn>
    </div>
  </q-form>
</template>

<script>
export default {
  name: 'UserForm',
  props: {
    id: {
      type: String,
      default: null
    }
  },
  data() {
    const genderOptions = [
      {
        label: 'Male',
        value: 'male'
      },
      {
        label: 'Female',
        value: 'female'
      }
    ]
    const statusOptions = [
      {
        label: 'Active',
        value: 'active'
      },
      {
        label: 'Inactive',
        value: 'inactive'
      }
    ]
    const rules = {
      required: val => !!val || 'This field is required',
      name: val => val.trim().length >= 3 || 'Minimum 3 characters required',
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
      name: '',
      email: '',
      gender: null,
      status: null,
      genderOptions,
      statusOptions,
      loading: false,
      rules
    }
  },
  methods: {
    async submitForm() {
      const isValid = await this.$refs.addForm.validate()
      if (!isValid) {
        this.$q.notify({
          type: 'negative',
          message: 'One or more fields are invalid !'
        })
        return
      }
      this.loading = true
      try {
        if (this.id) {
          await this.$store.dispatch('user/editUser', {
            userId: this.id,
            name: this.name,
            email: this.email,
            gender: this.gender.value,
            status: this.status
          })
        } else {
          await this.$store.dispatch('user/addUser', {
            name: this.name,
            email: this.email,
            gender: this.gender.value,
            status: this.status
          })
        }
        if (!this.id) {
          this.resetForm()
        }
        this.$q.notify({
          type: 'positive',
          message: `User saved successfully !`
        })
      } catch (e) {
        this.$q.notify({
          type: 'negative',
          message: 'Failed to save user !'
        })
        console.log('An error occured ', e)
      } finally {
        this.loading = false
      }
    },
    resetForm() {
      this.name = ''
      this.email = ''
      this.gender = null
      this.status = null
      this.$refs.addForm.reset()
    }
  },
  async mounted() {
    if (this.id) {
      try {
        const response = await this.$store.dispatch('user/getUserInfo', this.id)
        const user = response.data.data
        this.name = user.name
        this.email = user.email
        this.gender = user.gender
        this.status = user.status
      } catch (err) {
        console.log('An error occured ', err)
        this.$q.notify({
          type: 'negative',
          message: 'Could not get user data. Please try again !'
        })
        this.$router.go(-1)
      }
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
