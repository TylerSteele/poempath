<template class="body">
  <q-layout id="q-app" view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
              color="primary"
              :inverted="$q.theme === 'ios'"
      >
        <q-toolbar-title>
          poempath
          <div v-if="loggedIn" slot="subtitle">Poetry for
            {{currentUser.username}}
          </div>
        </q-toolbar-title>
        <router-link tag="q-btn" v-if="loggedIn" to="/welcome"
                     v-on:click.native="setUserStatus(false)" replace>Log Out
        </router-link>
      </q-toolbar>
    </q-layout-header>

    <q-page-container style="padding: 0">
      <router-view @loggedIn="setUserStatus" :poem="currentPoem"/>
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
      }
    },
    mounted() {
      // Add the reCaptcha script to the document
      let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', 'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit')
      recaptchaScript.async = true
      recaptchaScript.defer = true
      document.head.appendChild(recaptchaScript)
      if (!this.loggedIn) {
        this.$router.replace({name: "welcome"})
      }
      if (Object.keys(this.currentPoem).length === 0) {
        // Make the API Request for the poem - this logic will change when connected to the NN
        this.$store.dispatch('loadCurrentPoem')
      }
    }
  }
</script>

<style lang="stylus">

</style>
