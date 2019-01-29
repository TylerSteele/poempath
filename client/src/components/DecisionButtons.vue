<template>
  <div class="row">
    <q-btn class="decisionBtn" @click="approveAlert" color="positive" icon="check_circle" label="For Me"/>
    <q-btn class="decisionBtn" @click="rejectAlert" color="negative" icon="block" label="Not For Me"/>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: "DecisionButtons",
    data() {
      return {
        currentNotification: null        // Ensure only one notification is present. Calling one like a function
                                         // this.currentNotification() dismisses it (see Quasar docs on notify)
      }
    },
    computed: {
      ...mapState([
        'currentUser',
        'currentPoem'
      ])
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
        let updatedUser = this.currentUser
        if(updatedUser.likedPoems)
        {
          updatedUser.likedPoems.push(this.currentPoem)
        } else {
          updatedUser.likedPoems = [this.currentPoem]
        }
        this.$store.dispatch('updateUser', updatedUser)
        this.$store.dispatch('loadCurrentPoem')
        window.scrollTo(0,0)
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
        let updatedUser = this.currentUser
        if(updatedUser.dislikedPoems)
        {
          updatedUser.dislikedPoems.push(this.currentPoem)
        } else {
          updatedUser.dislikedPoems = [this.currentPoem]
        }
        this.$store.dispatch('updateUser', updatedUser)
        this.$store.dispatch('loadCurrentPoem')
        window.scrollTo(0,0)
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