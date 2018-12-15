<template>
  <div id="app">
    <div>
      <p id="mainHeading">>> Poetically Sense >></p>
      <p id="subHeading">Poetry you'll enjoy. </p>
    </div>
    <PoemDisplay v-bind:title="title" v-bind:body="body" v-bind:author="author"/>
  </div>
</template>

<script>
  import PoemDisplay from './components/PoemDisplay.vue'

  export default {
    name: 'app',
    components: {
      PoemDisplay
    },
    data: function () {
      return {
        title: "In a Station of the Metro",
        author: "Ezra Pound",
        body: ["The apparition of these faces in the crowd:", "Petals on a wet, black bough."]
      }
    }
  }
</script>

<style>
  body {
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #6d8fb3;
    background-color: #121212;
    margin-top: 60px;
  }
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
