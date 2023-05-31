<template>
  <v-container class="pt-0">
    <v-row
      no-gutters
      justify="space-around"
      align="center"
    >
      <v-col cols="3">
        <div class="text-center text-caption brown--text">メニュー数</div>
        <div class="text-center text-caption brown--text font-weight-bold">{{ menuList.length }}</div>
      </v-col>

      <v-col cols="4" class="text-center">
        <v-btn
          outlined
          small
          block
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
          small
          block
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
      :menus="menuList"
      :tags="tagList"
      class="my-2"
      @search="onClickMenuSearchFormSearch"
    ></menu-search-form>

    <v-row no-gutters>
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
          @clickMenu="onClickMenu(menu)"
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
import { getFirestore, collection, query, orderBy, getDocs, doc, setDoc, updateDoc } from "firebase/firestore";

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
  }),
  async mounted() {
    await this.fetchAllTagsFromDB();
    await this.fetchAllMenusFromDB();
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
      const querySnapshot = await getDocs(this.buildRef('menus'));

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
        url: form.url,
        tags: form.tags.map(tagName => tags[tagName]),
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
        url: form.url,
        tags: form.tags.map(tagName => tags[tagName]),
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
          tags: this.formData.tags.map(tagID => this.tagsHash[tagID])
        })
      } else {
        // 作成
        this.createMenu(form);

        this.menuList.push({
          ...this.formData,
          tags: this.formData.tags.map(tagID => this.tagsHash[tagID])
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
    onClickMenuSearchFormSearch(searchedMenus) {
      this.menuList = searchedMenus.map(menu => ({...menu}));
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
  }
}
</script>

<style scoped>
</style>
