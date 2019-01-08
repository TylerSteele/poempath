<template>
  <q-layout id="q-app" view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          Poetically Sense
          <div slot="subtitle">Poems you know you'll enjoy</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list no-border link inset-delimiter>
          <q-list-header>Bonus Links</q-list-header>
          <q-item @click.native="openURL('https://github.com/SteeleTyler/poetically-sense')">
            <q-item-side icon="code" />
            <q-item-main label="GitHub" sublabel="Poetically Sense"></q-item-main>
          </q-item>
        </q-list>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <PrimaryView />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import PrimaryView from './components/PrimaryView.vue'

export default {
  name: 'LayoutDefault',
  components: {
    PrimaryView
  },
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
  body {
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #6d8fb3;
    background-color: #121212;
    margin-top: 60px;
  }
</style>
