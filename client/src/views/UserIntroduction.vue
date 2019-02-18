<template>
  <div>
    <q-card class="card">
      <h3>Welcome to poempath</h3>
      <p>You will be presented with poetry and asked for your opinion on each poem.<br><br>
        If you did not enjoy the poem, click
        <q-btn color="negative" icon="block" label="Not For Me"/>
        or swipe left,
        . <br><br>
        If you enjoyed the poem, click
        <q-btn color="positive" icon="check_circle" label="For Me"/>
        or swipe right.
        . <br><br>
        As you rate poems, your preferences will be compared to other users, and poems similar to those you have
        liked will be recommended to you.
      </p>
      <q-btn @click="exitIntroduction" color="secondary" label="Okay"/>
    </q-card>
  </div>
</template>

<script>

  export default {
    name: "UserIntroduction",
    methods: {
      exitIntroduction() {
        this.$router.replace({name: "home"})
        window.scrollTo(0, 0)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~variables'

  .card
    margin 2%
    padding 10%
    border-radius 5px
    background-color $neutral

</style>