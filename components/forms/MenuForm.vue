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
      <v-card-title class="px-4 text-body-1 brown--text font-weight-bold">
        {{ title }}
      </v-card-title>

      <v-card-text class="px-2 pb-0">
        <v-container>
          <v-row>
            <v-col cols="10">
              <v-text-field
                v-model="form.name"
                label="料理名"
                color="brown"
                dense
                hide-details
                @change="onChangeName"
              ></v-text-field>
            </v-col>

            <v-col cols="2">
              <v-file-input
                show-size
                label="料理画像"
                color="brown"
                dense
                hide-details
                hide-input
                @change="onChangeImage"
              ></v-file-input>
            </v-col>

            <v-col cols="12">
              <v-autocomplete
                v-model="form.tags"
                :items="tags.map(t => t.name)"
                chips
                small-chips
                label="タグ"
                color="brown"
                item-color="brown"
                multiple
              ></v-autocomplete>
            </v-col>

            <v-col cols="12" class="py-0">
              <div class="text-body-2">イメージ</div>
            </v-col>

            <v-col cols="12">
              <menu-card
                :name="form.name || '料理名'"
                :tags="tags.filter(t => form.tags.includes(t.name))"
                :url="form.url"
              ></menu-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

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

      <v-overlay
        absolute
        opacity="0.5"
        :value="overlay"
      >
        <v-progress-circular
          :rotate="-90"
          :size="50"
          :width="5"
          :value="progress"
          color="brown"
        ></v-progress-circular>
      </v-overlay>
    </v-card>
  </v-dialog>
</template>

<script>
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

export default {
  name: 'MenuForm',
  data: () => ({
    overlay: false,
    progress: 0,
    form: {
      id: null,
      name: '',
      imageName: '',
      image: '',
      url: '',
      tags: [],
      isEdit: false,
    }
  }),
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: Array,
      default: [],
    },
  },
  computed: {
    title() {
      return this.form.isEdit ? 'メニューの編集' : 'メニューの追加';
    }
  },
  methods: {
    //////////////////////
    // イベントハンドラ
    //////////////////////
    onChangeName() {
      this.$emit('changeName', this.form.name);
    },
    onChangeImage(file) {
      if (!file) return;

      this.overlay = true;
      this.form.image = file;
      const storage = getStorage();
      const imageRef = ref(storage, file.name);
      this.progress = 30;

      uploadBytes(imageRef, file).then(() => {
        this.progress = 70;

        getDownloadURL(imageRef).then(async (url) => {
          this.form.url = url;
          this.form.imageName = file.name;
          this.progress = 100;
          await this.delay(1);
          this.overlay = false;
        });
      });
    },
    onClickCancelBtn() {
      if (!this.form.isEdit && this.form.url?.length > 0) {
        const storage = getStorage();
        const imageRef = ref(storage, this.form.imageName);

        deleteObject(imageRef);
      };

      this.$emit('cancel');
      this.close();
    },
    onClickSaveBtn() {
      this.$emit('save', this.form);
      this.close();
    },

    //////////////////////
    // その他
    //////////////////////
    close() {
      this.resetForm();
      this.overlay = false;
    },
    setForm(menu) {
      if (menu['id']) {
        let data = {
          ...menu,
          isEdit: true,
        }

        this.form = Object.assign({}, data);
      }
    },
    resetForm() {
      this.form = {
        name: '',
        image: '',
        imageName: '',
        url: '',
        tags: [],
        isEdit: false,
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
