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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
  }
</style>
