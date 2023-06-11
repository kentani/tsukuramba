<script>
import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted() {
    this.addPlugin({
      afterDraw(chart, go) {
        let ctx = chart.ctx
        chart.data.datasets.forEach((dataset, i) => {
          let dataSum = 0
          dataset.data.forEach((element) => {
            dataSum += element
          })

          let meta = chart.getDatasetMeta(i)
          if (!meta.hidden) {
            meta.data.forEach(function (element, index) {
              // フォントの設定
              let fontSize = 7
              let fontStyle = 'normal'
              let fontFamily = 'Helvetica Neue'
              ctx.fillStyle = '#000'
              // 設定を適用
              ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily)

              // ラベルをパーセント表示に変更
              let labelString = chart.data.labels[index]
              let dataString = (Math.round(dataset.data[index] / dataSum * 100)).toString() + '%'

              // positionの設定
              ctx.textAlign = 'center'
              ctx.textBaseline = 'middle'

              let padding = -2
              let position = element.tooltipPosition()
              // ツールチップに変更内容を表示
              ctx.fillText(labelString, position.x, position.y - (fontSize / 2) - padding) // title
              ctx.fillText(dataString, position.x, position.y + (fontSize / 2) - padding)  // データの百分率

              // 凡例の位置調整
              // let legend = chart.legend
              // legend.top = chart.height - (legend.height / 2) - (legend.top / 2)
            })
          }
        })
      }
    })
    this.renderChart(this.chartData, this.options)
  }
}
</script>
