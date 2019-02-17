<template>
  <q-card class="card">
    <div class="cardTitle">{{heading}}<i class="material-icons cardIcon">
      {{ icon }}
    </i></div>
    <ol>
      <li v-for="item in list" :key="item._id">
        <q-collapsible class="poemTitle" :label="item.title" :sublabel="item.numberOfLikes + ' like | ' +
        item.numberOfDislikes + ' dislike'">
          <div class="authorTitle">By: {{ item.author }}</div>
          <ul>
            <li v-for="(value, index) in item.text" :key="index">
              {{ value }}
            </li>
          </ul>
        </q-collapsible>
      </li>
    </ol>
  </q-card>
</template>

<script>
  export default {
    name: "PoemList",
    framework: {
      components: ['QCollapsible']
    },
    props: {
      heading: String,
      list: Array,
      icon: String
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~variables'

  .card
    margin-left 10%
    margin-right 10%
    margin-top 10vmin
    margin-bottom 10vmin
    min-height 60vh
    padding 5%
    background-color $neutral
    @media only screen and (orientation landscape)
      margin-left 20%
      margin-right 20%

  .cardTitle
    font-weight bold
    margin-bottom 2rem
    height 2rem
    font-size 2rem

  .authorTitle
    margin-bottom .5em
    padding-left 1rem

  ul
    list-style-position outside
    list-style-type none
    padding 0
    padding-bottom 1px
    padding-left 3rem
    text-indent -2rem
    font-size 1rem
    @media only screen and (orientation portrait)
      font-size 1rem

  .cardIcon
    float right
    font-size 2rem
</style>