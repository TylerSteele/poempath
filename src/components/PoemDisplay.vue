<template>
  <div class="hello">
    <h1>Poetically Sense</h1>
    <h3>Poetry you'll enjoy. </h3>
    <h4>{{ title }}</h4>
    <h5>{{ author }}</h5>
    <p>{{ body }}</p>
    <!-- TODO: create component for the body of each poem to render each line within <pre> tags-->
  </div>
</template>

<script>
export default {
  name: 'PoemDisplay',
  props: {
    title: String,
    body: String,
    author: String,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
