<template>
	<view class="page-container">
		<view class="input-container">
			<view class="row">
				<text>账号:</text><input type="text" v-model="user.name" />
			</view>
			<view class="row">
				<text>密码:</text><input type="password" v-model="user.password" />
			</view>
			<button type="default" @click="login">登录</button>
			<button type="default" @click="register">注册</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {
					name: '',
					password: ''
				}
			}
		},
		methods: {
			register() {
				uni.redirectTo({
					url: '/pages/user/register'
				});
			},
			async login() {
				let data = await this.$myhttp({
					url: '/user/login',
					method: 'POST',
					data: this.user
				});
				console.log(data)
				if (data.msg === '用户不存在') {
					uni.showToast({
						title: data.msg
					})
				} else if (data.msg === '密码错误') {
					uni.showToast({
						title: data.msg
					})
				} else {
					uni.setStorageSync('token', data.data.token);

					uni.switchTab({
						url: '/pages/index/index'
					});
				}
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
