<template>
  <div>
    <q-card class="logInCard">
      <h3>Welcome to Poetically Sense</h3>
      <q-field label="User Name" :count="24">
        <q-input v-model="username" maxlength="24"/>
      </q-field>
      <q-field label="Password" :count="100">
        <q-input type="password" v-model="password" maxlength="100"/>
      </q-field>
      <q-btn @click="logIn()">Log In</q-btn>
    </q-card>
  </div>
</template>

<script>
  import QBtn from "quasar-framework/src/components/btn/QBtn";

  export default {
    name: "UserEntry",
    components: {QBtn},
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      logIn() {
        this.$emit('loggedIn', true)
      }
    }
  }
</script>

<style scoped>

    .logInCard {
      margin: 20%;
      padding: 5%;
    }


</style>