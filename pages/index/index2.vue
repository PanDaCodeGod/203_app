<template>
	<view class="page-container">
		<view>
			<uni-card is-shadow v-for=" (item,index) in items" :extra="item.name" :title="item.date | dateFilter" :key="index"
			 @click="deleteThis(item._id)">
				消费了￥{{item.money}}元,用于: {{item.note}}
			</uni-card>
		</view>

		<!-- 悬浮按钮 -->
		<uni-fab :horizontal="'right'" :vertical="'bottom'" @fabClick="open" :popMenu="false"></uni-fab>
		<!-- 添加流水弹出框 -->
		<uni-popup ref="popup" type="dialog" class="popup-container" center>
			<view class="form">
				<form>
					<view class="uni-form-item uni-column">
						<input class="uni-input" type="text" name="input" v-model="bill.note" placeholder="事项" />
					</view>
					<view class="uni-form-item uni-column">
						<input class="uni-input" type="number" v-model="bill.money" name="input" placeholder="金额" />
					</view>
					<view class="uni-btn-v">
						<button @click="sumbit">确认</button>
					</view>
				</form>
			</view>
		</uni-popup>
		<!-- 添加删除确认框 -->
		<uni-popup ref="popup2" type="dialog" class="popup-container" center>
			<view class="deleteContainer">
				<view class="title">
					确定删除吗?
				</view>
				<view class="btn">
					<button @click="cancleDelete" type="default">取消</button>
					<button type="warn" @click="deleteOne(id)">确认</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 流水数据
				items: [],
				// 表单数据
				bill: {
					money: 0,
					note: 0
				},
				// 删除id
				id: ""
			}
		},
		mounted() {
			this.getBill();
		},
		methods: {
			// 添加弹出框
			open() {
				this.bill = {
					money: '',
					note: ''
				};
				this.$refs.popup.open();
			},
			// 删除弹出层
			deleteThis(id) {
				this.id = id;
				this.$refs.popup2.open();
			},
			cancleDelete() {
				this.$refs.popup2.close();
			},
			// 删除
			async deleteOne() {
				try {
					let data = await this.$myhttp({
						url: '/bill',
						method: 'DELETE',
						data: {
							id: this.id,
						},
					});
					uni.showToast({
						title: data.msg
					});
					await this.getBill();
					this.$refs.popup2.close();
				} catch (err) {
					uni.showToast({
						title: '删除失败'
					})
				}

			},
			// 请求账单数据
			async getBill() {
				let data = await this.$myhttp({
					url: '/bills'
				});
				this.items = data.data;
				return data;
			},
			// 添加流水
			async sumbit() {
				try {
					let data = await this.$myhttp({
						url: '/bill',
						method: 'POST',
						data: this.bill,
					});
					uni.showToast({
						title: data.msg
					});
					this.$refs.popup.close();
					await this.getBill();
				} catch (err) {
					uni.showToast({
						title: '添加失败'
					})
				}
			}
		},
		onPullDownRefresh() {
			const data = this.getBill();

			uni.stopPullDownRefresh();
		}
	}
</script>

<style lang="scss" scoped>
	.page-container {
		.add {
			text-align: center;

			.add-btn {
				width: 80%;
				color: rgb(255, 255, 255);
			}
		}
	}

	.popup-container {
		width: 100%;
		text-align: center;

		.form {
			box-sizing: border-box;
			width: 600rpx;
			border-radius: 15rpx;
			padding: 20rpx;
			background-color: rgb(255, 255, 255);
			text-align: center;

			.uni-form-item {
				margin: 10px 0;
				border: 1px solid #e0e0e0;
				border-radius: 10rpx;

				.uni-input {
					height: 66rpx;
				}
			}

			.uni-btn-v {
				margin: 15rpx auto;
				width: 50%;

				button {
					margin: 20rpx 0;
				}
			}

		}

		.deleteContainer {
			box-sizing: border-box;
			width: 600rpx;
			border-radius: 15rpx;
			padding: 20rpx;
			background-color: rgb(255, 255, 255);
			text-align: center;

			.title {
				padding: 80rpx 0;
			}

			.btn {
				display: flex;
				justify-content: space-around;
			}
		}

	}
</style>
