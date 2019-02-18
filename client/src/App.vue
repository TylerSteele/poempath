<template class="body">
  <q-layout id="q-app" view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
              id="appTitleBar"
              color="primary"
              :inverted="$q.theme === 'ios'"
      >
        <q-toolbar-title id="appTitle">
          poempath
          <div class="userSubtitle" v-if="loggedIn" slot="subtitle">Poetry for {{currentUser.username}}
          </div>
        </q-toolbar-title>
        <router-link
                tag="q-btn"
                class="logOutButton"
                v-if="loggedIn"
                to="/welcome"
                v-on:click.native="setUserStatus(false)"
                replace>Log Out
        </router-link>
      </q-toolbar>
    </q-layout-header>

    <q-page-container style="padding: 0">
        <div v-touch-swipe.left="reject" v-touch-swipe.right="approve">
          <router-view @loggedIn="setUserStatus" :poem="currentPoem" :user="currentUser"/>
        </div>
    </q-page-container>
  </q-layout>
</template>

<script>
  import { openURL } from 'quasar'
  import { mapState } from 'vuex'


  export default {
    name: 'LayoutDefault',
    data() {
      return {
        loggedIn: false
      }
    },
    computed: {
      ...mapState([
        'currentUser',
        'currentPoem',
        'isLoading'
      ])
    },
    watch: {
      isLoading() {
        if (this.isLoading) {
          this.$q.loading.show({})
        } else {
          this.$q.loading.hide({})
        }
      },
      currentUser() {
        if (Object.keys(this.currentUser).length > 0) {
          // If the current user does not have any like/dislike history
          if (!this.currentUser.likedPoems && !this.currentUser.dislikedPoems) {
            this.$router.replace({name: "introduction"})
          } else {
            if (this.currentUser.likedPoems.length === 0 && this.currentUser.dislikedPoems.length === 0) {
              this.$router.replace({name: "introduction"})
            }
          }
        }
      }
    },
    methods: {
      openURL,
      setUserStatus(isLoggedIn) {
        this.loggedIn = isLoggedIn
        // If logging out, clear the state
        if (!isLoggedIn) {
          this.$store.dispatch('loadCurrentUser', '')
        }
      },
      approve() {
        if(this.loggedIn && this.$route.name === 'home'){
          console.log('Approve')
          this.$store.dispatch('ratePoem', [this.currentUser.username, 'like'])
          window.scrollTo(0, 0)
        }
      },
      reject() {
        if(this.loggedIn && this.$route.name === 'home'){
          console.log('Reject')
          this.$store.dispatch('ratePoem', [this.currentUser.username, 'dislike'])
          window.scrollTo(0, 0)
        }
      }
    },
    mounted() {
      // Add the reCaptcha script to the document
      let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', 'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit')
      recaptchaScript.async = true
      recaptchaScript.defer = true
      document.head.appendChild(recaptchaScript)
      if (!this.loggedIn && !(this.$route.name === 'stats')) {
        this.$router.replace({name: "welcome"})
      }
    }
  }
</script>

<style lang="stylus">
  #appTitleBar
    padding 1rem
    @media only screen and (orientation portrait)
      padding .5rem

  #appTitle
    font-size 2.5rem
    @media only screen and (orientation portrait)
      font-size 1.5rem

  #q-app
    min-height 80vh

  .logOutButton div
    font-size 1.2rem

  .userSubtitle
    font-size 1.5rem
    @media only screen and (orientation portrait)
      font-size 1rem

</style>
