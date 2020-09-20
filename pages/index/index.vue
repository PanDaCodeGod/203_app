<template>
	<view class="page-container">
		<uni-card is-shadow v-for="(item,index) in items" :title="item.type" :key="index">
			总共消费123了￥{{item.money}}元
		</uni-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 金钱:
				items: {
					year: {
						type: '年度',
						money: 999
					},
					month: {
						type: '月度',
						money: 12
					}
				}
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			async init() {
				let data = await this.$myhttp({
					url: '/user/login',
					method: 'POST',
					data: {

						name: 'ppap',
						password: 321
					},
				});
				uni.showToast({
					title: data.msg
				})
				// 登录成功,把token存入客户端
				localStorage.setItem('token', data.data.token);
			}
		},
	}
</script>

<style scoped>

</style>
