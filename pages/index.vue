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
        v-for="(menuTable, index) in currentMenuTables"
        :key="menuTable.date"
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
                <div>{{ menuTable.date }}</div>
                <div class="pl-2 font-weight-bold">{{ menuTable.day }}</div>
              </v-card-title>
            </v-col>

            <v-col cols="9" style="height: 90%">
              <v-card
                flat
                rounded="lg"
                style="height: 100%;"
                color="brown1"
              >
                <v-row
                  no-gutters
                  align="center"
                  style="height: 100%; overflow-y: scroll;"
                >
                  <v-col>
                    <v-card-text class="px-0 text-body-1">
                      <ul>
                        <li
                          v-for="(menu, index) in menuTable.menus"
                          :key="`${menuTable.date}-${index}`"
                          class="pb-1"
                        >
                          {{ menu.name }}
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

    <menu-table-form
      :dialog="dialog"
      :day="currentMenuTable.day"
      :date="currentMenuTable.date"
      :menuTables="currentMenuTable.menus || []"
      :tags="tagList"
      :menus="menuList"
      @search="onClickMenuSearchFormSearch"
      @selectMenu="onClickMenuTableFormSelectMenu"
      @cancel="onClickMenuSearchFormCancel"
      @save="onClickMenuSearchFormSave"
    ></menu-table-form>
  </v-container>
</template>

<script>
import moment from "moment";
import { getFirestore, collection, query, where, orderBy, getDocs, doc, setDoc, updateDoc } from "firebase/firestore";

import MenuCard from '@/components/MenuCard.vue';
import MenuTableForm from '@/components/forms/MenuTableForm.vue';

export default {
  name: 'IndexPage',
  components: {
    MenuCard: MenuCard,
    MenuTableForm: MenuTableForm,
  },
  data: () => ({
    currentDate: '',

  components: { MenuTableForm }, currentMonth: '',
    currentWeek: [],
    dialog: false,
    tagsHash: {},
    menusHash: {},
    menuTablesHash: {},
    currentMenuTables: [],
    currentMenuTable: {},
    currentMenuTableIndex: null,
    defaultMenuTable: {},
    tagList: [],
    menuList: [],
  }),
  async mounted() {
    this.setCurrentDate();
    this.setCurrentMonth();
    this.setCurrentWeek();

    await this.fetchAllTagsFromDB();
    await this.fetchAllMenusFromDB();
    await this.fetchMenuTablesFromDB();
    this.setMenuTables();
  },
  methods: {
    //////////////////////
    // DB
    //////////////////////
    buildRef(name) {
      const db = getFirestore(this.$firebase);
      return collection(db, name);
    },
    async fetchAllTagsFromDB() {
      const querySnapshot = await getDocs(query(
        this.buildRef('tags'),
        orderBy('sort')
      ));

      querySnapshot.forEach((doc) => {
        this.tagsHash[doc.id] = doc.data();
      });

      this.tagList = Object.values(this.tagsHash);
    },
    async fetchAllMenusFromDB() {
      const querySnapshot = await getDocs(query(
        this.buildRef('menus'),
        orderBy('createdAt', 'desc')
      ));

      querySnapshot.forEach((doc) => {
        this.menusHash[doc.id] = doc.data();
      });

      this.setMenuList();
    },
    async fetchMenuTablesFromDB() {
      const now = moment(this.currentDate);
      const querySnapshot = await getDocs(query(
        this.buildRef('menu-tables'),
        where("yyyymmdd", ">=", now.format('YYYY-MM-DD')),
        where("yyyymmdd", "<=", now.add(6, 'days').format('YYYY-MM-DD'))
      ));

      querySnapshot.forEach((doc) => {
        this.menuTablesHash[doc.data().yyyymmdd] = doc.data();
      });
    },
    async updateMenuTable() {
      const db = getFirestore(this.$firebase);
      const docRef = doc(db, "menu-tables", this.currentMenuTable.id);

      await updateDoc(docRef, {
        menus: this.currentMenuTable.menus.map(m => m.id),
      });
    },
    async createMenuTable() {
      const db = getFirestore(this.$firebase);
      const docRef = doc(collection(db, "menu-tables"));

      await setDoc(docRef, {
        id: docRef.id,
        yyyymmdd: this.currentMenuTable.yyyymmdd,
        menus: this.currentMenuTable.menus.map(m => m.id),
      });
    },

    //////////////////////
    // 日付set
    //////////////////////
    setCurrentDate() {
      this.currentDate = moment();
    },
    setCurrentMonth() {
      this.currentMonth = this.currentDate.format('M月');
    },
    setCurrentWeek() {
      let week = [];

      [0, 1, 2, 3, 4, 5, 6].forEach(i => {
        const now = moment(this.currentDate);
        let date = now.add(i, "days");

        week.push({
          day: date.format('ddd'),
          date: date.format('DD'),
          yyyymmdd: date.format('YYYY-MM-DD'),
        });
      });

      this.currentWeek = week;
    },

    //////////////////////
    // 献立表set
    //////////////////////
    setMenuTables() {
      let currentMenuTables = [];

      this.currentWeek.forEach((week) => {
        const menuTable = this.menuTablesHash[week.yyyymmdd] || {};

        const menus = menuTable.menus?.map(menuID => {
          const menu = this.menusHash[menuID];

          return {
            ...menu,
            tags: menu.tags.map(tagID => this.tagsHash[tagID])
          };
        })

        currentMenuTables.push({
          ...week,
          id: menuTable.id,
          menus: menus,
        })
      });

      this.currentMenuTables = currentMenuTables;
    },
    setMenuList() {
      let menus = this.currentMenuTable.menus?.map(m => m.name) || [];
      menus = Object.values(this.menusHash)?.filter(m => !menus.includes(m.name));

      this.menuList = menus?.map(menu => {
        return {
          ...menu,
          tags: menu.tags?.map(tagID => this.tagsHash[tagID])
        };
      });
    },

    //////////////////////
    // イベントハンドラ
    //////////////////////
    async onClickPrevWeek() {
      this.currentDate = this.currentDate.subtract(7, "days");
      this.setCurrentMonth();
      this.setCurrentWeek();
      await this.fetchMenuTablesFromDB();
      this.setMenuTables();
    },
    async onClickNextWeek() {
      this.currentDate = this.currentDate.add(7, "days");
      this.setCurrentMonth();
      this.setCurrentWeek();
      await this.fetchMenuTablesFromDB();
      this.setMenuTables();
    },
    onClickDate(index) {
      this.currentMenuTable = this.currentMenuTables[index];
      this.setMenuList();
      this.currentMenuTableIndex = index;
      this.dialog = true;
    },
    onClickMenuSearchFormSearch(searchedMenus) {
      this.menuList = searchedMenus.map(menu => ({...menu}));
    },
    onClickMenuTableFormSelectMenu(menu) {
      this.defaultMenuTable = this.deepCopy(this.currentMenuTable);
      let menuTable = this.deepCopy(this.currentMenuTable);
      menuTable.menus = menuTable.menus || [];
      const index = menuTable.menus.map(m => m.id).indexOf(menu.id);

      if(index === -1) {
        menuTable.menus.push(menu);
      } else {
        menuTable.menus.splice(index, 1)
      }

      this.currentMenuTable = this.deepCopy(menuTable);
      this.setMenuList();
    },
    onClickMenuSearchFormCancel() {
      this.currentMenuTable = this.deepCopy(this.defaultMenuTable);
      this.currentMenuTableIndex = null;
      this.dialog = false;
    },
    onClickMenuSearchFormSave() {
      if(this.currentMenuTable.id) {
        // 更新
        this.currentMenuTables.splice(this.currentMenuTableIndex, 1, this.currentMenuTable);
        this.updateMenuTable();
      } else {
        // 作成
        this.currentMenuTables.splice(this.currentMenuTableIndex, 1, this.currentMenuTable);
        this.createMenuTable();
      }

      this.currentMenuTableIndex = null;
      this.dialog = false;
    },

    //////////////////////
    // その他
    //////////////////////
    deepCopy(obj) {
      return JSON.parse(JSON.stringify(obj))
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
