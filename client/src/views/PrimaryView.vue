<template>
  <div>
    <p id="mainHeading">poempath</p>
    <PoemDisplay v-bind:title="this.poem.title" v-bind:body="this.poem.text"
                 v-bind:author="this.poem.author"/>
    <DecisionButtons/>
  </div>
</template>

<script>
  import PoemDisplay from '../components/PoemDisplay'
  import DecisionButtons from '../components/DecisionButtons'

  export default {
    name: 'PrimaryView',
    props: {
      poem: {}
    },
    components: {DecisionButtons, PoemDisplay},
    methods: {
      mounted() {
      },
    }
  }
</script>

<style lang="stylus">
  #mainHeading
    font-size 200%
    text-decoration underline overline
    text-align center
    margin .5em


  #subHeading
    font-style italic
    font-size 150%
    text-align center
    margin 0

</style>
