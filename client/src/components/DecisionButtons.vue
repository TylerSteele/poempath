<template>
  <div>
    <div class="row">
      <q-btn class="decisionBtn" @click="approveAlert" color="positive" icon="check_circle" label="For Me"/>
      <q-btn class="decisionBtn" @click="rejectAlert" color="negative" icon="block" label="Not For Me"/>
    </div>
    <div class="row">
      <q-btn class="skipBtn" @click="skipAlert" color="secondary" icon="broken_image" label="Skip"/>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: "DecisionButtons",
    computed: {
      ...mapState([
        'currentUser',
        'currentPoem'
      ])
    },
    methods: {
      approveAlert() {
        let updatedUser = this.currentUser
        if (updatedUser.likedPoems) {
          updatedUser.likedPoems.push(this.currentPoem)
        } else {
          updatedUser.likedPoems = [this.currentPoem]
        }
        this.$store.dispatch('ratePoem', [this.currentUser.username, 'like'])
        window.scrollTo(0, 0)
      },
      skipAlert() {
        let updatedUser = this.currentUser
        if (updatedUser.skippedPoems) {
          updatedUser.skippedPoems.push(this.currentPoem)
        } else {
          updatedUser.skippedPoems = [this.currentPoem]
        }
        this.$store.dispatch('updateUser', updatedUser)
        this.$store.dispatch('loadCurrentPoem')
        window.scrollTo(0, 0)
      },
      rejectAlert() {
        let updatedUser = this.currentUser
        if (updatedUser.dislikedPoems) {
          updatedUser.dislikedPoems.push(this.currentPoem)
        } else {
          updatedUser.dislikedPoems = [this.currentPoem]
        }
        this.$store.dispatch('ratePoem', [this.currentUser.username, 'dislike'])
        window.scrollTo(0, 0)
      }

    }
  }
</script>

<style lang="stylus" scoped>
  .active
    font-weight bold

  .decisionBtn
    margin auto auto
    padding .25rem
    width 14rem
    font-size 1.5rem
    @media only screen and (orientation portrait)
      width 10rem
      font-size 1rem

  .skipBtn
    font-size 1.5rem
    margin 3% auto 5% auto
    padding .25em
    width 12rem
    @media only screen and (orientation portrait)
      width 8rem
      font-size 1rem


</style>