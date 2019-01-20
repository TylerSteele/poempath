<template>
  <div>
    <p id="mainHeading">poempath</p>
    <p id="subHeading">Poetry you'll enjoy. </p>
    <PoemDisplay v-bind:title="this.poem.title" v-bind:body="this.poem.text" v-bind:author="this.poem.author"/>
    <DecisionButtons />
  </div>
</template>

<style>
  #mainHeading {
    font-size: 2em;
    text-underline: aqua;
    text-decoration: underline overline;
    text-align: center;
    margin: .5em;

  }
  #subHeading {
    font-style: italic;
    font-size: 1.5em;
    text-align: center;
    margin: 0;
  }
</style>

<script>
  import PoemDisplay from './PoemDisplay'
  import DecisionButtons from './DecisionButtons'
export default {
  name: 'PrimaryView',
  props: {
    poem: {}
  },
  components: {DecisionButtons, PoemDisplay},
  data: function() {
    return {
    }
  }
}
</script>
