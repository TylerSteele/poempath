<template>
  <div>
    <q-card class="card">
      <div class="cardContents">
        <div class="cardTitle"><b>Welcome to the poempath survey</b></div>
        <div>I plan to build a <a href="https://en.wikipedia.org/wiki/Recommender_system">recommendation engine</a>
          that suggests poems to readers based on their history of preferences. To get started, I need some baseline
          data that you can provide!
          <br><br>
          For each poem you enjoy, click "For Me"
          <div class="centerConditional">
            <q-btn class="btn" color="positive" icon="check_circle" label="For Me"/>
          </div>
          <br><br><br>
          For those you don't enjoy or are indifferent towards, click "Not For Me"
          <div class="centerConditional">
            <q-btn class="btn" color="negative" icon="block" label="Not For Me"/>
          </div>
          <br><br><br>
          If there is an issue with a poem, like a line missing, click "Skip"
          <div class="centerConditional">
            <q-btn class="btn" color="secondary" icon="broken_image" label="Skip"/>
          </div>
          <br><br><br>
          Rate as many poems as you would like, and thank you!
          <br><br>
        </div>
        <div class="input-group centerContainer">
          <vue-recaptcha
                  ref="recaptcha"
                  @verify="onCaptchaVerified"
                  @expired="onCaptchaExpired"
                  size="invisible"
                  hidden
                  sitekey="6LcSLY8UAAAAAFOG_d7LsMdQsVoMBqqNzerAJIoH
">
          </vue-recaptcha>
          <q-btn
                  class="btn signUpButton"
                  @click="submit"
                  color="secondary"
                  label="Embark"
                  icon="call_split"
                  :loading="entryLoading"
                  type="submit">
            <q-spinner slot="loading"/>
          </q-btn>
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
    margin-left 10%
    margin-right 10%
    margin-top 10%
    border-radius .75rem
    background-color $neutral
    @media only screen and (orientation portrait)
      margin-top 20%

  .cardContents
    padding 3rem
    font-size 2rem
    @media only screen and (orientation portrait)
      font-size 1.25rem
      padding 1.5rem

  .cardTitle
    margin-bottom 1rem
    font-size 2rem

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
    @media only screen and (orientation portrait)
      align-items center
      display flex
      justify-content center
      padding-top 1rem


  .recaptchaMessage
    padding-top 2rem

</style>