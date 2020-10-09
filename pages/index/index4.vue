<template>
	<view class="page-container">
		<u-toast ref="uToast" />
		<!-- 待办事项 -->
		<view class="tods">
			<u-card v-for="(item,index) in todos" :key="index" :title="item.name" :title-color="'#2979FF'" :sub-title="item.createtime|dateFilter">
				<view class="note-money" slot="body">
					<u-swipe-action :show="false" :index="index" @click="down" :options="options">
						<view class="item u-border-bottom">
							<view class="title-wrap">
								<text class="title u-line-2"><text class="yellow">{{item.task}}</text>,请在确认收到款项后,优化点击完成按钮,完成本次流程</text>
							</view>
						</view>
					</u-swipe-action>
				</view>
			</u-card>


			<u-line color="black"></u-line>

		</view>


	</view>
</template>
<script>
	export default {
		data() {
			return {
				// 所有待办项列表
				todos: [],
				// 
				options: [{
						text: '完成',
						style: {
							backgroundColor: '#007aff'
						}
					},
					{
						text: '未收到款项',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				]
			}
		},
		mounted() {
			this.getTodos();
		},
		methods: {
			// 右滑按钮点击
			down(index, btn) {
				// index 表示列表的第几项目,btn表示点击的是第几个按钮
				if (btn == 1) { //表示点击的是未收到款项按钮
					// 将所有相关订单还原
				} else { //表示点击的完成按钮
					console.log(this.todos[index]);
				}
			},
			// 获取待办事项列表
			async getTodos() {
				let data = await this.$myhttp({
					url: '/todos'
				});
				this.todos = data.data;
			},
			// 获取当前用户名
			getUserName() {
				this.username = uni.getStorageSync('user');
			},
			// 下拉刷新
			async onPullDownRefresh() {
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

		}
	}
</script>
<style lang="scss">
	.yellow {
		color: rgb(255, 103, 0);
	}


	.item {
		display: flex;
		padding: 20rpx;
	}

	.title {
		text-align: left;
		font-size: 28rpx;
		color: $u-content-color;
		margin-top: 20rpx;
	}
</style>
