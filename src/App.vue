<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <PoemDisplay title="In a Station of the Metro" author="Ezra Pound" body="The apparition of these faces in the crowd:\nPetals on a wet, black bough ."/>
  </div>
</template>

<script>
import PoemDisplay from './components/PoemDisplay.vue'

export default {
  name: 'app',
  components: {
    PoemDisplay
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
