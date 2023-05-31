<template>
  <v-dialog
    v-model="dialog"
    persistent
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
            <div>{{ date }}</div>
            <div class="pl-2 font-weight-bold">{{ day }}</div>
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
          v-for="(menu, index) in menuTables"
          :key="`selected-menu${index}`"
          cols="12"
        >
          <menu-card
            :name="menu.name"
            :tags="menu.tags"
            :url="menu.url"
            :flat="!(menu.id === selectedMenuID)"
            class="mx-4 my-1"
            @clickMenu="onClickMenu(menu)"
          ></menu-card>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col cols="12">
          <v-card-text class="pa-2 pb-0 brown--text font-weight-bold">
            メニューリスト
          </v-card-text>
        </v-col>
      </v-row>

      <menu-search-form
        :menus="menus"
        :tags="tags"
        class="pt-0 pb-2 px-4"
        @search="onClickMenuSearchFormSearch"
      ></menu-search-form>

      <v-row no-gutters>
        <v-col
          v-for="(menu, index) in menus"
          :key="`menu${index}`"
          cols="12"
        >
          <menu-card
            :name="menu.name"
            :tags="menu.tags"
            :url="menu.url"
            :flat="!(menu.id === selectedMenuID)"
            class="mx-4 my-1"
            @clickMenu="onClickMenu(menu)"
          ></menu-card>
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
</template>

<script>
import MenuCard from '@/components/MenuCard.vue';
import MenuSearchForm from '@/components/forms/MenuSearchForm.vue';

export default {
  name: 'MenuTableForm',
  components: {
    MenuCard: MenuCard,
    MenuSearchForm: MenuSearchForm,
  },
  data: () => ({
    overlay: false,
    progress: 0,
    selectedMenuID: '',
    form: {
      name: '',
      image: '',
      url: '',
      tags: [],
    }
  }),
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    day: {
      type: String,
      require: true,
    },
    date: {
      type: String,
      require: true,
    },
    menuTables: {
      type: Array,
      default: [],
    },
    tags: {
      type: Array,
      default: [],
    },
    menus: {
      type: Array,
      default: [],
    },
  },
  methods: {
    onClickMenu(menu) {
      if(menu.id === this.selectedMenuID) {
        this.selectedMenuID = '';
        this.$emit('selectMenu', menu);
      } else {
        this.selectedMenuID = menu.id;
      };
    },
    onClickMenuSearchFormSearch(searchedMenus) {
      this.$emit('search', searchedMenus);
    },
    onClickCancelBtn() {
      this.close();
      this.$emit('cancel');
    },
    onClickSaveBtn() {
      this.close();
      this.$emit('save', this.form);
    },
    close() {
      this.resetForm();
      this.overlay = false;
    },
    resetForm() {
      this.form = {
        name: '',
        image: '',
        url: '',
        tags: [],
      }
    },
    delay(n){
      return new Promise(function(resolve) {
          setTimeout(resolve, n*1000);
      });
    }
  }
}
</script>

<style scoped>
</style>
