<template>
  <div>
    <p id="mainHeading">>> Poetically Sense >></p>
    <p id="subHeading">Poetry you'll enjoy. </p>
    <PoemDisplay v-bind:title="poemTitle" v-bind:body="poemBody" v-bind:author="poemAuthor"/>
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
export default {
  name: 'PrimaryView',
  components: {PoemDisplay},
  data: function() {
    return {
      poemTitle: "Placeholder Title",
      poemBody: ['First line', 'Second line', 'Third line'],
      poemAuthor: 'Placeholder Author'
    }

  }
}
</script>
