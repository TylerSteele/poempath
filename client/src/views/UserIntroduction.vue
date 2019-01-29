<template>
  <div>
    <q-card class="card">
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