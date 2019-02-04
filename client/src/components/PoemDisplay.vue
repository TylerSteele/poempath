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
    margin-left 10vw
    margin-right 10vw
    margin-top 25vmin
    min-height 60vh
  .titleText
    font-size 6vmin
    margin-bottom .5em
    font-weight bold
  .authorText
    font-size 5vmin
    margin-bottom 1em

</style>
