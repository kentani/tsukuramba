<template>
  <v-container class="pt-0">
    <v-row
      no-gutters
      align="center"
    >
      <v-col cols="12">
        <v-card
          flat
          color="brown1"
        >
          <v-row no-gutters>
            <v-col cols="12">
              <v-card-title class="justify-center pa-0 pb-2 text-h4 font-weight-bold brown--text">
                <v-row
                  no-gutters
                  justify="center"
                  align="center"
                >
                  <v-col
                    cols="1"
                    class="d-flex justify-center"
                    align-self="center"
                    @click="onClickPrevWeek"
                  >
                    <v-btn x-large icon>
                      <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                  </v-col>

                  <v-col
                    cols="4"
                    class="d-flex justify-center"
                    align-self="center"
                  >
                    {{ currentMonth }}
                  </v-col>

                  <v-col
                    cols="1"
                    class="d-flex justify-center"
                    align-self="center"
                    @click="onClickNextWeek"
                  >
                    <v-btn x-large icon>
                      <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-title>
            </v-col>
          </v-row>
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

        <v-divider />

        <v-card
          flat
          height="150"
          color="brown1"
        >
          <v-row
            no-gutters
            align="center"
            style="height: 100%"
            @click="onClickDate(index)"
          >
            <v-col cols="3">
              <v-card-title class="pa-0 text-h5 brown--text">
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

        <v-divider v-if="index === currentWeek.length - 1" />
      </v-col>
    </v-row>

    <v-dialog
      v-model="dialog"
    >
      <v-card
        flat
        color="brown1"
      >

        <v-row
          no-gutters
          justify="center"
        >
          <v-col cols="4">
            <v-card-title class="pt-2 pb-0 text-h5 brown--text">
              <div>{{ selectedDate }}</div>
              <div class="pl-2 font-weight-bold">{{ selectedDay }}</div>
            </v-card-title>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12">
            <v-card-text class="px-2 py-0 brown--text font-weight-bold">
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
            <v-card
              :flat="!isSelected(menu)"
              class="mx-4 my-1"
            >
              <v-row
                no-gutters
                @click="onClickMenu(menu, index)"
              >
                <v-col cols="4">
                  <v-card-text class="pa-1">
                    <v-img
                      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                    ></v-img>
                  </v-card-text>
                </v-col>

                <v-col cols="8">
                  <v-card-text class="py-1">
                    {{ menu }}
                  </v-card-text>

                  <v-card-actions class="py-1">
                    <v-chip
                      v-for="(tag, index2) in fetchTags(menu)"
                      :key="`selected-menu${index}-tag${index2}`"
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

        <v-row no-gutters>
          <v-col cols="12">
            <v-card-text class="pa-2 pb-0 brown--text font-weight-bold">
              メニューリスト
            </v-card-text>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12">
            <v-card
              flat
              color="brown1"
              class="mx-4"
            >
              <v-card-text class="pa-0">
                <v-chip
                  v-for="(tag, index) in tagList"
                  :key="`form-tag${index}`"
                  x-small
                  label
                  :outlined="!searchTags.includes(tag)"
                  class="text-center mx-1 px-1"
                  @click="onClickFormTag(tag)"
                >
                  {{ tag }}
                </v-chip>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="searchName"
              append-icon="mdi-magnify"
              dense
              hide-details
              placeholder="料理名"
              color="brown"
              class="mx-4 mb-2"
              @click:append="onClickSearch"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col
            v-for="(menu, index) in menuList"
            :key="`menu${index}`"
            v-if="!currentMenus.includes(menu.name)"
            cols="12"
          >
            <v-card
              :flat="!isSelected(menu.name)"
              class="mx-4 my-1"
            >
              <v-row
                no-gutters
                @click="onClickMenu(menu.name, index)"
              >
                <v-col cols="4">
                  <v-card-text class="pa-1">
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

        <v-card-actions>
          <v-spacer />

          <v-btn
            text
            color="brown"
            @click="onClickCancelBtn"
          >
            キャンセル
          </v-btn>

          <v-btn
            text
            color="brown"
            @click="onClickSaveBtn"
          >
            保存
          </v-btn>
        </v-card-actions>
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
    dialog: false,
    tagList: ['和食', '洋食', '中華', 'ごはん', 'おかず', 'おつまみ', '魚', '肉', '麺', 'スープ', 'サラダ', 'がっつり', 'ヘルシー'],
    menuList: [
      { name: 'メニュー1', tags: ['和食', 'ごはん'] },
      { name: 'メニュー2', tags: ['和食', 'おかず', 'ヘルシー', '魚'] },
      { name: 'メニュー3', tags: ['和食', 'おつまみ', 'ヘルシー', '肉'] },
      { name: 'メニュー4', tags: ['洋食', 'おつまみ', 'がっつり', '肉'] },
      { name: 'メニュー5', tags: ['洋食', 'おかず', '肉'] },
      { name: 'メニュー6', tags: ['中華', 'おかず', 'がっつり'] },
    ],
    selectedMenu: '',
    selectedDay: '',
    selectedDate: '',
    searchName: '',
    searchTags: []
  }),
  mounted() {
    this.setCurrentDate();
    this.setCurrentMonth();
    this.setCurrentWeek();
  },
  watch: {
    dialog: function() {
      this.selectedMenu = '';
      this.searchName = '';
      this.searchTags = [];
      this.menuList = [
        { name: 'メニュー1', tags: ['和食', 'ごはん'] },
        { name: 'メニュー2', tags: ['和食', 'おかず', 'ヘルシー', '魚'] },
        { name: 'メニュー3', tags: ['和食', 'おつまみ', 'ヘルシー', '肉'] },
        { name: 'メニュー4', tags: ['洋食', 'おつまみ', 'がっつり', '肉'] },
        { name: 'メニュー5', tags: ['洋食', 'おかず', '肉'] },
        { name: 'メニュー6', tags: ['中華', 'おかず', 'がっつり'] },
      ]
    }
  },
  computed: {
  },
  methods: {
    setCurrentDate() {
      this.currentDate = moment();
    },
    setCurrentMonth() {
      this.currentMonth = this.currentDate.format('M月');
    },
    setCurrentWeek() {
      let menus = [[],[],[],[],[],[],[]];
      let week = [];

      if (moment().format('YYY-MM-DD') === moment(this.currentDate).format('YYY-MM-DD')) {
        menus[0] = ['メニュー1', 'メニュー2', 'メニュー3', 'メニュー4'];
        menus[1] = ['メニュー1', 'メニュー2'];
      }

      [0, 1, 2, 3, 4, 5, 6].forEach(i => {
        const now = moment(this.currentDate);
        let date = now.add(i, "days");

        week.push({
          day: date.format('ddd'),
          date: date.format('DD'),
          menus: menus[i]
        });
      });

      this.currentWeek = week;
    },
    onClickPrevWeek() {
      this.currentDate = this.currentDate.subtract(7, "days");
      this.setCurrentMonth();
      this.setCurrentWeek(false);
    },
    onClickNextWeek() {
      this.currentDate = this.currentDate.add(7, "days");
      this.setCurrentMonth();
      this.setCurrentWeek(false);
    },
    onClickDate(index) {
      const week = this.currentWeek[index];
      this.selectedDay = week.day;
      this.selectedDate = week.date;
      this.currentMenus = week.menus;
      this.dialog = true;
    },
    onClickMenu(menu, index) {
      if(this.isSelected(menu)) {
        if(this.currentMenus.includes(menu)) {
          this.currentMenus.splice(index, 1);
        } else {
          this.currentMenus.push(menu);
        };
        this.selectedMenu = '';
      } else {
        this.selectedMenu = menu;
      };
    },
    isSelected(menu) {
      return menu === this.selectedMenu;
    },
    fetchTags(menu) {
      let tags = [];

      this.menuList.forEach(m => {
        if(menu === m.name) {
          tags = m.tags;
        }
      });

      return tags;
    },
    onClickFormTag(tag) {
      if (this.searchTags.includes(tag)) {
        const index = this.searchTags.indexOf(tag);
        this.searchTags.splice(index, 1);
      } else {
        this.searchTags.push(tag);
      };
    },
    onClickSearch() {
      if(this.searchName.length === 0 && this.searchTags.length === 0) {
        this.menuList = [
          { name: 'メニュー1', tags: ['和食', 'ごはん'] },
          { name: 'メニュー2', tags: ['和食', 'おかず', 'ヘルシー', '魚'] },
          { name: 'メニュー3', tags: ['和食', 'おつまみ', 'ヘルシー', '肉'] },
          { name: 'メニュー4', tags: ['洋食', 'おつまみ', 'がっつり', '肉'] },
          { name: 'メニュー5', tags: ['洋食', 'おかず', '肉'] },
          { name: 'メニュー6', tags: ['中華', 'おかず', 'がっつり'] },
        ]

        return;
      };

      let searchedMenuList = [];

      this.menuList.forEach(m => {
        let isHitSearchName = false;
        let isHitSearchTags = [];

        isHitSearchName = this.searchName.length === 0 || m.name.includes(this.searchName);

        this.searchTags.forEach(t => {
          if(m.tags.includes(t)) {
            isHitSearchTags.push(t);
          }
        });

        if(isHitSearchName && isHitSearchTags.length === this.searchTags.length) {
          searchedMenuList.push(m);
        }
      });

      this.menuList = searchedMenuList;
    },
    onClickCancelBtn() {
      this.dialog = false;
    },
    onClickSaveBtn() {
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
  display: inline-block;
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
