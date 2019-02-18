<template>
  <div>
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
      }
    }
  }
</script>

<style lang="stylus">

</style>
