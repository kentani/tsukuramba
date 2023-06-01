<template>
  <v-card :flat="flat" :elevation="elevation" :outlined="outlined">
    <v-row
      no-gutters
      @click="onClickMenu"
    >
      <v-col cols="4">
        <v-card-text class="pa-1">
          <v-img
            height="75"
            width="100"
            position="center center"
            :src="url || defaultImage"
            alt="料理画像"
          ></v-img>
        </v-card-text>
      </v-col>

      <v-col cols="8">
        <v-row
          no-gutters
          justify="center"
          align="center"
          style="height: 100%;"
        >
          <v-col cols="12" class="pt-1 pb-0 px-1">
            <span class="brown--text font-weight-bold">{{ name || '料理名' }}</span>
          </v-col>

          <v-col cols="12" class="pt-0 pb-1">
            <v-chip
              v-for="(tag, index) in sortedTags"
              :key="`tag${index}`"
              x-small
              label
              outlined
              :ripple="false"
              class="py-2 px-1 mx-1 text-center"
            >
              {{ tag.name }}
            </v-chip>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'MenuCard',
  data: () => ({
    defaultImage: require('@/assets/images/pasta.png'),
  }),
  props: {
    name: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      default: [],
    },
    url: {
      type: String,
      default: '',
    },
    flat: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    sortedTags() {
      return this.tags.sort((a, b) => {
        return a.sort < b.sort;
      });
    },
    elevation() {
      return this.flat ? 0 : 8;
    },
    outlined() {
      return false;
    }
  },
  methods: {
    onClickMenu() {
      this.$emit('clickMenu');
    },
  }
}
</script>

<style scoped>
</style>
