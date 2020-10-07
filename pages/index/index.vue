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
					<u-td>
						<u-count-to :decimals="2" :font-size="28" bold :start-val="0" :end-val="item.money"></u-count-to>
					</u-td>
					<u-td>所有消费</u-td>
				</u-tr>
			</u-table>
		</view>
		<!-- 用户饼状图 -->
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
			<view class="qiun-title-dot-light">总消费饼状图</view>
		</view>
		<view class="qiun-charts">
			<canvas canvas-id="canvasPie" id="canvasPie" class="charts" @touchstart="touchPie"></canvas>
		</view>
	</view>
</template>
<script>
	// 保存全局this
	var _self;
	var canvaPie = null;
	export default {
		data() {
			return {
				// 分类统计数据
				item: {
					type: '总计',
					money: 0
				},
				// 当前用户的流水数据
				user_bills: [],

				// 图表数据
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				serverData: '',
			}
		},
		onLoad() {
			_self = this;
			this.cWidth = uni.upx2px(700);
			this.cHeight = uni.upx2px(466);
			this.getServerData();
		},
		mounted() {
			// 获取表格数据
			this.getTotalMoney();
			// 获取当前用户登录流水
			this.getBillByUser();
		},
		methods: {
			// 提示
			showToast(msg) {
				this.$refs.uToast.show(msg);
			},
			// 获取所有花费
			async getTotalMoney() {
				let data = await this.$myhttp({
					url: '/totalmoney',
				});
				this.item.money = data.data;
			},
			// 获取当前登录用户的流水
			async getBillByUser() {
				let data = await this.$myhttp({
					url: '/bills/user',
				});
				this.user_bills = data.data;
			},
			// 下拉刷新
			onPullDownRefresh() {
				this.getTotalMoney();
				this.getServerData();
				this.showToast({
					title: '刷新成功',
					type: 'primary '
				});
				uni.stopPullDownRefresh();
			},
			// 饼状图表区域
			async getServerData() {
				let data = await this.$myhttp({
					url: '/bills/pie',
				});
				let Pie = {
					series: []
				};
				Pie.series = data.data
				_self.showPie("canvasPie", Pie);
			},
			showPie(canvasId, chartData) {
				canvaPie = new this.$echarts({
					$this: _self,
					canvasId: canvasId,
					type: 'pie',
					fontSize: 11,
					legend: {
						show: true
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: true,
					extra: {
						pie: {
							lableWidth: 15
						}
					},
				});
			},
			touchPie(e) {
				canvaPie.showToolTip(e, {
					format: function(item) {
						return item.name + ':' + item.data
					}
				});
			},
		},
	}
</script>

<style lang="scss">
	.qiun-padding {
		padding: 2%;
		width: 96%;
	}

	.qiun-wrap {
		display: flex;
		flex-wrap: wrap;
	}

	.qiun-rows {
		display: flex;
		flex-direction: row !important;
	}

	.qiun-columns {
		display: flex;
		flex-direction: column !important;
	}

	.qiun-common-mt {
		margin-top: 10rpx;
	}

	.qiun-bg-white {
		margin-top: 50rpx;
		background: #FFFFFF;
	}

	.qiun-title-bar {
		width: 96%;
		padding: 10rpx 2%;
		flex-wrap: nowrap;
	}

	.qiun-title-dot-light {
		border-left: 10rpx solid #0ea391;
		padding-left: 10rpx;
		font-size: 32rpx;
		color: #000000
	}

	.qiun-charts {
		width: 700rpx;
		height: 466rpx;
		background-color: #FFFFFF;
	}

	.charts {
		width: 700rpx;
		height: 466rpx;
		background-color: #FFFFFF;
	}
</style>
