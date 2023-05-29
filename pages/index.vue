<template>
  <v-container>
    <v-row
      no-gutters
      align="center"
    >
      <v-col cols="12">
        <v-card
          flat
          color="brown1"
        >
          <v-card-title class="justify-center pa-0 text-h4 font-weight-bold brown--text">
            {{ currentMonth }}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <v-row
      no-gutters
      align="center"
    >
      <v-col
        v-for="date in currentWeek"
        :key="date.date"
        cols="12"
      >
        <v-card
          flat
          height="150"
          color="brown1"
        >
          <v-row
            no-gutters
            align="center"
            style="height: 100%"
          >
            <v-col cols="3">
              <v-card-title class="pa-0 text-h5 brown--text">
                <div>{{ date.date }}</div>
                <div class="pl-2 font-weight-bold">{{ date.day }}</div>
              </v-card-title>
            </v-col>

            <!-- <v-col cols="1">
              <v-card-title class="pa-0 text-h5 font-weight-bold brown--text">
                {{ date.day }}
              </v-card-title>
            </v-col> -->

            <v-col cols="9" style="height: 90%">
              <v-card
                flat
                rounded="lg"
                style="height: 100%;"
                color="brown1"
              >
              <!-- <v-card outlined rounded="xl" class="ml-2" style="height: 100%;"> -->
                <v-row no-gutters align="center" style="height: 100%; overflow-y: scroll;">
                  <v-col>
                    <v-card-text class="px-0 text-body-1">
                      <ul>
                        <li
                          v-for="(menu, index) in date.menus"
                          :key="`${date.date}-${index}`"
                          class="pb-1"
                        >
                          {{ menu }}
                        </li>
                      </ul>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from "moment";

export default {
  name: 'IndexPage',
  data: () => ({
    currentDate: '',
    currentMonth: '',
    currentWeek: []
  }),
  mounted() {
    this.currentDate = moment();
    this.currentMonth = this.currentDate.format('M月');
    this.currentWeek = [
      { day: '月', date: '29', menus: ['メニュー1', 'メニュー2', 'メニュー3', 'メニュー4'] },
      { day: '火', date: '30', menus: ['メニュー1', 'メニュー2'] },
      { day: '水', date: '31', menus: ['メニュー1', 'メニュー2'] },
      { day: '木', date: '01', menus: ['メニュー1', 'メニュー2', 'メニュー3', 'メニュー4', 'メニュー5'] },
      { day: '金', date: '02', menus: ['メニュー1', 'メニュー2', 'メニュー3'] },
      { day: '土', date: '03', menus: ['メニュー1', 'メニュー2'] },
      { day: '日', date: '04', menus: ['メニュー1', 'メニュー2', 'メニュー3'] },
    ]

    console.log('0', this.currentDate.format('DD'))
    console.log('1', this.currentDate.day(1).format('DD'))
    console.log('2', this.currentDate.day(2).format('DD'))

  },
  methods: {

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
  display:inline-block;
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
