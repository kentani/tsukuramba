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
      fixed
      height="56"
      color="brown1"
      elevation="0"
      class="pa-0"
    >
      <v-bottom-navigation fixed grow>
        <!-- <v-btn style="height: 100%;">
          <span>表示切替</span>
          <v-icon class="mb-2">mdi-swap-horizontal</v-icon>
        </v-btn> -->

        <v-btn
          v-for="(item, index) in bottomItems"
          :key="item.to"
          style="height: 100%;"
          @click="onClickBtn(index)"
        >
          <span style="color: #795548;">{{ item.name }}</span>
          <v-icon color="brown" class="mb-2">{{ item.icon }}</v-icon>
        </v-btn>

        <!-- <v-btn style="height: 100%;">
          <span>買い物リスト</span>
          <v-icon class="mb-2">mdi-shopping</v-icon>
        </v-btn> -->

        <!-- <v-btn style="height: 100%;">
          <span>メニュー追加</span>
          <v-icon class="mb-2">mdi-plus</v-icon>
        </v-btn> -->
      </v-bottom-navigation>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data: () => ({
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
    title: 'つくらんば',
    bottomItems: [
      { name: '献立表', icon: 'mdi-silverware', to: '/' },
      { name: 'メニューリスト', icon: 'mdi-silverware-fork-knife', to: '/menus' },
    ]
  }),
  methods: {
    onClickBtn(index) {
      const item = this.bottomItems[index];
      this.$router.push(item.to);
    }
  }
}
</script>

<style>
</style>
