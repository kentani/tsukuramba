<template>
  <v-container class="pt-0">
    <v-row
      no-gutters
      justify="space-around"
      align="center"
    >
      <v-col cols="3">
        <div class="text-center text-caption brown--text">メニュー数</div>
        <div class="text-center text-h6 brown--text font-weight-bold">{{ menuCount }}</div>
      </v-col>

      <v-col cols="4" class="text-center">
        <v-btn
          outlined
          block
          small
          color="brown"
          class="my-2"
          @click="onClickAddMenu"
        >
          <v-icon>mdi-plus</v-icon>メニュー
        </v-btn>
      </v-col>

      <v-col cols="4" class="text-center">
        <v-btn
          outlined
          block
          small
          disabled
          color="brown"
          class="my-2"
          @click="onClickAddTag"
        >
        <v-icon>mdi-plus</v-icon>タグ
        </v-btn>
      </v-col>
    </v-row>

    <v-divider class="mx-1"></v-divider>

    <menu-search-form
      :key="`menu-search-form-${fetchedData}`"
      :menus="menuList"
      :tags="tagList"
      :loaded="fetchedData"
      class="my-2"
      @search="onClickMenuSearchFormSearch"
    ></menu-search-form>

    <v-row v-if="fetchedData" no-gutters>
      <v-col
        v-for="(menu, index) in menuList"
        :key="`menu${index}`"
        cols="12"
        class="my-1"
      >
        <menu-card
          :name="menu.name"
          :tags="menu.tags"
          :url="menu.url"
          :flat="!(menu.id === selectedMenuID)"
          :loaded="fetchedData"
          @clickMenu="onClickMenu(menu)"
        ></menu-card>
      </v-col>
    </v-row>

    <v-row v-else no-gutters>
      <v-col
        v-for="num in [1,2,3,4,5,6,7,8,9,10]"
        :key="`menu${num}`"
        cols="12"
        class="my-1"
      >
        <menu-card
          name="none"
          :tags="[]"
          url="none"
          :loaded="fetchedData"
        ></menu-card>
      </v-col>
    </v-row>

    <menu-form
      ref="menuForm"
      :dialog="menuFormDialog"
      :tags="tagList"
      :menu="selectedMenu"
      @cancel="onClickMenuFormCancel"
      @save="onClickMenuFormSave"
    ></menu-form>
  </v-container>
</template>

<script>
import { getFirestore, collection, query, orderBy, getDocs, doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";

import MenuCard from '@/components/MenuCard.vue';
import MenuForm from '@/components/forms/MenuForm.vue';
import MenuSearchForm from '@/components/forms/MenuSearchForm.vue';

export default {
  name: 'MenusPage',
  components: {
    MenuCard: MenuCard,
    MenuForm: MenuForm,
    MenuSearchForm: MenuSearchForm,
  },
  data: () => ({
    menuFormDialog: false,
    tagFormDialog: false,
    tagsHash: {},
    menusHash: {},
    tagList: [],
    menuList: [],
    formData: null,
    selectedMenuIndex: null,
    selectedMenuID: null,
    selectedMenu: {},
    fetchedData: false,
    menuCount: 0,
    beforeMenuCount: 0,
    afterMenuCount: 0,
  }),
  async mounted() {
    this.fetchAllTagsFromDB();
    await this.fetchAllMenusFromDB();
    this.fetchedData = true;
    this.setMenuCount();
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
        orderBy('updatedAt', 'desc')
      ));

      querySnapshot.forEach((doc) => {
        this.menusHash[doc.id] = doc.data();
      });

      this.setMenuList();
    },
    async updateMenu(form) {
      const db = getFirestore(this.$firebase);
      const docRef = doc(db, "menus", form.id);

      let tags = {};
      this.tagList.map(tag => {
        tags[tag.name] = tag.id;
      });

      this.formData = {
        id: docRef.id,
        name: form.name,
        imageName: form.imageName,
        url: form.url,
        tags: form.tags.map(tagName => tags[tagName]),
        updatedAt: serverTimestamp(),
      }

      await updateDoc(docRef, this.formData);
    },
    async createMenu(form) {
      const db = getFirestore(this.$firebase);
      const docRef = doc(collection(db, "menus"));

      let tags = {};
      this.tagList.map(tag => {
        tags[tag.name] = tag.id;
      });

      this.formData = {
        id: docRef.id,
        name: form.name,
        imageName: form.imageName,
        url: form.url,
        tags: form.tags.map(tagName => tags[tagName]),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }

      await setDoc(docRef, this.formData);
    },

    //////////////////////
    // イベントハンドラ
    //////////////////////
    onClickAddMenu() {
      this.menuFormDialog = true;
    },
    onClickMenuFormCancel() {
      this.resetForm();
      this.menuFormDialog = false;
    },
    onClickMenuFormSave(form) {
      if (form.isEdit) {
        // 更新
        this.updateMenu(form);

        const menus = this.menuList.map(m => m.id);
        const index = menus.indexOf(form.id);

        this.menuList.splice(index, 1, {
          ...this.formData,
          tags: this.formData.tags.map(tagID => this.tagsHash[tagID]),
          updatedAt: serverTimestamp(),
        })
      } else {
        // 作成
        this.createMenu(form);

        this.menuList.unshift({
          ...this.formData,
          tags: this.formData.tags.map(tagID => this.tagsHash[tagID]),
        })
      };

      this.resetForm();
      this.menuFormDialog = false;
    },
    onClickMenu(menu) {
      if(menu.id === this.selectedMenuID) {
        this.selectedMenu = this.deepCopy(menu);
        this.selectedMenu.tags = this.selectedMenu.tags.map(tag => tag.name);
        this.selectedMenu = Object.assign({}, this.selectedMenu);
        this.menuFormDialog = true;
        this.$refs.menuForm.setForm(this.selectedMenu);
      } else {
        this.selectedMenuID = menu.id;
      };
    },
    onClickAddTag() {
      this.tagFormDialog = true;
    },
    onClickTagFormCancel() {
      this.tagFormDialog = false;
    },
    onClickTagFormSave() {
      this.tagFormDialog = false;
    },
    async onClickMenuSearchFormSearch(searchedMenus) {
      this.menuList = await searchedMenus.map(menu => ({...menu}));
      this.setMenuCount();
    },

    //////////////////////
    // 献立表set
    //////////////////////
    setMenuList() {
      this.menuList = Object.values(this.menusHash).map(menu => {
        return {
          ...menu,
          tags: menu.tags?.map(tagID => this.tagsHash[tagID])
        };
      });
    },
    setMenuCount() {
      let start, end;
      this.beforeMenuCount = this.menuCount;
      this.afterMenuCount = this.menuList.length;
      const isReverse = (this.beforeMenuCount > this.afterMenuCount);

      if (isReverse) {
        start = this.afterMenuCount;
        end = this.beforeMenuCount;
      } else {
        start = this.beforeMenuCount;
        end = this.afterMenuCount;
      }

      const numList = new Array(end - start + 1).fill(null).map((_, i) => i + start);
      if (isReverse) { numList.reverse(); }

      (async () => {
        for(let i of numList) {
          await this.sleep(10);
          this.menuCount = i;
        }
      })();
    },

    //////////////////////
    // その他
    //////////////////////
    deepCopy(obj) {
      return JSON.parse(JSON.stringify(obj))
    },
    resetForm() {
      this.formData = null;
      this.selectedMenu = null;
      this.selectedMenuID = null;
    },
    sleep(time) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, time);
      });
    }
  }
}
</script>

<style scoped>
</style>
