<template>
  <v-container>
    <!-- <Doughnut
      :chart-data="chartData"
      :options="chartOptions"
    /> -->

    <Bar
      :chart-data="chartData"
      :options="chartOptions"
    />
  </v-container>
</template>

<script>
import { getFirestore, collection, query, orderBy, getDocs, where } from "firebase/firestore";

import Doughnut from "@/components/charts/Doughnut.vue";
import Bar from "@/components/charts/Bar.vue";

export default {
  name: 'TestPage',
  components: {
    Doughnut,
    Bar
  },
  data: () => ({
    image: require('@/assets/images/chef-hat.png'),
    tagsHash: {},
    menusHash: {},
    menuTablesHash: {},
    chartDataValues: [],
    chartColors: [],
    chartLabels: [],
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1500,
        easing: 'easeInOutCubic',
      },
      tooltips: {
        bodyFontSize: 12,
        callbacks: {
          label: function(tooltipItem, data) {
            let total = 0 // 合計格納
            let indexItem = data.datasets[0].data[tooltipItem.index] // マウスを当てたデータ
            // 全データの合計算出
            data.datasets[0].data.forEach(item => {
              total += item
            })
            // パーセント表示
            return Math.round(indexItem / total * 100) + ' %'
          }
        }
      }
    },
  }),
  async mounted() {
    // this.randomizeData();

    this.fetchAllTagsFromDB()
    await this.fetchAllMenusFromDB()
    await this.fetchMenuTablesFromDB()

    let data1 = {};
    let data2 = {};
    let data3 = {};
    Object.values(this.menuTablesHash).forEach(menuTable => {
      menuTable.menus?.forEach(menuID => {
        let menu = this.menusHash[menuID]
        menu?.tags?.forEach(tagID => {
          let tag = this.tagsHash[tagID]
          if (!data1[tagID]) {
            data1[tagID] = 0
          }
          if (!data2[tagID]) {
            data2[tagID] = ''
          }
          if (!data3[tagID]) {
            data3[tagID] = {}
          }
          data1[tagID]++
          data2[tagID] = tag.name
          data3[tagID] = { id: tagID, name: tag.name, count: data1[tagID] }
        })
      })
    })


    let data4 = Object.values(data3)
    data4.sort((a, b) => {
      if (a.count > b.count) {
        return -1
      }
    })
    let data5 = data4.map(d => d.count)
    let data6 = data4.map(d => d.name)

    // this.chartDataValues = Object.values(data1).sort((a, b) => a > b)
    // this.chartLabels = Object.values(data2).sort((a, b) => a > b)

    this.chartDataValues = data5
    this.chartLabels = data6
  },
  computed: {
    chartData() {
      return {
        datasets: [
          {
            label: [''],
            data: this.chartDataValues,
            backgroundColor: this.chartColors,
          },
        ],
        labels: this.chartLabels,
      };
    },
  },
  methods: {
    // randomizeData: function() {
    //   var data = [];
    //   for (var i = 0; i < this.chartLabels.length; i++) {
    //     data.push(Math.floor(Math.random() * 100));
    //   }
    //   this.chartDataValues = data;
    // },
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
    },
    async fetchAllMenusFromDB() {
      const querySnapshot = await getDocs(query(
        this.buildRef('menus'),
        orderBy('updatedAt', 'desc')
      ));

      querySnapshot.forEach((doc) => {
        this.menusHash[doc.id] = doc.data();
      });
    },
    async fetchMenuTablesFromDB() {
      const querySnapshot = await getDocs(query(
        this.buildRef('menu-tables'),
        where("yyyymmdd", ">=", '2023-06-01'),
        where("yyyymmdd", "<=", '2023-06-30')
      ));

      querySnapshot.forEach((doc) => {
        this.menuTablesHash[doc.data().yyyymmdd] = doc.data();
      });
    },
  }
}
</script>

<style scoped>
</style>
