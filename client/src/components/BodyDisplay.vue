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
    list-style-type: none;
    padding: 0;

</style>
