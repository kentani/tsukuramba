<template>
  <v-card flat>
    <v-row
      no-gutters
      align="center"
    >
      <v-col cols="6">
        <v-card-title class="pa-2 pr-0 text-body-2 brown--text font-weight-bold">{{ title }}</v-card-title>
      </v-col>

      <v-col cols="6">
        <v-card-text class="pa-2 pl-0">
          <v-img
            max-height="120"
            position="center center"
            :src="url"
            alt="OGP画像"
          ></v-img>
        </v-card-text>
      </v-col>

      <v-col cols="12">
        <v-card-text class="pa-2 py-0">
          {{ description }}
        </v-card-text>
      </v-col>

      <v-card-actions class="pa-0 pb-1">
        <v-spacer />

        <v-btn
          v-show="url.length > 0"
          text
          color="brown"
          @click="onClickOpenReference"
        >
          参考サイトを開く
        </v-btn>
      </v-card-actions>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'LinkCard',
  data: () => ({
  }),
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: '',
    },
  },
  computed: {
  },
  methods: {
    onClickOpenReference() {
      this.$emit('openReference');
    },
  }
}
</script>

<style scoped>
</style>
