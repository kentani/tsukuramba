<template>
  <v-app :style="{ background: this.$vuetify.theme.themes.light.brown1 }">
    <v-app-bar
      app
      flat
      dark
      dense
      fixed
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

    <v-fab-transition>
      <v-btn
        v-show="buttonActive"
        fab
        dark
        small
        absolute
        right
        color="brown"
        style="bottom: 35px; position: fixed;"
        @click="$vuetify.goTo(0)"
      >
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-footer
      app
      fixed
      height="56"
      color="brown1"
      elevation="0"
      class="pa-0"
    >
      <v-bottom-navigation fixed grow>
        <v-btn
          v-for="(item, index) in bottomItems"
          :key="item.to"
          style="height: 100%;"
          @click="onClickBtn(index)"
        >
          <span class="brown--text">{{ item.name }}</span>
          <v-icon color="brown" class="mb-2">{{ item.icon }}</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data: () => ({
    buttonActive: false,
    scroll: 0,
    title: 'つくらんば',
    bottomItems: [
      { name: '献立表', icon: 'mdi-silverware', to: '/' },
      { name: 'メニューリスト', icon: 'mdi-silverware-fork-knife', to: '/menus' },
      { name: 'アナリシス', icon: 'mdi-google-analytics', to: '/analysis' },
    ]
  }),
  mounted() {
    window.addEventListener('scroll', this.scrollWindow) // スクロールの位置を監視
  },
  methods: {
    onClickBtn(index) {
      const item = this.bottomItems[index];
      this.$router.push(item.to);
    },
    scrollWindow() {
      const top = 200
      this.scroll = window.scrollY
      if (top <= this.scroll) { // 200px以上スクロールした場合のみボタンを表示
        this.buttonActive = true
      } else {
        this.buttonActive = false
      }
    }
  }
}
</script>

<style>
</style>
