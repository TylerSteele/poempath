<template>
  <div class="row">
    <q-btn class="decisionBtn" @click="approve" color="positive" icon="check_circle" label="For Me"/>
    <q-btn class="decisionBtn" @click="reject" color="negative" icon="block" label="Not For Me"/>
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
      approve() {
        this.$store.dispatch('ratePoem', [this.currentUser.username, 'like'])
        window.scrollTo(0, 0)
      },
      reject() {
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
    margin 3% auto 5% auto
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