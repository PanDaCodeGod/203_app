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
					<u-field :border-bottom="false" type="password" label="密码" v-model="user.password" required placeholder="请填写密码">
					</u-field>
				</u-form-item>
				<u-form-item prop="password">
					<u-field :border-bottom="false" type="password" label="确认密码" v-model="user.repassword" required placeholder="请确认密码">
					</u-field>
				</u-form-item>
				<u-form-item prop="code">
					<u-field :border-bottom="false" label="注册码" v-model="user.code" required placeholder="请联系管理员索要">
					</u-field>
				</u-form-item>
			</u-form>

			<view class="btn-group">
				<u-button :ripple="true" @click="validete" type="primary">注册</u-button>
				<u-button :ripple="true" @click="login" type="success">登录</u-button>
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
					password: '',
					repassword: '',
					code: ''
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
					}],
					repassword: [{
						required: true,
						message: '请确认密码',
						trigger: 'blur'
					}],
					code: [{
						required: true,
						message: '请请入注册码',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			showToast(msg) {
				this.$refs.uToast.show(msg);
			},
			login() {
				uni.redirectTo({
					url: '/pages/user/login'
				});
			},
			async submit() {
				const data = await this.$myhttp({
					url: '/user/register',
					method: 'POST',
					data: this.user
				});
				this.showToast({
					title: data.msg,
					type: 'error'
				});
			},
			validete() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.submit();
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
