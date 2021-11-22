<template>
  <user-form :addNewUser="false" :id="id"/>
</template>

<script>
import UserForm from '../components/UserForm.vue'
export default {
  name: 'AddUsers',
  components: { UserForm },
  data(){
    const id = this.$route.params.id;
    return {
      id
    }
  }
}
</script>