// uni请求封装
import http from './http.js'
import echarts from './u-charts.js'

export const vueExt = (vue) => {
	vue.prototype.$myhttp = http;
	vue.prototype.$echarts = echarts;
}
