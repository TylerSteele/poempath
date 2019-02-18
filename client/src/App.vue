<template class="body">
  <q-layout id="q-app" view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
              id="appTitleBar"
              color="primary"
              :inverted="$q.theme === 'ios'"
      >
        <q-toolbar-title id="appTitle">
          <img class="logo" alt="'icon'" src="../public/logo.png"> &nbsp;poempath
          <div class="userSubtitle" v-if="loggedIn" slot="subtitle">Poetry for {{currentUser.username}}
          </div>
        </q-toolbar-title>
        <q-btn-dropdown v-if="loggedIn" class="toolBarButton" icon="settings">
          <q-list link>
            <q-toggle
                    left-label
                    color="secondary"
                    v-model="swipeActive"
                    class="toolBarButton"
                    @click="toggleSwipe">
              Swipe
            </q-toggle>
            <q-item-separator/>
            <q-item
                    class="toolBarButton"
                    v-if="loggedIn"
                    v-on:click.native="logOut()"
                    >Log Out
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-layout-header>

    <q-page-container style="padding: 0">
      <div v-touch-swipe.left="reject" v-touch-swipe.right="approve">
        <router-view @loggedIn="logIn" :poem="currentPoem" :user="currentUser"/>
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
        loggedIn: false,
        swipeActive: true,
        swipeToggleLabel: 'Disable Swipe'
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

      }
    },
    methods: {
      openURL,
      logOut() {
        this.loggedIn = false
        this.$store.dispatch('loadCurrentUser', '')
        this.$router.replace({name: 'welcome'})
      },
      logIn() {
        this.swipeActive = true
        this.loggedIn = true
      },
      approve() {
        if (this.loggedIn && this.$route.name === 'home' && this.swipeActive) {
          console.log('Approve')
          this.$store.dispatch('ratePoem', [this.currentUser.username, 'like'])
          window.scrollTo(0, 0)
        }
      },
      reject() {
        if (this.loggedIn && this.$route.name === 'home' && this.swipeActive) {
          console.log('Reject')
          this.$store.dispatch('ratePoem', [this.currentUser.username, 'dislike'])
          window.scrollTo(0, 0)
        }
      },
      toggleSwipe() {
        this.swipeActive = !this.swipeActive
        if (this.swipeActive) {
          this.swipeToggleLabel = 'Disable Swipe'
        } else {
          this.swipeToggleLabel = 'Enable Swipe'
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
        this.$router.push({name: "welcome"})
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
    vertical-align middle
    line-height 3rem
    align-items center
    justify-content center
    height 3rem
    @media only screen and (orientation portrait)
      font-size 1.5rem

  #q-app
    min-height 80vh

  .toolBarButton div
    font-size 1.2rem


  .q-option-inner
    margin-left .5rem

  .q-toggle
    padding 8px 16px

  .q-popover
    width 8rem
    max-width 12rem

  .q-item
    padding 0

  .logo
    height 2rem
    margin-top .25rem
    @media only screen and (orientation portrait)
      height 1rem
      margin 0

  .userSubtitle
    font-size 1.5rem
    @media only screen and (orientation portrait)
      font-size 1rem

</style>
