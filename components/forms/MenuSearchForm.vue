<template>
  <v-container class="pa-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card
          flat
          color="brown1"
        >
          <v-card-text class="pa-0">
            <v-chip
              v-for="(tag, index) in tags"
              :key="`menu-search-form-tag${index}`"
              :input-value="form.tags.includes(tag)"
              :ripple="false"
              small
              label
              filter
              outlined
              class="text-center ma-1 px-1"
              @click="onClickTag(tag)"
            >
              {{ tag.name }}
            </v-chip>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-text-field
          v-model="form.name"
          append-icon="mdi-magnify"
          dense
          hide-details
          placeholder="料理名"
          color="brown"
          class="mx-1"
          @click:append="onClickSearch"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'MenuSearchForm',
  data: () => ({
    searchedMenus: [],
    defaultMenus: [],
    form: {
      name: '',
      tags: [],
    },
  }),
  props: {
    menus: {
      type: Array,
      default: [],
    },
    tags: {
      type: Array,
      default: [],
    },
  },
  mounted() {
    this.defaultMenus = this.menus.map(menu => ({...menu}));
  },
  methods: {
    onClickTag(tag) {
      if (this.form.tags.includes(tag)) {
        const index = this.form.tags.indexOf(tag);
        this.form.tags.splice(index, 1);
      } else {
        this.form.tags.push(tag);
      };

      this.$emit('clickTag');
    },
    onClickSearch() {
      if(this.form.name.length === 0 && this.form.tags.length === 0) {
        this.$emit('search', this.defaultMenus);
        return;
      };

      this.searchedMenus = [];

      this.menus.forEach(m => {
        let isHitName = false;
        let isHitTags = [];

        isHitName = this.form.name.length === 0 || m.name.includes(this.form.name);

        this.form.tags.forEach(t => {
          if(m.tags.includes(t)) {
            isHitTags.push(t);
          };
        });

        if(isHitName && isHitTags.length === this.form.tags.length) {
          this.searchedMenus.push(m);
        };
      });

      this.$emit('search', this.searchedMenus);
    }
  }
}
</script>

<style scoped>
</style>
