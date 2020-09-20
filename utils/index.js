// uni请求封装
import http from './http.js'

export const vueExt = (vue) => {
	vue.prototype.$http = http;
}
