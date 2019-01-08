<template>
  <div class="row">
    <q-btn id="approve" @click="approveAlert" color="light-blue-4" icon="check_circle" label="For Me"/>
    <q-btn id="reject" @click="rejectAlert" color="deep-orange-5" icon="block" label="Not For Me"/>
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
          color: 'light-blue-3',
          icon: 'check_circle',
          position: 'bottom-left'
        })
      },
      rejectAlert(){
        this.$q.notify({
          message: 'We will find something for you.',
          timeout: 1500,
          color: 'deep-orange-4',
          icon: 'block',
          position: 'bottom-right'
        })

      }

    }
  }
</script>

<style scoped>
  #approve {
    margin: auto;

  }
  #reject {
    margin: auto;
  }

</style>