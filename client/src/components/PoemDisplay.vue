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
    margin-top 25vmin
    min-height 60vh
    @media only screen and (orientation: landscape)
      margin-left 20%
      margin-right 20%
  .titleText
    font-weight bold
    margin-bottom .5rem
    font-size 4rem
    @media only screen and (orientation: portrait)
      font-size 3rem
  .authorText
    margin-bottom 1em
    font-size 2.75rem
    @media only screen and (orientation: portrait)
      font-size 2rem

</style>
