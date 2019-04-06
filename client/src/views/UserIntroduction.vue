<template>
  <div>
    <q-card class="card">
      <div class="cardTitle">Welcome to poempath</div>
      <div>You will be presented with poetry and asked for your opinion on each poem.<br><br>
        If you did not enjoy the poem, click
        <div class="centerContainer">
          <q-btn class="decisionBtn" @click="rejectAlert" color="negative" icon="block" label="Not For Me"/>
          or &nbsp;<i><b>SWIPE <i class="material-icons cardIcon">arrow_back</i> LEFT</b></i>.
        </div>
        <br><br>
        If you enjoyed the poem, click
        <div class="centerContainer">
          <q-btn class="decisionBtn" @click="approveAlert" color="positive" icon="check_circle" label="For Me"/>
          or &nbsp;<i><b>SWIPE <i class="material-icons cardIcon">arrow_forward</i> RIGHT</b></i>.
        </div>
        <br><br>
        As you rate poems, your preferences will be compared to those of other users, and poems similar to the
        ones you like will be recommended to you.
        <br><br>
        You can disable swipe functionality in the settings dropdown menu.
      </div>
      <div class="centerContainer">
        <q-btn @click="exitIntroduction" color="secondary" label="Embark" icon="call_split"/>
      </div>
    </q-card>
  </div>
</template>

<script>

  export default {
    name: "UserIntroduction",
    data: function () {
      return {
        currentNotification: null
      }
    },
    methods: {
      exitIntroduction() {
        this.$router.push({name: "home"})
        window.scrollTo(0, 0)
      },
      approveAlert() {
        if (this.currentNotification) {
          this.currentNotification()
        }
        this.currentNotification = this.$q.notify({
          message: 'Awesome! You pressed FOR ME, press EMBARK when you are ready',
          timeout: 1500,
          color: 'positive',
          icon: 'check_circle',
          position: 'bottom-right'
        })
      },
      rejectAlert() {
        if (this.currentNotification) {
          this.currentNotification()
        }
        this.currentNotification = this.$q.notify({
          message: 'Cool! You pressed NOT FOR ME, press EMBARK when you are ready',
          timeout: 1500,
          color: 'negative',
          icon: 'block',
          position: 'bottom-left'
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~variables'

  .card
    margin-left 5%
    margin-right 5%
    margin-top 10rem
    margin-bottom 5%
    padding 2rem
    border-radius .75rem
    background-color $neutral
    font-size 2rem
    @media only screen and (orientation portrait)
      font-size 1.25rem

  .cardTitle
    margin-bottom 2.5rem
    font-size 2rem
    font-weight bold

  .q-btn
    margin 3% 5%
    padding .25rem
    width 14rem
    font-size 1.5rem
    @media only screen and (orientation portrait)
      width 10rem
      font-size 1rem

</style>