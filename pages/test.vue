<template>
  <v-container>
    <v-card color="brown" width="270">
      <v-icon dark size=256>mdi-chef-hat</v-icon>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'TestPage',
  components: {
  },
  data: () => ({
    image: require('@/assets/images/chef-hat.png'),
  }),
  async mounted() {
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
