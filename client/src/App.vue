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
          poempath
          <div slot="subtitle">Poetry you'll enjoy</div>
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
          <q-list-header>Dev Links</q-list-header>
          <q-item @click.native="openURL('https://github.com/SteeleTyler/poetically-sense')">
            <q-item-side icon="code"/>
            <q-item-main label="GitHub"></q-item-main>
          </q-item>
          <q-item @click.native="openURL('https://quasar-framework.org/components/')">
            <q-item-side icon="build"/>
            <q-item-main label="Component Docs"></q-item-main>
          </q-item>
          <q-item @click.native="openURL('https://quasar-framework.org/quasar-play/android/index.html#/showcase/style-and-identity/color-palette')">
            <q-item-side icon="color_lens"/>
            <q-item-main label="Color Palette"></q-item-main>
          </q-item>
          <q-item @click.native="openURL('https://material.io/tools/icons/?icon=color_lens&style=baseline')">
            <q-item-side icon="add_to_queue"/>
            <q-item-main label="Material Icons"></q-item-main>
          </q-item>
        </q-list>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <PrimaryView  v-if="loggedIn" v-bind:poem="fetchedPoem"/>
      <UserEntry v-else v-on:loggedIn="logIn"/>
    </q-page-container>
  </q-layout>
</template>

<script>
  import {openURL} from 'quasar'
  import PrimaryView from './components/PrimaryView.vue'
  import UserEntry from './components/UserEntry'
  import {PoetryAPI} from "./services/api/PoetryAPI"

  const apiService = new PoetryAPI()

  export default {
    name: 'LayoutDefault',
    components: {
      PrimaryView,
      UserEntry
    },
    data() {
      return {
        leftDrawerOpen: this.$q.platform.is.desktop,
        fetchedPoem: {},
        loggedIn: false
      }
    },
    methods: {
      openURL,
      getPoem() {
        apiService.getPoem().then((data) => {
          // For random poem, the return is an array of length 1, not the object itself
          this.fetchedPoem = data[0]
        })
      },
      logIn() {
        this.loggedIn = true
      }
    },
    mounted() {
      // If the object is empty
      if (Object.keys(this.fetchedPoem).length === 0) {
        // Make the API Request for the poem
        this.getPoem()
      }
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
