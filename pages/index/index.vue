<template>
	<view class="page-container">
		<view class="container">
			<u-toast ref="uToast" />
			<u-table>
				<u-tr>
					<u-th>#</u-th>
					<u-th>消费</u-th>
					<u-th>note</u-th>
				</u-tr>
				<u-tr>
					<u-td>{{item.type}}</u-td>
					<u-td>￥{{item.money}}</u-td>
					<u-td>所有消费</u-td>
				</u-tr>
			</u-table>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item: {
					type: '总计',
					money: 0
				}
			}
		},
		mounted() {
			this.getTotalMoney();
		},
		methods: {
			showToast(msg) {
				this.$refs.uToast.show(msg);
			},
			async getTotalMoney() {
				let data = await this.$myhttp({
					url: '/totalmoney',
				});
				this.item.money = data.data;
			},
			onPullDownRefresh() {
				this.getTotalMoney();
				this.showToast({
					title: '刷新成功',
					type: 'primary '
				});
				uni.stopPullDownRefresh();
			}
		},
	}
</script>

<style lang="scss" scoped>
	.page-container {}
</style>
