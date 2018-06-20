<style scoped>
.total-members {
  display: block;
  width: 90%;
  height: 300px;
  margin: 0 auto;
}

.luck-wheel {
  display: block;
  width: 90%;
  height: 300px;
  margin: 0 auto;
}
.chart-title {
  padding: 10px;
}
</style>

<template>
 <div>
   <h3 class="chart-title">总体数据</h3>
  <canvas class="total-members" id="totalMenbers"></canvas>
  <h3 class="chart-title">用户转盘抽奖数据</h3>
  <canvas class="luck-wheel" id="luckWheel"></canvas>
 </div>
</template>

<script>
export default {
  data() {
    return {
      totalData: [
        { genre: "今日签到", sold: 275 },
        { genre: "游戏充值", sold: 115 },
        { genre: "游戏下载", sold: 120 },
        { genre: "今日抽奖", sold: 350 },
        { genre: "今日登录", sold: 150 }
      ],
      luckWheelTotal: 150,
      initialLuckWheelData: [],
      luckWheelData: [
        {
          pricetype: "抽奖总数",
          value: 200
        },
        {
          pricetype: "未中奖",
          value: 60
        },
        {
          pricetype: "5积分",
          value: 20
        },
        {
          pricetype: "10积分",
          value: 10
        },
        {
          pricetype: "20积分",
          value: 10
        },
        {
          pricetype: "1房卡",
          value: 20
        },
        {
          pricetype: "8房卡",
          value: 5
        },
        {
          pricetype: "18房卡",
          value: 2
        },
        {
          pricetype: "38房卡",
          value: 1
        }
      ]
    };
  },
  async beforeMount() {},
  mounted() {
    this.$http
      .get("/admin/initOverView")
      .then(res => {
        console.log(res.data);
        const data = res.data;
        for (let i = 0; i < 9; i++) {
          if (i < 5) {
            this.totalData[i].sold = parseInt(data.totalData[i].value);
          }

          if (i === 0) {
            this.luckWheelData[i] = {
              pricetype: "抽奖总数",
              value: parseInt(data.luckWheelTotal)
            };
          } else {
            this.luckWheelData[i].value =parseInt(data.luckWheelData[i - 1].value);
          }
        }

        this.initCharts();
      })
      .catch(err => {
        console.log("initOverView", err);
      });
  },
  components: {},
  methods: {
    initData() {},
    initCharts() {
      let deviceWidth = window.innerWidth;
      let deviceHeight = window.innerHeight;
      const { totalData, luckWheelData, F2 } = this;
      console.log(luckWheelData)
      let Global = F2.Global;
      const totalChart = new F2.Chart({
        id: "totalMenbers",
        width: 0.9 * deviceWidth,
        height: 0.5 * deviceHeight,
        pixelRatio: window.devicePixelRatio // 指定分辨率
      });

      // Step 2: 载入数据源
      totalChart.source(totalData);

      totalData.map(function(obj) {
        totalChart.guide().text({
          position: [obj.genre, obj.sold],
          content: obj.sold,
          style: {
            textBaseline: "bottom",
            textAlign: "center"
          },
          offsetY: -2
        });
      });

      // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
      totalChart
        .interval()
        .position("genre*sold")
        .color("genre");

      // Step 4: 渲染图表
      totalChart.render();

      const luckWheel = new F2.Chart({
        id: "luckWheel",
        width: 0.9 * deviceWidth,
        height: 0.5 * deviceHeight,
        pixelRatio: window.devicePixelRatio // 指定分辨率
      });
      luckWheel.source(this.luckWheelData, {
        value: {
          tickCount: 5
        }
      });
      luckWheel.coord({
        transposed: true
      });
      luckWheel.axis("pricetype", {
        line: Global._defaultAxis.line,
        grid: null
      });
      luckWheel.axis("value", {
        line: null,
        grid: Global._defaultAxis.grid,
        label: function label(text, index, total) {
          var textCfg = {};
          if (index === 0) {
            textCfg.textAlign = "left";
          } else if (index === total - 1) {
            textCfg.textAlign = "right";
          }
          return textCfg;
        }
      });
      luckWheel.interval().position("pricetype*value")
      luckWheel.render();
    }
  }
};
</script>
