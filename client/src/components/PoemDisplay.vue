<template>
  <div class="poemWrapper">

    <h4>{{ title }}</h4>
    <h5>{{ author }}</h5>
    <BodyDisplay v-bind:lines="body"></BodyDisplay>
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

<style lang="stylus" scoped>
  .poemWrapper
    margin-left 10%
    margin-right 10%

</style>
