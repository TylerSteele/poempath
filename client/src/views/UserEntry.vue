<template>
  <div>
    <q-card class="card">
      <q-tabs v-model="activeTab" underline-color="secondary" color="primary" class="tabRow">
        <q-tab slot="title" name="logInTab">Log In</q-tab>
        <q-tab slot="title" name="signUpTab">Sign Up</q-tab>
      </q-tabs>
      <div class="cardContents">
        <div class="cardTitle">Welcome to poempath</div>
        <q-field :error="usernameError" :error-label="usernameErrorLabel"
                 label="User Name" :count="24">
          <q-input @focus="usernameError = false" @keyup.enter="simulateSubmit"
                   v-model="username"
                   maxlength="24"/>
        </q-field>
        <q-field :error="passwordError" :error-label="passwordErrorLabel"
                 label="Password" :count="100">
          <q-input @focus="passwordError = false" @keyup.enter="simulateSubmit"
                   type="password"
                   v-model="password" maxlength="100"/>
        </q-field>
        <q-btn @click="logIn" v-if="isActiveTab('logInTab')"
               :loading="logInLoading" color="secondary" class="logInButton">
          <q-spinner slot="loading"/>
          Log In
        </q-btn>
        <q-btn @click="signUp" v-if="isActiveTab('signUpTab')"
               :loading="signUpLoading" color="secondary" class="signUpButton">
          <q-spinner slot="loading"/>
          Sign Up
        </q-btn>
      </div>
    </q-card>
  </div>
</template>

<script>
  import QBtn from 'quasar-framework/src/components/btn/QBtn'
  import QTab from 'quasar-framework/src/components/tab/QTab'
  import { UserAPI } from '../services/api/UserAPI'
  import { mapActions } from 'vuex'

  export default {
    name: "UserEntry",
    components: {QBtn, QTab},
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
        currentNotification: null,        // Ensure only one notification is present. Calling one like a function
                                          // this.currentNotification() dismisses it (see Quasar docs on notify)
        activeTab: 'logInTab'
      }
    },
    methods: {
      ...mapActions([
        'loadCurrentUser'
      ]),
      isActiveTab(tab) {
        return this.activeTab === tab
      },
      simulateSubmit() {
        switch (this.activeTab) {
          case 'logInTab':
            this.logIn()
            break
          case 'signUpTab':
            this.signUp()
            break
          default:
            break
        }
      },
      logIn() {
        this.logInLoading = true
        let logInUsername = this.username.trim()
        let logInPassword = this.password
        if (logInUsername !== '' && logInPassword !== '') {

          UserAPI.validateUser(logInUsername, logInPassword).then((data) => {
            if (data.message === 'accessGranted') {
              if (this.currentNotification)
                this.currentNotification()
              this.currentNotification = this.$q.notify({
                message: `Welcome, ${logInUsername}`,
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
              this.$store.dispatch('loadCurrentUser', logInUsername)
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
          if (logInUsername === '')
            this.usernameError = true
          if (logInPassword === '')
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
        let signUpUsername = this.username.trim()
        let signUpPassword = this.password
        if (signUpUsername !== '' && this.password !== '') {

          UserAPI.createUser(signUpUsername, signUpPassword).then((data) => {
            if (data.message === 'userAdded') {
              if (this.currentNotification)
                this.currentNotification()
              this.currentNotification = this.$q.notify({
                message: `Account created. Welcome, ${signUpUsername}`,
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
              this.$store.dispatch('loadCurrentUser', signUpUsername)
              this.$router.replace({name: "introduction"})
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
          if (signUpUsername === '')
            this.usernameError = true
          if (signUpPassword === '')
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

<style lang="stylus" scoped>
  @import '~variables'

  .card
    margin 10% 20%
    border-radius 5px
    background-color $neutral

  .cardContents
    padding 10%

  .cardTitle
    font-size 130%
    margin-bottom 10%

  .logInButton
    margin-top 3%

  .signUpButton
    margin-top 3%

  .tabRow
    border-radius 0


</style>