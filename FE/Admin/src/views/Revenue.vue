<template>
    <div style="background-color: #100c2a" class="text-end p-2">
        <select name="" id="" v-model="selectedYear" @change="updateChart">
            <option :value="year" v-for="year in resultYear">{{ year }}</option>
        </select>
    </div>
    <v-chart v-if="dataLoaded" class="chart" :option="option" :autoresize="true" :key="autoresizeKey" />
</template>

<script setup>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, provide, onMounted, watch } from 'vue';

import InvoiceService from '@/services/invoice.service';

use([CanvasRenderer, BarChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent]);

provide(THEME_KEY, 'dark');
let month = Array(12).fill(0);
const dataLoaded = ref(false);
let maxyear = 0; //Math.max(array)
let minyear = Infinity; //Math.max(array)
let dateNow = new Date();
let selectedYear = ref(dateNow.getFullYear());
watch(selectedYear, (newVal, oldVal) => {
    getRevenue();
});
let option = ref({
    title: {
        text: 'Doanh thu',
        left: 'center',
    },
    tooltip: {
        trigger: 'axis', // Use 'axis' trigger for bar chart
        formatter: function (params) {
            // 'params' contains information about the tooltip data
            const xAxisValue = params[0].name; // Assuming the x-axis label is used in the tooltip
            const yAxisValue = params[0].value; // Assuming there's only one series
            const formattedYAxisValue = yAxisValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Format the yAxisValue

            // Return the formatted tooltip content
            return `${xAxisValue} : ${formattedYAxisValue} ₫`;
        },
    },

    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
    },
    xAxis: {
        type: 'category',
        data: [...Array(12).keys()].map((i) => i + 1),
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: function (value) {
                // Use 'en-US' locale to format the value with a period as the thousands separator
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' ₫';
            },
        },
    },
    series: [
        {
            name: 'Traffic',
            type: 'bar',
            data: month,
        },
    ],
});

const getRevenue = async () => {
    try {
        const revenue = await InvoiceService.getRevenue();

        if (revenue) {
            autoresizeKey++;
            getMaxAndMin(revenue);
        }
        month = Array(12).fill(0);
        await revenue.map((item) => {
            if (item._id.year == parseInt(selectedYear._value)) {
                const _month = parseInt(item._id.month);
                month[_month - 1] = parseInt(item.totalRevenue);
            }
        });
        // maxyear = Math.max(...revenue._id.year);
        option.value.series[0].data = month;
        ++autoresizeKey;
        dataLoaded.value = true;
    } catch (error) {
        console.log(error);
    }
};
let resultYear = [];
const getMaxAndMin = (array) => {
    array.map((item) => {
        if (item._id.year > maxyear) {
            maxyear = item._id.year;
        }
        if (item._id.year < minyear) {
            minyear = item._id.year;
        }
        resultYear = [];

        for (let i = minyear; i <= maxyear; i++) {
            resultYear.push(i);
        }
    });
};
let autoresizeKey = 1;

onMounted(() => {
    document.title = 'Revenue';
    autoresizeKey++;
    getRevenue();
});
</script>

<style scoped lang="scss">
.chart {
    height: 82vh;
}
</style>
