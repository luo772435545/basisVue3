<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted } from "vue";

onMounted(() => {
  let element: HTMLElement = document.getElementById("chart") as HTMLElement;
  let myChart = echarts.init(element);
  myChart.setOption({
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: "line",
      },
    ],
  });
});
</script>

<template>
  <div id="chart" style="width: 600px; height: 400px"></div>
</template>

<style scoped lang="less"></style>
