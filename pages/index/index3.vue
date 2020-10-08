<template>
	<view class="page-container">
		<u-toast ref="uToast" />
		<view v-for="(item,index) in user_bills" :key="index">
			<u-card v-if="item.user.name!=username" :title="item.user.name" :sub-title="item.user.logintime|logintimeF"
			 :foot-border-top="false">
				<view slot="body">
					<view class="card-body">
						<text>他有<text class="yellow">{{item.data.length}}</text>笔你还没有支付,共计需分摊 <text class="redcolor">{{item.user.inmoney}}</text>元</text>
					</view>
				</view>
				<view slot="foot">
					<view class="card-foot">
						<u-button type="primary" @click="payhanlder(item)">立即支付</u-button>
					</view>
				</view>
			</u-card>
			<u-card v-if="item.user.name==username" :title="'我'" :sub-title="item.user.logintime|logintimeF" :foot-border-top="false">
				<view slot="body">
					<view class="card-body">
						<view v-for="(item_1,index) in item.data" :key="index">
							<text>你有<text class="yellow">{{item_1.bills.length}}</text>笔订单
								<text class="yellow">{{item_1.user.name}}</text>未支付,需要向你支付
								<text class="redcolor">{{item_1.outmoney}}</text>元</text>
						</view>
					</view>
				</view>
				<view slot="foot">
					<view class="card-foot">
						<u-button type="primary">立即报警</u-button>
					</view>
				</view>
			</u-card>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				// 当前用户名
				username: '',
				// 当前用户已经计算的流水集合
				user_bills: [],
			}
		},
		mounted() {
			this.getJisuanBill();
			this.getUserName();
		},
		filters: {
			logintimeF: function(val) {
				if (!val) return;
				const date = new Date(val);
				return "上次登录:" + (Number(date.getMonth()) + 1) + '-' + date.getDate();
			}
		},
		methods: {
			// 获取当前用户名
			getUserName() {
				this.username = uni.getStorageSync('user');
			},
			// 请求结算页面数据
			async getJisuanBill() {
				let data = await this.$myhttp({
					url: '/bills/jiesuan'
				});
				this.user_bills = data.data;
			},
			// 下拉刷新
			async onPullDownRefresh() {
				await this.getJisuanBill();
				this.showToast({
					title: '刷新成功',
					type: 'primary '
				});
				uni.stopPullDownRefresh();
			},
			// 提示
			showToast(msg) {
				this.$refs.uToast.show(msg);
			},
			// 支付处理逻辑
			async payhanlder(item) {
				let data = await this.$myhttp({
					url: '/todo',
					method: 'post',
					data:item
				});

				console.log(data);
			}
		}
	}
</script>
<style lang="scss">
	.yellow {
		color: rgb(255, 103, 0);
	}

	.redcolor {
		color: red;
	}
</style>
