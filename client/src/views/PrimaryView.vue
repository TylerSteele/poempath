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
  import {UserAPI} from "../services/api/UserAPI"

  export default {
    name: 'PrimaryView',
    props: {
      poem: {},
      username: {}
    },
    watch: {
      username: function (newVal) {
        if (newVal !== '') {
          // Make the API Request for the user
          this.getUser()
          }
      },
      deep: true,
      immediate: true
    },
    components: {DecisionButtons, PoemDisplay},
    data: function () {
      return {
        user: {}
      }
    },
    methods: {
      mounted() {

      },
      getUser() {
        UserAPI.getUser(this.props.username).then((data) => {
          this.user = data
        })
      }
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
