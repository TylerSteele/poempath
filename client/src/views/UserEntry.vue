<template>
  <div>
    <q-card class="card">
      <div class="cardContents">
        <h3>Welcome to poempath (Survey)</h3>
        <p>Please read each poem that is presented. <br><br>
          If you enjoyed the poem, click
          <q-btn color="positive" icon="check_circle" label="For Me"/>
          . <br><br>
          If you did not enjoy the poem, click
          <q-btn color="negative" icon="block" label="Not For Me"/>
          . <br><br>
          You will be shown approximately 10 poems and will be presented with a
          confirmation of completion at the end. (Please stay to the end! The data
          is of no use if it is incomplete.)<br><br>
          Please refrain from retaking this survey (creating another account). You
          will see the same poems and will negatively impact the quality of my
          data set.
        </p>
        <div class="input-group">
          <vue-recaptcha
                  ref="recaptcha"
                  @verify="onCaptchaVerified"
                  @expired="onCaptchaExpired"
                  size="invisible"
                  sitekey="6LcLvo0UAAAAABm2eK9s-uDHDU3WZnxcPH8DtbBe">
          </vue-recaptcha>
          <q-btn
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
        this.$refs.recaptcha.execute()
      },
      onCaptchaVerified: function (recaptchaToken) {
        this.entryLoading = true
        this.$session.start()
        let sessionID = this.$session.id()
        // All sessionIDs start with "sess:" so remove that
        sessionID = sessionID.slice(5, sessionID.length)
        this.$refs.recaptcha.reset();
        // Send captcha token and username and password to server.
        UserAPI.createSurveyUser(sessionID, recaptchaToken).then((data) => {
          // Handle response accordingly
          if (data.message === 'userAdded') {
            if (this.currentNotification)
              this.currentNotification()
            this.entryLoading = false
            this.$emit('loggedIn', true)
            console.log('About to load current user')
            this.$store.dispatch('loadCurrentUser', sessionID)
            window.scrollTo(0, 0)
            // If successful, go to the introduction view
            this.$router.replace({name: "home"})
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