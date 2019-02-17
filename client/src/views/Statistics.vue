<template>
  <div>
    <PoemList v-bind:heading="'Best Rated'" v-bind:icon="'trending_up'" v-bind:list="stats.bestRated"/>
    <PoemList v-bind:heading="'Worst Rated'" v-bind:icon="'trending_down'" v-bind:list="stats.worstRated"/>
    <PoemList v-bind:heading="'Most Liked'" v-bind:icon="'thumb_up'" v-bind:list="stats.mostLiked"/>
    <PoemList v-bind:heading="'Most Disliked'" v-bind:icon="'thumb_down'" v-bind:list="stats.mostDisliked"/>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import PoemList from '../components/PoemList'

  export default {
    name: 'PrimaryView',
    props: {
    },
    computed: {
      ...mapState([
        'stats'
      ])
    },
    methods: {
      mounted() {
      },
    },
    components: { PoemList }
  }
</script>

<style lang="stylus">

</style>
