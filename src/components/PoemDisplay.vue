<template>
  <div>

    <h4>{{ title }}</h4>
    <h5>{{ author }}</h5>
    <BodyDisplay v-bind:lines="body"></BodyDisplay>
    <!-- TODO: create component for the body of each poem to render each line within <pre> tags-->
  </div>
</template>

<script>
  import BodyDisplay from './BodyDisplay.vue'

  export default {
    name: 'PoemDisplay',
    props: {
      title: String,
      body: Array,
      author: String,
    },
    components: {
      BodyDisplay
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }
  div {
    margin-left: 20%;
    margin-right: 20%;
  }
</style>
