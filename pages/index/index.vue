<template>
	<view class="page-container">
		<uni-card is-shadow v-for="(item,index) in items" :title="item.type" :key="index">
			总共消费了￥{{item.money}}元
		</uni-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 金钱:
				items: {
					total: {
						type: '总计',
						money: 0
					}
				}
			}
		},
		mounted() {
			this.getTotalMoney();
		},
		methods: {
			async getTotalMoney() {
				let data = await this.$myhttp({
					url: '/totalmoney',
				});
				
				this.items.total.money = data.data || 0;
			},
			onPullDownRefresh() {
				this.getTotalMoney();
				uni.stopPullDownRefresh();
			}
		},
	}
</script>

<style scoped>

</style>
