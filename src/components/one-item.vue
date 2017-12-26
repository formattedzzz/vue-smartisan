<template>
<div class="item">
    <div>
        <div class="item-img">
            <img :alt="item.name" :src="item.sku_info[itemindex].ali_image" style="opacity: 1;">
        </div>
        <h6>{{item.name}}</h6>
        <h3 >{{item.name_title}}</h3>
        <div class="params-colors">
            <ul class="colors-list">
                <li v-for="color, index in item.sku_info" :key="index" @click="tabindex(index)" >
                    <a href="javascript:;" :class="{'active': index===itemindex }">
                        <img :src="'http://img01.smartisanos.cn/'+color.spec_json.image+'20X20.jpg'">
                    </a>
                </li>
            </ul>
        </div>
        <div class="item-btns clearfix">
            <span class="item-gray-btn">
                <a href="javascript:;" target="_blank"></a>
                <router-link :to="{name: 'item', query:{itemid: item.sku_info[itemindex].sku_id} }" >查看详情</router-link> 
                </span><span class="item-blue-btn" @click="addgoods(item.sku_info[itemindex])" >加入购物车 </span>
        </div>
        <div class="item-price clearfix">
            <i>¥</i><span>{{item.price}}.00</span>
        </div>
        <div class="discount-icon">false</div>
        <div class="item-cover">
            <a href="javascript:;" target="_blank"></a>
        </div>
    </div>
</div>
</template>

<script>

export default {
  name: 'oneitem',
  data () {
      return {
          itemindex: 0
      }
  },
  props: {
    item: {
        type: Object
    }      
  },
  getters:{

  },
  methods:{
      tabindex(index){
          this.itemindex = index;
      },
      addgoods(item){
          let data = {'item': item, 'num': 1}
          this.$store.commit('addgoodsdata',data)
      }
  }
}
</script>

<style>

</style>
