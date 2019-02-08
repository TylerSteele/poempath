<template>
  <div>
  <ul>
    <li  v-for="(value, index) in lines" :key="index">
      {{ value }}
    </li>
  </ul>
  </div>
</template>

<script>

  export default {
    name: 'BodyDisplay',
    props: {
      lines: Array,
    }
  }
</script>

<style lang="stylus" scoped>
  ul
    list-style-position outside
    list-style-type none
    padding 0
    padding-bottom 1px
    padding-left 2rem
    text-indent -2rem
    font-size 2rem
    @media only screen and (orientation portrait)
      font-size 1rem
    /*@media screen and (min-width: 40em)
      font-size 4rem
    @media screen  and (max-width: 30em)
      font-size 3rem
    @media screen and (max-width: 20em)
      font-size 2rem
*/
</style>
