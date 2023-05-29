<template>
  <v-container>
    <v-row
      no-gutters
      align="center"
    >
      <v-col cols="12">
        <v-card
          flat
          color="brown1"
        >
          <v-card-title class="justify-center pa-0 text-h4 font-weight-bold brown--text">
            {{ currentMonth }}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <v-row
      no-gutters
      align="center"
    >
      <v-col
        v-for="(date, index) in currentWeek"
        :key="date.date"
        cols="12"
      >
        <v-card
          flat
          height="150"
          color="brown1"
        >
          <v-row
            no-gutters
            align="center"
            style="height: 100%"
          >
            <v-col cols="3">
              <v-card-title
                class="pa-0 text-h5 brown--text"
                @click="onClickDate(index)"
              >
                <div>{{ date.date }}</div>
                <div class="pl-2 font-weight-bold">{{ date.day }}</div>
              </v-card-title>
            </v-col>

            <v-col cols="9" style="height: 90%">
              <v-card
                flat
                rounded="lg"
                style="height: 100%;"
                color="brown1"
              >
                <v-row no-gutters align="center" style="height: 100%; overflow-y: scroll;">
                  <v-col>
                    <v-card-text class="px-0 text-body-1">
                      <ul>
                        <li
                          v-for="(menu, index) in date.menus"
                          :key="`${date.date}-${index}`"
                          class="pb-1"
                        >
                          {{ menu }}
                        </li>
                      </ul>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog
      v-model="dialog"
    >
      <v-card flat color="brown1">
        <v-row no-gutters>
          <v-col cols="12">
            <v-card-text class="pa-2 font-weight-bold">
              選択済みメニュー
            </v-card-text>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col
            v-for="(menu, index) in currentMenus"
            :key="`selected-menu${index}`"
            cols="12"
          >
            <v-card flat class="mx-4 my-1">
              <v-row no-gutters>
                <v-col cols="4">
                  <v-card-text class="pa-0">
                    <v-img
                      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                    ></v-img>
                  </v-card-text>
                </v-col>

                <v-col cols="8">
                  <v-card-text class="">
                    {{ menu }}
                  </v-card-text>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12">
            <v-card-text class="pa-2 font-weight-bold">
              メニューリスト
            </v-card-text>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col
            v-for="(menu, index) in menuList"
            :key="`menu${index}`"
            v-if="!currentMenus.includes(menu.name)"
            cols="12"
          >
            <v-card flat class="mx-4 my-1">
              <v-row no-gutters>
                <v-col cols="4">
                  <v-card-text class="pa-0">
                    <v-img
                      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                    ></v-img>
                  </v-card-text>
                </v-col>

                <v-col cols="8">
                  <v-card-text class="py-1">
                    {{ menu.name }}
                  </v-card-text>

                  <v-card-actions class="py-1">
                    <v-chip
                      v-for="(tag, index2) in menu.tags"
                      :key="`menu${index}-tag${index2}`"
                      x-small
                      label
                      outlined
                      class="text-center mx-1 px-1"
                    >
                      {{ tag }}
                    </v-chip>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import moment from "moment";

export default {
  name: 'IndexPage',
  data: () => ({
    currentDate: '',
    currentMonth: '',
    currentWeek: [],
    currentMenus: [],
    dialog: true,
    menuList: [
      { name: 'メニュー1', tags: ['和食', 'ごはん'] },
      { name: 'メニュー2', tags: ['和食', 'おかず', 'ヘルシー', '魚'] },
      { name: 'メニュー2', tags: ['和食', 'おつまみ', 'ヘルシー', '肉'] },
      { name: 'メニュー3', tags: ['洋食', 'おつまみ', 'がっつり', '肉'] },
      { name: 'メニュー4', tags: ['中華', 'おかず', 'がっつり'] },
    ]
  }),
  mounted() {
    this.currentDate = moment();
    this.currentMonth = this.currentDate.format('M月');
    this.currentWeek = [
      { day: '月', date: '29', menus: ['メニュー1', 'メニュー2', 'メニュー3', 'メニュー4'] },
      { day: '火', date: '30', menus: ['メニュー1', 'メニュー2'] },
      { day: '水', date: '31', menus: ['メニュー1', 'メニュー2', 'メニュー3'] },
      { day: '木', date: '01', menus: ['メニュー1', 'メニュー2', 'メニュー3', 'メニュー4', 'メニュー5'] },
      { day: '金', date: '02', menus: [] },
      { day: '土', date: '03', menus: [] },
      { day: '日', date: '04', menus: [] },
    ];
  },
  methods: {
    onClickDate(index) {
      this.currentMenus = this.currentWeek[index].menus;
      this.dialog = false;
    },
  }
}
</script>

<style scoped>
ul, ol {
  padding: 0;
}

ul li {
  position: relative;
  list-style-type: none!important;/*ポチ消す*/
  padding: 0.5em 0.5em 0.5em 0.5em;
  margin-bottom: 5px;
  line-height: 1.5;
  background: #D7CCC8;
  vertical-align: middle;
  color: #505050;
  border-radius: 15px 0px 0px 15px;/*左側の角丸く*/
}

ul li:before{
  display:inline-block;
  vertical-align: middle;
  /*以下白丸つくる*/
  content:'';
  width:1em;
  height: 1em;
  background: #fff;
  border-radius: 50%;
  margin-right: 8px;
  margin-bottom: 5px;
}
</style>
