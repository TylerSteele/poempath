<template>
  <div>
    <q-card class="card">
      <div class="cardContents">
        <p class="cardTitle"><b>Welcome to the poempath Survey</b></p>
        <p>Please read each poem that is presented.<br><br>
          If you enjoyed the poem, click:
          <br>
          <q-btn class="btn" color="positive" icon="check_circle" label="For Me"/>
          <br><br>
          If you did not enjoy the poem, or if you are indifferent towards it, click:
          <br>
          <q-btn class="btn" color="negative" icon="block" label="Not For Me"/>
          <br><br>
          If there is an issue with the poem like a line missing click:
          <br>
          <q-btn class="btn" color="secondary" icon="broken_image" label="Skip"/>
          <br><br>
          Go through as many poems as you would like, and thank you!
        </p>
        <div class="input-group">
          <vue-recaptcha
                  ref="recaptcha"
                  @verify="onCaptchaVerified"
                  @expired="onCaptchaExpired"
                  size="invisible"
                  sitekey="6LcSLY8UAAAAAFOG_d7LsMdQsVoMBqqNzerAJIoH
">
          </vue-recaptcha>
          <q-btn
                  class="btn"
                  @click="submit"
                  color="secondary"
                  label="Okay"
                  :loading="entryLoading"
                  type="submit">
            <q-spinner slot="loading"/>
          </q-btn>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
  import QBtn from 'quasar-framework/src/components/btn/QBtn'
  import VueRecaptcha from 'vue-recaptcha'
  import { UserAPI } from '../services/api/UserAPI'
  import { mapActions } from 'vuex'

  export default {
    name: "UserEntry",
    components: {
      QBtn,
      'vue-recaptcha': VueRecaptcha
    },
    data() {
      return {
        entryLoading: false,
        currentNotification: null,        // Ensure only one notification is present. Calling one like a function
                                          // this.currentNotification() dismisses it (see Quasar docs on notify)
      }
    },
    methods: {
      ...mapActions([
        'loadCurrentUser'
      ]),
      submit() {
        this.entryLoading = true
        this.$refs.recaptcha.execute()
      },
      onCaptchaVerified: function (recaptchaToken) {
        this.$session.start()
        let sessionID = this.$session.id()
        // All sessionIDs start with "sess:" so remove that
        sessionID = sessionID.slice(5, sessionID.length)
        this.$refs.recaptcha.reset();
        // Send captcha token and username and password to server.
        UserAPI.createSurveyUser(sessionID, recaptchaToken).then((data) => {
          // Handle response accordingly
          if (data.message === 'surveyAdded') {
            if (this.currentNotification)
              this.currentNotification()
            this.entryLoading = false
            // If successful, go to the home view
            this.$router.replace({name: "home"})
            this.$store.dispatch('loadCurrentUser', sessionID)
            window.scrollTo(0, 0)
            this.$emit('loggedIn', true)
          }
          // Otherwise, inform user why log in failed
          else if (data.message === 'sessionIDBlank') {
            this.entryLoading = false
            if (this.currentNotification)
              this.currentNotification()
            this.currentNotification = this.$q.notify({
              message: 'That username is taken. Please try another',
              timeout: 1200,
              color: 'warning',
              icon: 'error',
              position: 'top'
            })
          } else if (data.message === 'recaptchaTokenRequired' ||
            data.message === 'captchaError' ||
            data.message === 'captchaFailed') {
            this.entryLoading = false
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
      },
      onCaptchaExpired: function () {
        this.$refs.recaptcha.reset();
      }
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
    padding 6vmin
    font-size 4vmin

  .cardTitle
    font-size 5vmin
    margin-bottom 4vmin

  .logInButton
    margin-top 3%

  .signUpButton
    margin-top 3%

  .tabRow
    border-radius 0

  .btn
    margin auto auto
    font-size 3vmin
    padding 2vmin
    width 30vmin


</style>