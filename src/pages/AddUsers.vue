<template>
  <user-form :addNewUser="true"/>
</template>

<script>
import UserForm from '../components/UserForm.vue'
export default {
  name: 'AddUsers',
  components: { UserForm }
}
</script>