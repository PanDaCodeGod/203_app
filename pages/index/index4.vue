<template>
	<view class="page-container">
		<u-toast ref="uToast" />
		<u-empty v-if="todos.length==0" text="你当前没有未处理的事项,凉快去吧"></u-empty>
		<view class="tods">
			<u-card v-for="(item,index) in todos" :key="index" :title="'请及时处理'" :title-color="'#2979FF'" :sub-title="item.createtime|dateFilter">
				<view class="note-money" slot="body">
					<u-swipe-action :show="false" :index="index" @click="down" :options="options">
						<view class="item u-border-bottom">
							<view class="title-wrap">
								<text class="title u-line-2">{{item.task}}</text>
							</view>
						</view>
					</u-swipe-action>
				</view>
				<view slot="foot" class="coazuo">
					对方有误操作的可能,请你在确认收到款项后,再右滑确认
				</view>
			</u-card>
		</view>

		<view class="text-center">
			<view>
				App端开源项目地址:https://github.com/bbboyvips/203_app
			</view>
			<view>
				Api后端开源地址:https://github.com/bbboyvips/203_ht
			</view>
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
						text: '回溯',
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
			async down(index, btn) {
				// index 表示列表的第几项目,btn表示点击的是第几个按钮
				if (btn == 1) { //表示点击的是回溯按钮
					// 将所有相关订单回溯
					let data = this.$myhttp({
						url: '/todo/re',
						method: 'put',
						data: {
							id: this.todos[index].id,
							bills_id: this.todos[index].bills_id,
							creater: this.todos[index].creater,
						}
					});
					await this.getTodos();
				} else { //表示点击的完成按钮
					// 完成当前的待办即可
					let data = this.$myhttp({
						url: '/todo/down',
						method: 'put',
						data: {
							id: this.todos[index].id,
						}
					});
					await this.getTodos();
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
				this.getTodos();
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

	.text-center {
		text-align: center;
		color: gray;
		font-size: 10rpx;
	}
</style>
