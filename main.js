import Vue from 'vue'
import App from './App'
import {
	vueExt
} from './utils/'


Vue.config.productionTip = false


// 对vue进行拓展
vueExt(Vue);

import uView from "uview-ui";
Vue.use(uView);

// 过滤器
Vue.filter('dateFilter', function(val) {
	if (!val) return;
	const date = new Date(val);
	return date.getFullYear() + '-' + (Number(date.getMonth()) + 1) + '-' + date.getDate();
})

App.mpType = 'app'
const app = new Vue({
	...App
})

app.$mount()
