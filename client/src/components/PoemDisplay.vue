<template>
  <div class="poemWrapper">

    <div class="titleText">{{ title }}</div>
    <div class="authorText">{{ author }}</div>
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
  .titleText
    font-size 2em
  .authorText
    font-size 1.25em
    margin-bottom 10%

</style>
