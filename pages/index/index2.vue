<template>
	<view class="page-container">
		<uni-card is-shadow v-for="(item,index) in items" :extra="item.name" :title="item.date" :key="index">
			消费了￥{{item.money}}元,用于: {{item.note}}
		</uni-card>
		<!-- 悬浮按钮 -->
		<uni-fab :horizontal="'right'" :vertical="'bottom'" @fabClick="open" :popMenu="false"></uni-fab>
		<!-- 弹出框 -->
		<uni-popup ref="popup" class="popup-container" center>
			<view class="form">
				<!-- @submit="formSubmit" -->
				<form>
					<view class="uni-form-item uni-column">
						<input class="uni-input" type="number" name="input" placeholder="金额" />
					</view>
					<view class="uni-form-item uni-column">
						<input class="uni-input" type="text" name="input" placeholder="事项" />
					</view>

					<view class="uni-btn-v">
						<!-- form-type="submit" -->
						<button>添加</button>
					</view>
				</form>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import MR from '@/utils/http.js'
	export default {
		data() {
			return {
				items: []
			}
		},
		mounted() {
			this.$nextTick(function() {
				this.getBill();
			})
		},
		methods: {
			// 弹出框
			open() {
				this.$refs.popup.open();
			},
			// 请求账单数据
			getBill() {
				var that = this;
				MR.request('/bill', null, null, function(data) {
					console.log(data.data);
					this.items = data.data;
				});
			}
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
	}
</style>
