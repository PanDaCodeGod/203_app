<script>
	import config from '@/config.js';
	export default {
		onLaunch: function() {
			// #ifdef APP-PLUS 
			// 热更新检测代码
			const username = uni.getStorageSync('user');
			plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
				uni.request({
					url: config.BASE_URL + '/app/update',
					data: {
						version: widgetInfo.version,
						name: widgetInfo.name,
						username
					},
					success: (result) => {
						var data = result.data;
						if (data.update && data.wgtUrl) {
							uni.downloadFile({
								url: data.wgtUrl,
								success: (downloadResult) => {
									if (downloadResult.statusCode === 200) {
										plus.runtime.install(downloadResult.tempFilePath, {
											force: false
										}, function() {
											console.log('install success...');
											plus.runtime.restart();
										}, function(e) {
											console.log(e);
											console.error('install fail...');
										});
									}
								}
							});
						}
					}
				});
			});
			// #endif
		},
		onShow: function() {
			console.log('app显示了')
		},
		onHide: function() {
			console.log('app隐藏了')
		}
	}
</script>

<style lang="scss">
	/* 引入通用样式 */
	@import url("@/static/css/common.css");

	@import "uview-ui/index.scss";
</style>
