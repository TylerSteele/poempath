<template>
  <div class="row">
    <q-btn class="decisionBtn" @click="approveAlert" color="positive" icon="check_circle" label="For Me"/>
    <q-btn class="decisionBtn" @click="rejectAlert" color="negative" icon="block" label="Not For Me"/>
  </div>
</template>

<script>
  export default {
    name: "DecisionButtons",
    methods: {
      approveAlert(){
        this.$q.notify({
          message: 'We knew you would like it!',
          timeout: 1500,
          color: 'positive',
          icon: 'check_circle',
          position: 'bottom-left'
        })
      },
      rejectAlert(){
        this.$q.notify({
          message: 'We will find something for you.',
          timeout: 1500,
          color: 'negative',
          icon: 'block',
          position: 'bottom-right'
        })

      }

    }
  }
</script>

<style lang="stylus" scoped>
  .decisionBtn
    margin auto auto 5%


</style>