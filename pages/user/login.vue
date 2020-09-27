<template>
	<view class="page-container">
		<view class="container">
			<u-toast ref="uToast" />
			<u-form :model="user" ref="uForm">
				<u-form-item prop="name">
					<u-field :border-bottom="false" label="用户名" v-model="user.name" required placeholder="请填写用户名">
					</u-field>
				</u-form-item>
				<u-form-item prop="password">
					<u-field :border-bottom="false" type="password" label="密码" v-model="user.password" required placeholder="请填写密码"> </u-field>
				</u-form-item>
			</u-form>

			<view class="btn-group">
				<u-button :ripple="true" @click="validete" type="primary">登录</u-button>
				<u-button :ripple="true" @click="register" type="success">注册</u-button>
			</view>
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
				},
				rules: {
					name: [{
						required: true,
						message: '请输入用户名',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['blur'],
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			showToast(msg) {
				this.$refs.uToast.show(msg);
			},
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
				if (!Object.keys(data.data).length) {
					this.showToast({
						title: data.msg,
						type: 'error'
					});
				} else {
					uni.setStorageSync('token', data.data.token);
					uni.setStorageSync('user', this.user.name);
					uni.switchTab({
						url: '/pages/index/index'
					});
				}
			},
			validete() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.login();
					} else {
						return false;
					}
				});
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style lang="scss" scoped>
	.page-container {
		.container {
			border: 1px solid #DDDDDD;
			border-radius: 10rpx;
			padding: 10px;
		}

		.btn-group {
			margin-top: 40rpx;
			display: flex;
		}
	}
</style>
