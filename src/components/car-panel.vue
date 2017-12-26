
<template>
<li class="nav-cart" @mouseenter="showcar" @mouseleave="hidecar" >
    <a href="javascript:;" class="aimel" >购物车</a>
    <!--根据class改变颜色-->
    <span class="cart-empty-num cart-num">
    <i>{{totalcount}}</i>
    </span>
    <div class="nav-cart-wrapper" v-show="showcarpanel" >
    <div class="nav-cart-list">
        <div class="empty" v-if="!totalcount">
        <h3>购物车为空</h3>
        <p>您还没有选购任何商品，现在前往商城选购吧!</p>
        </div>
        <div class="full">
        <div class="nav-cart-items">
            <ul>
            <li class="clear" v-for="item,index in goodscardata" >
                <div class="cart-item js-cart-item cart-item-sell">
                <div class="cart-item-inner">
                    <div class="item-thumb">
                    <img :src="item.ali_image">
                    </div>
                    <div class="item-desc">
                    <div class="cart-cell">
                        <h4> 
                        <a href="#/item/100027401">{{item.title}}</a>
                        </h4>
                        <p class="attrs">
                        <span>{{item.show_name}}</span>
                        </p>
                        <h6>
            <span class="price-icon">¥</span><span class="price-num">{{item.price}}</span><span class="item-num">x{{item.count}}</span>
                        </h6>
                    </div>
                    </div>
                    <div class="del-btn" @click="delgoods(item.sku_id)">删除</div>
                </div>
                </div>
            </li>
            </ul>
        </div>
        <div class="nav-cart-total">
            <p>共 <strong class="ng-binding">{{totalcount}}</strong> 件商品</p>
            <h5>合计：<span class="price-icon">¥</span><span class="price-num ng-binding" ng-bind="cartMenu.totalPrice">{{totalprice}}</span></h5>
            <h6>
                <router-link :to="{name: 'order'}" class="nav-cart-btn">去购物车</router-link>
            </h6>
        </div>
        </div>
    </div>
    </div>
    <transition
        name = 'ball'
        v-on:before-enter= "beforeenter"
        v-on:enter= "enter"
        v-on:after-enter= "afterenter"
        v-bind:css= "true"
    >
        <div class="addcart-mask" v-show="ball.show">
            <img class="mask-item" >
        </div>
    </transition>
</li>
</template>

<script>

export default {
  name: 'carpanel',
  computed: {
      goodscardata(){
          return this.$store.state.cardata;
      },
      totalcount(){
          return this.$store.getters.totalcount;
      },
      totalprice(){
          return this.$store.getters.totalprice;
      },
      showcarpanel(){
          return this.$store.state.showcar
      },
      ball(){
          return this.$store.state.ball
      }
  },
  methods: {
    delgoods(id){
        // confirm('确定要删除吗？')
        this.$store.commit('delgoodsdata',id)
    },      
    showcar(){
        this.$store.commit('showcar')
    },
    hidecar(){
        this.$store.commit('hidecar')
    },
    beforeenter(transel){
        let aimrect = document.getElementsByClassName('aimel')[0].getBoundingClientRect();
        let startrect = this.ball.formatel.getBoundingClientRect();
        let xel = transel;
        let yel = document.getElementsByClassName("mask-item")[0];
        let transx = aimrect.left - startrect.left ;
        let transy = aimrect.top - startrect.top ;
        yel.src = this.ball.img;
        xel.style.left = -transx+'px';
        xel.style.top = -transy+'px';      
    },
    enter(transel){
        let a = transel.offsetHeight;
        let xel = transel;
        let yel = document.getElementsByClassName("mask-item")[0];
        xel.style.left = 0 ;
        xel.style.top = 0 ;
    },
    afterenter(transel){
        this.ball.show = false;
    }
  }
}
</script>

<style >
.addcart-mask{
    width:30px;
    height: 30px;
    position:absolute;
    left: 0;
    top: -30px;
}
.addcart-mask img{
        display: block;
        position: absolute;
        left: 0;
        top:0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
.ball-enter-active{
    transition: .6s ease-out;
    z-index: 99;
  }
</style>
