const BASE_URL = 'http://192.168.50.147:203';
// const BASE_URL = 'http://192.168.50.220:203';
// const BASE_URL = 'http://localhost:203';
// const BASE_URL = 'http://101.200.220.169:203/';
export default (options) => {
	return new Promise((reslove, reject) => {
		// 从localStorage中取出token
		let token = uni.getStorageSync('token');
		uni.request({
			header: {
				'Authorization': 'Bearer ' + token
			},
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			success: (res) => {


				if (res.data.node_coode == -1) {
					uni.showToast({
						title: '请重新登录'
					})
					return uni.redirectTo({
						url: '/pages/user/login'
					});
				}

				if (res.data.node_coode == -2) {
					uni.showToast({
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
