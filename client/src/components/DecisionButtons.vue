<template>
  <div class="row">
    <q-btn class="decisionBtn" @click="approveAlert" color="positive" icon="check_circle" label="For Me"/>
    <q-btn class="decisionBtn" @click="rejectAlert" color="negative" icon="block" label="Not For Me"/>
  </div>
</template>

<script>
  export default {
    name: "DecisionButtons",
    data() {
      return {
        currentNotification: null        // Ensure only one notification is present. Calling one like a function
                                         // this.currentNotification() dismisses it (see Quasar docs on notify)
      }
    },
    methods: {
      approveAlert(){
        if (this.currentNotification)
          this.currentNotification()
        this.currentNotification = this.$q.notify({
          message: 'We knew you would like it!',
          timeout: 1500,
          color: 'positive',
          icon: 'check_circle',
          position: 'bottom-left'
        })
        this.$store.dispatch('loadCurrentPoem')
      },
      rejectAlert(){
        if (this.currentNotification)
          this.currentNotification()
        this.currentNotification = this.$q.notify({
          message: 'We will find something for you.',
          timeout: 1500,
          color: 'negative',
          icon: 'block',
          position: 'bottom-right'
        })
        this.$store.dispatch('loadCurrentPoem')

      }

    }
  }
</script>

<style lang="stylus" scoped>
  .decisionBtn
    margin auto auto 5%

  .active
    font-weight bold


</style>