// const BASE_URL = 'http://192.168.50.147:203';
const BASE_URL = 'http://localhost:203';
export default (options) => {
	return new Promise((reslove, reject) => {
		// 从localStorage中取出token
		const token = localStorage.getItem('token');
		uni.request({
			header:{ 'Authorization' : 'Bearer ' + (token||'')},
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			success: (res) => {
				if (res.data.code != 0) {
					return uni.showToast({
						title: '数据请求失败'
					})
				}
				reslove(res.data);
			},
			fail: (err) => {
				uni.showToast({
					title: '接口出现了异常'
				})
				reject(err);
			}
		})
	})
}
