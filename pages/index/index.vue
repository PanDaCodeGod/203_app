<template>
	<view class="page-container">
		<uni-card is-shadow v-for="(item,index) in total" :title="item.type" :key="index">
			总共消费了￥{{item.money}}元
		</uni-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 金钱:
				total: {
					total: {
						type: '年度',
						money: 999
					},
					month: {
						type: '月度',
						money: 12
					}
				}
			}
		},
	}
</script>

<style scoped>

</style>
