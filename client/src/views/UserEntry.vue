<template>
  <div>
    <q-card class="card">
      <q-tabs v-model="activeTab" underline-color="secondary" color="primary"
              class="tabRow">
        <q-tab slot="title" name="logInTab">Log In</q-tab>
        <q-tab slot="title" name="signUpTab">Sign Up</q-tab>
      </q-tabs>
      <div class="cardContents">
        <div class="cardTitle">Welcome to the poempath</div>
        <q-field :error="usernameError" :error-label="usernameErrorLabel"
                 label="User Name" :count="24">
          <q-input @focus="usernameError = false" @keyup.enter="submit"
                   v-model="username"
                   maxlength="24"/>
        </q-field>
        <q-field :error="passwordError" :error-label="passwordErrorLabel"
                 label="Password" :count="100">
          <q-input @focus="passwordError = false" @keyup.enter="submit"
                   type="password"
                   v-model="password" maxlength="100"/>
        </q-field>
        <div class="input-group">
          <vue-recaptcha
                  ref="recaptcha"
                  @verify="onCaptchaVerified"
                  @expired="onCaptchaExpired"
                  size="invisible"
                  hidden
                  sitekey="6LcSLY8UAAAAAFOG_d7LsMdQsVoMBqqNzerAJIoH">
          </vue-recaptcha>
          <div class="centerConditional">
            <q-btn
                    @click="submit"
                    v-if="isActiveTab('logInTab')"
                    :loading="logInLoading"
                    color="secondary"
                    class="btn logInButton"
                    type="submit">
              Log In
              <q-spinner slot="loading"/>
            </q-btn>
            <q-btn
                    @click="submit"
                    v-if="isActiveTab('signUpTab')"
                    :loading="signUpLoading"
                    color="secondary"
                    class="btn signUpButton"
                    type="submit">
              Sign Up
              <q-spinner slot="loading"/>
            </q-btn>
          </div>
        </div>
      </div>
    </q-card>

    <div class="centerContainer recaptchaMessage">
      <div>
        This site is protected by reCAPTCHA and the Google
        <a href="https://policies.google.com/privacy">Privacy Policy</a> and
        <a href="https://policies.google.com/terms">Terms of Service</a> apply.
      </div>
    </div>
  </div>
</template>

<script>
  import QBtn from 'quasar-framework/src/components/btn/QBtn'
  import QTab from 'quasar-framework/src/components/tab/QTab'
  import VueRecaptcha from 'vue-recaptcha'
  import { UserAPI } from '../services/api/UserAPI'
  import { mapActions } from 'vuex'

  export default {
    name: "UserEntry",
    components: {
      QBtn,
      QTab,
      'vue-recaptcha': VueRecaptcha
    },
    data() {
      return {
        entryLoading: false,
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
      submit() {
        this.entryLoading = true
        this.$refs.recaptcha.execute()
      },
      logIn(recaptchaToken) {
        this.logInLoading = true
        let logInUsername = this.username.trim()
        let logInPassword = this.password
        this.$refs.recaptcha.reset();
        if (logInUsername !== '' && logInPassword !== '') {
          // Send captcha token and username and password to server.
          UserAPI.validateUser(logInUsername, logInPassword, recaptchaToken).then((data) => {
            // Handle response accordingly
            if (data.message === 'accessGranted') {
              if (this.currentNotification)
                this.currentNotification()
              this.currentNotification = this.$q.notify({
                message: `Welcome, ${ logInUsername }`,
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
              window.scrollTo(0, 0)
              // If successful, go to the home view
              this.$router.push({name: "home"})
            }
            // Otherwise, inform user why log in failed
            else if (data.message === 'incorrectPassword') {
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
            else if (data.message === 'userNotFound') {
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
            } else if (data.message === 'recaptchaTokenRequired' ||
              data.message === 'captchaError' ||
              data.message === 'captchaFailed') {
              this.logInLoading = false
              if (this.currentNotification)
                this.currentNotification()
              this.currentNotification = this.$q.notify({
                message: 'ReCaptcha verification error. Please reload the page and try again.',
                timeout: 1200,
                color: 'negative',
                icon: 'block',
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
      signUp(recaptchaToken) {
        this.signUpLoading = true
        let signUpUsername = this.username.trim()
        let signUpPassword = this.password
        this.$refs.recaptcha.reset();
        if (signUpUsername !== '' && this.password !== '') {
          // Send captcha token and username and password to server.
          UserAPI.createUser(signUpUsername, signUpPassword, recaptchaToken).then((data) => {
            // Handle response accordingly
            if (data.message === 'userAdded') {
              if (this.currentNotification)
                this.currentNotification()
              this.currentNotification = this.$q.notify({
                message: `Account created. Welcome, ${ signUpUsername }`,
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
              window.scrollTo(0, 0)
              // If successful, go to the introduction view
              this.$router.push({name: "introduction"})
            }
            // Otherwise, inform user why log in failed
            else if (data.message === 'usernameTaken') {
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
            else if (data.message === 'recaptchaTokenRequired' ||
              data.message === 'captchaError' ||
              data.message === 'captchaFailed') {
              this.signUpLoading = false
              if (this.currentNotification)
                this.currentNotification()
              this.currentNotification = this.$q.notify({
                message: 'ReCaptcha verification error. Please reload the page and try again.',
                timeout: 1200,
                color: 'negative',
                icon: 'block',
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
      onCaptchaVerified: function (recaptchaToken) {
        if (this.activeTab === 'logInTab') {
          this.logIn(recaptchaToken)
        } else if (this.activeTab === 'signUpTab') {
          this.signUp(recaptchaToken)
        }
      },
      onCaptchaExpired: function () {
        this.$refs.recaptcha.reset();
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~variables'

  .q-tab
    font-size 1.5rem
    padding 1 rem

  .card
    margin-left 10%
    margin-right 10%
    margin-top 10rem
    border-radius .75rem
    background-color $neutral

  .cardContents
    padding 3rem
    font-size 2rem
    @media only screen and (orientation portrait)
      font-size 1.25rem
      padding 1.5rem

  .cardTitle
    margin-bottom 2.5rem
    font-size 2rem
    font-weight bold

  .logInButton
    margin-top 3%

  .signUpButton
    margin-top 3%

  .tabRow
    border-radius 0

  .btn
    width 14rem
    margin-left auto
    margin-right auto
    padding .25rem
    font-size 1.5rem
    @media only screen and (orientation portrait)
      font-size 1rem
      width 10rem
    @media only screen and (orientation landscape)
      float right
      margin-right 6rem

  .centerConditional
    display flex
    padding-top 1rem
    @media only screen and (orientation portrait)
      align-items center
      display flex
      justify-content center
      padding-top 1rem


  .recaptchaMessage
    padding-top 2rem

</style>