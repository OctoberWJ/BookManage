<template>
	<div>
		<!-- 该写轮播图的图片 -->
		<top style="position:absolute;top:-129px;z-index:1;"></top>
		<el-carousel :interval="4000" type="card" height="350px">
			<el-carousel-item v-for="item in imagesbox" :key="item.id">
				<img :src="item.idView" class="image"  @click="GoDetail"/>
			</el-carousel-item>
		</el-carousel>
	</div>
</template>

<script>
	import top from "../components/top.vue";
	export default {
		components: {
			top: top
		},
		data() {
			return {
				imagesbox: [
					{
						id: "0",
						idView: require("../assets/img/huozhe.png")
					},
					{
						id: "1",
						idView: require("../assets/img/fengzheng.png")
					},
					{
						id: "2",
						idView: require("../assets/img/baiyexing.png")
					}
				]
			};
    },
    methods:{
      GoDetail(){
            this.$router.push({
                path:'/user/bookstore'
            });
        }
    }
	}
</script>
<style>
	.image {
		width: 630px;
		height: 351px;
	}

	.el-carousel {
		margin-top: 129px;
		height: 400px;
	}

	.el-carousel__item h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		line-height: 200px;
		margin: 0;
	}

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n + 1) {
		background-color: #d3dce6;
	}
</style>
