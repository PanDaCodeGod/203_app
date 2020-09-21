import Vue from 'vue'
import App from './App'
import {
	vueExt
} from './utils/'
Vue.config.productionTip = false

// 对vue进行拓展
vueExt(Vue);

// 过滤器
Vue.filter('dateFilter', function(val) {
	if (!val) return;
	const date=new Date(val)
	return date.getFullYear()+'年'+date.getMonth()+1+'月'+date.getDate()+'日';
})

App.mpType = 'app'
const app = new Vue({
	...App
})

app.$mount()
