<template>
	<view class="page-container">
		<u-card v-for="(item,index) in users" :key="index" :title="item.name" :sub-title="item.logintime|logintimeF"
		 :foot-border-top="false">
			<view slot="body">
				<view class="card-body">
					<text>有52笔流水你没有支付,共计999元</text>
				</view>
			</view>
			<view slot="foot">
				<view class="card-foot">
					<u-button type="primary">立即支付</u-button>
				</view>
			</view>
		</u-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 所有用户集合
				users: [],
				// 所有流水集合
				bills: [],
				// 当前用户已经计算的流水集合
				used_bills: [],
			}
		},
		mounted() {
			// this.getUsers();
			// this.getBill();
			this.getJisuanBill();
		},
		filters: {
			logintimeF: function(val) {
				if (!val) return;
				const date = new Date(val);
				return "上次登录:" + (Number(date.getMonth()) + 1) + '-' + date.getDate();
			}
		},
		methods: {
			async getUsers() {
				// 获取所有用户
				let data = await this.$myhttp({
					url: '/user/users'
				});
				this.users = data.data;
			},
			// 请求账单数据
			async getBill() {
				let data = await this.$myhttp({
					url: '/bills'
				});
				this.bills = data.data;
				return data;
			},
			async getJisuanBill() {
				let data = await this.$myhttp({
					url: '/bills/jiesuan'
				});
				this.bills = data.data;
				return data;
			},
		}
	}
</script>

<style lang="scss">

</style>
