

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let store = new Vuex.Store({
    state: {
        cardata: [],
        orderdata: [],
        showalert: false,
        showcar: false,
        cartimer: null,
        ball: {
            formatel: null,
            img: null,
            show: false
        },
        addressinfo: [{
            'name': '刘小林',
            'phone': '13875806578',
            'areaCode': '010',
            'landLine': '64627856',
            'provinceId': 110000,
            'province': '浙江省',
            'cityId': 110100,
            'city': '舟山市',
            'countyId': 110106,
            'county': '临城新区',
            'address': '中国长峙岛海大南路1号',
            'default': true
          },{
            'name': '刘姜城',
            'phone': '17757893364',
            'areaCode': '010',
            'landLine': '64627856',
            'provinceId': 110000,
            'province': '浙江省',
            'cityId': 110100,
            'city': '舟山市',
            'countyId': 110106,
            'county': '定海区',
            'address': '中国长峙岛海洋大学H楼',
            'default': false
          }]
    },
    getters: {
        totalcount(state){
            let count =0;
            state.cardata.forEach(item => {
                count+= item.count;
            })
            return count;
        },
        totalprice(state){
            let total =0;
            state.cardata.forEach(item => {
                total+= item.count*item.price;
            })
            return total;
        },
        allchecked(state){
            let beoff = true;
            state.cardata.forEach(item=>{                
                if(!item.selected){
                    beoff = false
                }                
            })
            return beoff
        },
        checkedtotalcount(state){
            let count = 0
            state.cardata.forEach(item=>{
                if(item.selected){
                    count += item.count
                }
            })
            return count
        },
        checkedtotalprice(state){
            let price = 0
            state.cardata.forEach(item=>{
                if(item.selected){
                    price += item.count*item.price
                }
            })
            return price
        },
        checkeditemdata(state){
            let data = state.cardata.filter(item => {
                return item.selected === true
            })
            return data
        }
    },
    mutations: {
        addgoodsdata(state,data){
            let onoff = true;
            if (!state.ball.show) {
                state.cardata.forEach(good=>{
                    if (good.sku_id===data.item.sku_id) {
                        good.count+= data.num;
                        if (good.count > good.limit_num) {
                            good.count-= data.num;
                            state.showalert = true;
                            onoff = false;
                            return
                        }
                        state.ball.show= true;
                        state.ball.img = data.item.ali_image;
                        state.ball.formatel = event.path[0];
                        // console.log(state.ball)
                        onoff = false;
                        state.showcar = true;
                    }
                })
                if (onoff) {
                    let newdata = data.item;
                    Vue.set(newdata,'count',data.num);
                    Vue.set(newdata,'selected',true);
                    state.cardata.push(newdata);
                    state.showcar = true;
    
                    state.ball.show= true;
                    state.ball.img = newdata.ali_image;
                    state.ball.formatel = event.path[0];
                }
            }
            // console.log(state.cardata);
        },
        delgoodsdata(state,id){
            state.cardata.forEach((good,index) =>{
                if (good.sku_id == id) {
                    state.cardata.splice(index,1);
                    // good.count--;
                    return
                }
            })
        },
        pluscount(state,id){
            state.cardata.forEach(item=>{
                if(item.sku_id == id){
                    if(item.count == item.limit_num) return
                    item.count++
                }
            })
        },
        subcount(state,id){
            state.cardata.forEach(item=>{
                if(item.sku_id == id){
                    if(item.count == 1) return
                    item.count--
                }
            })
        },
        tabcheck(state,id){
            state.cardata.forEach(item=>{
                if(item.sku_id == id){
                    item.selected = !item.selected
                }
            })
        },
        taballcheck(state,beoff){
            state.cardata.forEach(item=>{
                item.selected = !beoff
            })
        },
        delchecked(state){
            let i = state.cardata.length;
            while(i--){
                if(state.cardata[i].selected === true){
                    state.cardata.splice(i,1)
                }
            }
        },
        hidealert(state){
            state.showalert = false
        },
        showcar(state){
            clearTimeout(state.cartimer)
            state.showcar = true
        },
        hidecar(state){
            state.cartimer = setTimeout(()=>{
                state.showcar = false
            },800)
        },
        hidecarli(state){
            clearTimeout(state.cartimer)
            state.showcar = false
        },
        saveadd(state,add){
            if (add.default) {
                state.addressinfo.forEach(item => {
                    item.default = false
                })               
            }
            state.addressinfo.push(add)
        },
        savemodify(state,data){
            if (data.add.default) {
                state.addressinfo.forEach((item,index) => {
                    item.default = false
                }) 
            }
            state.addressinfo[data.addindex]= data.add
            // console.log(addindex)
            // console.log(add)
        },
        deladd(state,index){
            state.addressinfo.splice(index,1)
        },
        saveorder(state,data){
            let len = state.cardata.length
            while(len--){
                if(state.cardata[len].selected){
                    state.cardata.splice(len, 1)
                }
            }
            state.orderdata.unshift(data)
            
        },
        payoff(state, orderid) {
            state.orderdata.forEach(item => {
                if (item.id === orderid) {
                    item.haspay = true
                }
            })
        }
    }
})

export default store 