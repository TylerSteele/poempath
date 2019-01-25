<template>
  <div>
    <q-card class="logInCard">
      <h3>Welcome to poempath</h3>
      <q-field :error="usernameError" :error-label="usernameErrorLabel"
               label="User Name" :count="24">
        <q-input @focus="usernameError = false" v-model="username"
                 maxlength="24"/>
      </q-field>
      <q-field :error="passwordError" :error-label="passwordErrorLabel"
               label="Password" :count="100">
        <q-input @focus="passwordError = false" type="password"
                 v-model="password" maxlength="100"/>
      </q-field>
      <q-btn @click="logIn" :loading="logInLoading" class="logInButton">
        <q-spinner slot="loading"/>
        Log In
      </q-btn>
      <q-btn @click="signUp" :loading="signUpLoading" class="signUpButton">
        <q-spinner slot="loading"/>
        Sign Up
      </q-btn>
    </q-card>
  </div>
</template>

<script>
  import QBtn from "quasar-framework/src/components/btn/QBtn"
  import { UserAPI } from "../services/api/UserAPI"

  export default {
    name: "UserEntry",
    components: {QBtn},
    data() {
      return {
        username: '',
        password: '',
        usernameError: false,
        passwordError: false,
        usernameErrorLabel: 'Required',
        passwordErrorLabel: 'Required',
        logInLoading: false,
        signUpLoading: false,
        currentNotification: null
      }
    },
    methods: {
      logIn() {
        this.logInLoading = true
        if (this.username !== '' && this.password !== '') {

          UserAPI.validateUser(this.username, this.password).then((data) => {
            if (data.message === 'accessGranted') {
              if (this.currentNotification)
                this.currentNotification()
              this.currentNotification = this.$q.notify({
                message: `Welcome, ${this.username}`,
                timeout: 1200,
                color: 'positive',
                icon: 'person',
                position: 'top'
              })
              this.usernameError = false
              this.passwordError = false
              this.usernameErrorLabel = 'Required'
              this.passwordErrorLabel = 'Required'
              this.logInLoading = false
              this.$emit('loggedIn', true)
              this.$emit('username', this.username)
              this.$router.replace({name: "home"})
            }
            if (data.message === 'incorrectPassword') {
              this.passwordError = true
              this.passwordErrorLabel = 'Incorrect Password'
              this.logInLoading = false
              if (this.currentNotification)
                this.currentNotification()
              this.currentNotification = this.$q.notify({
                message: 'Password is incorrect.',
                timeout: 1200,
                color: 'negative',
                icon: 'error',
                position: 'top'
              })
            }
            if (data.message === 'userNotFound') {
              this.usernameError = true
              this.usernameErrorLabel = 'User not found'
              this.logInLoading = false
              if (this.currentNotification)
                this.currentNotification()
              this.currentNotification = this.$q.notify({
                message: 'This username does not exist. Please create an account.',
                timeout: 1200,
                color: 'warning',
                icon: 'warning',
                position: 'top'
              })
            }
          })
        } else {
          if (this.username === '')
            this.usernameError = true
          if (this.password === '')
            this.passwordError = true
          this.usernameErrorLabel = 'Required'
          this.passwordErrorLabel = 'Required'
          this.logInLoading = false
          if (this.currentNotification)
            this.currentNotification()
          this.currentNotification = this.$q.notify({
            message: 'Username and password are required.',
            timeout: 1200,
            color: 'negative',
            icon: 'error',
            position: 'top'
          })
        }

      },
      signUp() {
        this.signUpLoading = true
        if (this.username !== '' && this.password !== '') {

          UserAPI.createUser(this.username, this.password).then((data) => {
            if (data.message === 'userAdded') {
              if (this.currentNotification)
                this.currentNotification()
              this.currentNotification = this.$q.notify({
                message: `Account created. Welcome, ${this.username}`,
                timeout: 1200,
                color: 'positive',
                icon: 'person',
                position: 'top'
              })
              this.usernameError = false
              this.passwordError = false
              this.usernameErrorLabel = 'Required'
              this.passwordErrorLabel = 'Required'
              this.signUpLoading = false
              this.$emit('loggedIn', true)
              this.$emit('username', this.username)
              this.$router.replace({name: "home"})
            }
            if (data.message === 'usernameTaken') {
              this.usernameError = true
              this.usernameErrorLabel = 'Username taken'
              this.signUpLoading = false
              if (this.currentNotification)
                this.currentNotification()
              this.currentNotification = this.$q.notify({
                message: 'That username is taken. Please try another',
                timeout: 1200,
                color: 'warning',
                icon: 'error',
                position: 'top'
              })
            }
          })
        } else {
          if (this.username === '')
            this.usernameError = true
          if (this.password === '')
            this.passwordError = true
          this.usernameErrorLabel = 'Required'
          this.passwordErrorLabel = 'Required'
          this.signUpLoading = false
          if (this.currentNotification)
            this.currentNotification()
          this.currentNotification = this.$q.notify({
            message: 'Username and password are required.',
            timeout: 1200,
            color: 'negative',
            icon: 'error',
            position: 'top'
          })
        }

      },
    }
  }
</script>

<style scoped>

  .logInCard {
    margin: 10% 20%;
    padding: 5%;
  }

  .logInButton {
    margin-top: 3%;
  }

  .signUpButton {
    float: right;
    margin-top: 3%;
  }


</style>