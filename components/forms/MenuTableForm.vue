<template>
  <v-dialog
    v-model="dialog"
    persistent
    scrollable
    fullscreen
  >

    <v-card
      flat
      color="brown1"
    >

      <v-card-title class="pt-2 pb-0 justify-center text-h5 brown--text">
        <div>{{ date }}</div>
        <div class="pl-2 font-weight-bold">{{ day }}</div>
      </v-card-title>

      <v-card-text
        id="scroll-target"
        class="scroll-area px-2"
        v-scroll:#scroll-target="handleScroll"
      >
        <v-card
          flat
          color="brown1"
        >
          <v-card-subtitle class="px-2 pb-1 text-body-2 brown--text font-weight-bold d-flex">
            <div>献立</div>
            <div class="pl-2 text-body-2 font-weight-bold">{{ menuTables.length }}</div>
          </v-card-subtitle>

          <v-card-text
            class="px-0 pb-2"
          >
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
                  :loaded="fetchedData"
                  class="mx-4 my-1"
                  @clickMenu="onClickMenu(menu)"
                ></menu-card>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-subtitle class="px-2 pb-1 text-body-2 brown--text font-weight-bold d-flex">
            <div>メニューリスト</div>
            <div class="pl-2 text-body-2 font-weight-bold">{{ menus.length }}</div>
          </v-card-subtitle>

          <v-card-text
            class="pa-0"
          >
            <menu-search-form
              :key="`menu-search-form-${fetchedData}`"
              :menus="menus"
              :tags="tags"
              :loaded="fetchedData"
              class="pt-0 pb-2 px-2"
              @search="onClickMenuSearchFormSearch"
            ></menu-search-form>
          </v-card-text>

          <v-card-text
            class="px-0 pb-2"
            style="height: 600px;"
          >
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
                  :loaded="fetchedData"
                  class="mx-4 my-1"
                  @clickMenu="onClickMenu(menu)"
                ></menu-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-card-text>

      <v-fab-transition>
        <v-btn
          v-show="buttonActive"
          fab
          dark
          small
          absolute
          right
          color="brown"
          style="bottom: 50px; position: fixed;"
          @click="onClickTopBtn"
        >
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
      </v-fab-transition>

      <v-card-actions class="px-2 pt-0">
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
          class="font-weight-bold"
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
    buttonActive: false,
    scroll: 0,
    overlay: false,
    progress: 0,
    selectedMenuID: '',
    form: {
      name: '',
      image: '',
      url: '',
      tags: [],
    },
    val: null,
  }),
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    fetchedData: {
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
  computed: {
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
          setTimeout(resolve, n);
      });
    },
    sleep(time) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, time);
      });
    },
    handleScroll(e) {
      const top = 200;
      this.scroll = e.target.scrollTop;
      this.val = e;
      if (top <= this.scroll) { // 200px以上スクロールした場合のみボタンを表示
        this.buttonActive = true
      } else {
        this.buttonActive = false
      }
    },
    onClickTopBtn() {
      const numList = new Array(this.val.target.scrollTop).fill(null).map((_, i) => i + 0).reverse();

      numList.forEach(num => {
        this.val.target.scrollTop = num;
      });

      // (async () => {
      //   for(let i of numList) {
      //     await this.sleep(0.1);
      //     this.val.target.scrollTop = i;
      //   }
      // })();
    }
  }
}
</script>

<style scoped>
.scroll-area {
   height: auto;
   overflow-y: hidden;
 }
</style>
