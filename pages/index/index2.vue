<template>
	<view class="page-container">
		<view class="container">
			<u-toast ref="uToast" />
			<u-modal v-model="deleteshow" @confirm="deleteConfirm" :show-title="false" :show-cancel-button="true" :content="'确定删除该条记录?'"></u-modal>
			<view class="nav-bar">
				<u-button type="primary" @click="openaddBill">添加流水</u-button>
			</view>
			<view class="bill-container">
				<u-card v-for="(item,index) in items" :key="index" :title="item.name" :title-color="'#2979FF'" :sub-title="item.createtime|dateFilter">
					<view class="note-money" slot="body">
						<text class="note">{{item.note}}</text>
						<text class="money">{{item.money}}元</text>
					</view>
					<view slot="foot" class="coazuo">
						<u-button class="btn" type="error" size="mini" @click="deleteItem(item)">删除</u-button>
					</view>
				</u-card>
			</view>


			<!-- 添加弹出窗口 -->
			<u-popup v-model="show" mode="bottom">
				<view class="popup" ref="billpopup">
					<u-form :model="bill" ref="billForm">
						<u-form-item prop="money">
							<u-field :border-bottom="false" type="number" label="花费" v-model="bill.money" required placeholder="金额">
							</u-field>
						</u-form-item>
						<u-form-item prop="note">
							<u-field :border-bottom="false" label="事项" v-model="bill.note" required placeholder="花钱搞了个啥">
							</u-field>
						</u-form-item>
					</u-form>
					<u-button class="btn" @click="validete" type="success">提交</u-button>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 添加弹出窗口
				show: false,
				// 删除确认
				deleteshow: false,
				// 流水数据
				items: [],
				// 表单数据
				bill: {
					money: '',
					note: ''
				},
				// 规则
				rules: {
					money: [{
						required: true,
						message: '请输入金额',
						trigger: ['blur'],
					}],
					note: [{
						required: true,
						message: '请输入消费事项',
						trigger: 'blur'
					}]
				},
				// 删除的流水数据载体
				item: {}
			}
		},
		mounted() {
			this.getBill();
		},
		methods: {
			showToast(msg) {
				this.$refs.uToast.show(msg);
			},
			// 删除弹出层
			deleteItem(item) {
				// 提示是否删除
				this.deleteshow = true;
				this.item = item;
				deleteConfirm(this.item)
			},
			// 删除
			async deleteConfirm(item) {
				if (this.item.name != uni.getStorageSync('user')) {
					return this.showToast({
						title: '你没有权限删除他人的数据',
						type: 'warning  '
					});
				}
				try {
					let data = await this.$myhttp({
						url: '/bill',
						method: 'DELETE',
						data: {
							id: this.item.id,
						},
					});
					this.showToast({
						title: data.msg,
					});
					await this.getBill();
				} catch (err) {
					uni.showToast({
						title: '删除失败',
						type: 'warning  '
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
			// 展开添加流水菜单
			openaddBill() {
				this.show = true;
				this.$nextTick(function() {
					this.$refs.billForm.setRules(this.rules);
				})
			},
			// 验证表单数据
			validete() {
				this.$refs.billForm.validate(valid => {
					if (valid) {
						this.sumbit();
						this.show = false;
						this.bill = {}
					} else {
						return false;
					}
				});
			},
			// 添加流水
			async sumbit() {
				try {
					let data = await this.$myhttp({
						url: '/bill',
						method: 'POST',
						data: this.bill,
					});
					this.showToast({
						title: data.msg,
						type: 'primary '
					});
					await this.getBill();
				} catch (err) {
					this.showToast({
						title: '添加失败',
						type: 'error '
					});
				}
			}
		},
		onPullDownRefresh() {
			const data = this.getBill();
			this.showToast({
				title: '刷新成功',
				type: 'primary '
			});
			uni.stopPullDownRefresh();
		},

	}
</script>

<style lang="scss">
	.page-container {
		.container {
			.nav-bar {
				overflow: hidden;
				margin-bottom: 50rpx;
			}

			.bill-container {
				overflow: hidden;

				.note-money {
					display: flex;
					justify-content: space-between;

					.money {
						color: red;
						font-size: 40rpx;
					}
				}

				.coazuo {
					display: flex;
					justify-content: flex-end;

					.btn {
						margin: 0;
					}
				}
			}
		}
	}

	.popup {
		width: 90%;
		padding: 50rpx 10rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.btn{
			margin-top: 50rpx;
		}
	}
</style>
