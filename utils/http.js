const BASE_URL = 'http://localhost:203';
export default (options) => {
	return new Promise((reslove, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			data: options.data || data,
			success: (res) => {
				if (res.data.statusCode != 0) {
					return uni.showToast({
						title: '数据请求失败'
					})
					reslove(res.data.data);
				}
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
