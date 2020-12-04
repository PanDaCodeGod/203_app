<template>
	<view class="page-container">
		<view class="container">
			<u-toast ref="uToast" />
			<u-modal v-model="deleteshow" @confirm="deleteConfirm" :show-title="false" :show-cancel-button="true" :content="'确定删除该条记录?'"></u-modal>
			<view class="nav-bar">
				<u-sticky>
					<view class="sticky">
						<u-button type="primary" @click="openaddBill">添加流水</u-button>
					</view>
				</u-sticky>
			</view>
			<view class="bill-container">
				<u-card @click="jiesuan_show=true" v-for="(item,index) in items" :key="index" :title="item.name" :title-color="'#2979FF'"
				 :sub-title="item.createtime|dateFilter">
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
					<u-form class="billForm" :model="bill" ref="billForm">
						<u-form-item prop="money">
							<u-field :border-bottom="false" type="number" label="花费" v-model="bill.money" required placeholder="金额">
							</u-field>
						</u-form-item>
						<u-form-item prop="note">
							<u-field :border-bottom="false" label="事项" v-model="bill.note" required placeholder="花钱搞了个啥">
							</u-field>
						</u-form-item>
						<u-form-item label="成员">
							<u-checkbox-group>
								<u-checkbox @change="checkboxChange" v-model="item.checked" v-for="(item, index) in users" :key="index" :name="item.name">
									{{ item.name }}
								</u-checkbox>
							</u-checkbox-group>
						</u-form-item>
						<!-- <u-upload :action="action" :file-list="fileList" :upload-text="'上传凭证'"></u-upload> -->
					</u-form>
					<u-button class="btn" @click="validete" type="success">提交</u-button>
				</view>
			</u-popup>
			<!-- 结算弹出窗口 -->
			<u-popup v-model="jiesuan_show" mode="bottom">
				<view class="popup" ref="jiesuanpopup">
					<u-button class="btn" @click="validete" type="success">结算</u-button>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 结算弹出窗口
				jiesuan_show: false,
				// 添加弹出窗口
				show: false,
				// 删除确认
				deleteshow: false,
				// 流水数据
				items: [],
				// 所有用户
				users: [],

				// 表单数据
				bill: {
					money: '',
					note: '',
					// 本次参与的成员
					groupUsers: []
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
		created() {
			this.getBill();
			this.getUsers();
			console.log(this.users);
		},
		methods: {
			// 获取所有用户
			async getUsers() {
				let data = await this.$myhttp({
					url: '/user/users'
				});
				this.users = data.data;
			},
			//单击成员框
			checkboxChange(user) {
				// console.log(user);
				if (user.value) {
					this.bill.groupUsers.push(user.name);
					// console.log(this.groupUser);
				} else {
					let index = this.bill.groupUsers.findIndex(e => e == user.name);
					this.bill.groupUsers.splice(index, 1);
					console.log(this.bill.groupUsers);
				}
			},
			// 提示框组件
			showToast(msg) {
				this.$refs.uToast.show(msg);
			},
			billClick() {
				console.log(1)
			},
			// 删除弹出层
			deleteItem(item) {
				// 提示是否删除
				this.deleteshow = true;
				this.item = item;
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
						// 验证成功,进行提交
						this.sumbit();
						//参数置空
						this.show = false;
						this.bill = {
						}
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

		.billForm {
			padding: 0 20rpx;
		}

		.btn {
			margin-top: 50rpx;
			align-self: center;
			align-items: center;
		}
	}
</style>
