<template>
  <v-app :style="{ background: '#EFEBE9' }">
    <v-app-bar
      app
      flat
      dark
      dense
      hide-on-scroll
      color="brown"
    >
      <v-toolbar-title>
        <v-row no-gutters>
          <v-col>
            <v-icon>mdi-chef-hat</v-icon>
          </v-col>

          <v-col
            align="center"
            class="ml-2"
            style="margin-top: 2px;"
          >
            {{ title }}
          </v-col>
        </v-row>
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer
      app
      height="56"
      color="brown1"
      elevation="0"
    >
      <v-bottom-navigation fixed grow>
        <v-btn>
          <span>表示切替</span>
          <v-icon class="mb-2">mdi-swap-horizontal</v-icon>
        </v-btn>

        <v-btn>
          <span>買い物リスト</span>
          <v-icon class="mb-2">mdi-shopping</v-icon>
        </v-btn>

        <v-btn>
          <span>メニューリスト</span>
          <v-icon class="mb-2">mdi-silverware-fork-knife</v-icon>
        </v-btn>

        <v-btn>
          <span>メニュー追加</span>
          <v-icon class="mb-2">mdi-plus</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: false,
      rightDrawer: false,
      title: 'つくらんば'
    }
  }
}
</script>

<style>
body {
  background-color: #A1887F;
}
</style>
