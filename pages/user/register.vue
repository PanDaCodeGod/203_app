<template>
	<view class="page-container">
		<view class="input-container">
			<view class="row">
				<text>账号:</text><input maxlength="7" type="text" v-model="user.name" />
			</view>
			<view class="row">
				<text>密码:</text><input maxlength="10" type="text" v-model="user.password" />
			</view>
			<view class="row">
				<text>确认密码:</text><input type="text" v-model="user.repassword" />
			</view>
			<view class="row">
				<text>邀请码:</text><input type="text" v-model="user.code" />
			</view>
			<text>{{msg}}</text>
			<button type="default" @click="validate">注册</button>
			
			<button type="default" @click="login">登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {
					name: '',
					password: '',
					repassword: '',
					code: ''
				},
				msg: '',
				isen: true
			}
		},
		methods: {
			login() {
				uni.redirectTo({
					url: '/pages/user/login'
				});
			},
			validate() {
				if (this.user.password != this.user.repassword || this.user.name.length == 0 || this.user.password.length == 0) {
					this.msg = "检查输入项";
					this.isen = true;
				} else {
					this.msg = '';
					this.isen = false;
					this.submit();
				}
			},
			async submit() {
				const data = await this.$myhttp({
					url: '/user/register',
					method: 'POST',
					data: this.user
				});
				console.log(data);
				uni.showToast({
					title: data.msg
				})
			}
		}

	}
</script>

<style lang="scss" scoped>
	.page-container {
		.row {
			padding: 20px 0;
			display: flex;
			justify-content: space-around;

			text {
				width: 30%;
				font-size: 30rpx;
			}

			input {
				width: 70%;
				border: 1px solid gray;
			}
		}

		button {
			margin: 20rpx 0;
		}
	}
</style>
