<template>
<div id="pop">
<div class="module-dialog-layer" style="display: block;"></div>
<div class="module-dialog clear module-dialog-address module-dialog-show">
<div class="dialog-panel">
    <div class="topbar">
        <div class="dialog-tit clear">
            <h4 class="js-dialog-title">修改收货地址</h4>
        </div>
        <span class="dialog-close" @click="hideadd">x</span>
    </div>
    <div class="dialog-con js-dialog-container">
        <div class="animate-layer">
            <div class="dialog-inner js-address-add">
                <div class="save-address-box">
                    <div class="address-form">
                        <div class="module-form-row">
                            <div class="form-item-v3">
                                <input placeholder="收货人姓名(必填)" type="text" class="js-verify" v-model="newaddress.name">
                                <div class="verify-error"></div>
                            </div>
                        </div>
                        <div class="module-form-row">
                            <div class="form-item-v3" :class="{'form-invalid-item': phonenumok === false}">
                                <input placeholder="手机号(必填)" type="text" class="js-verify" v-model="newaddress.phone"
                                    @blur="checknum" @focus="clearerr"
                                >
                                <div class="verify-error"></div>
                            </div>
                        </div>
                        <div class="module-form-row clear">
                            <div class="form-item-v3 area-code-w fn-left form-valid-item">
                                <input placeholder="区号（可选）" type="text" class="js-verify js-address-area-code"
                                     v-model="newaddress.areaCode"
                                >
                                <div class="verify-error"></div>
                            </div>
                            <div class="form-item-v3 telephone-w fn-right form-valid-item">
                                <input placeholder="固定电话（可选）"  type="text" class="js-verify js-address-telephone"
                                     v-model="newaddress.landLine"
                                >
                                <div class="verify-error"></div>
                            </div>
                        </div>
                        <div class="module-form-row clear">
                            <div class="form-item-v3 select-item province-wrapper">
                                <select name="province_code" class="province select-province js-form-province js-verify"
                                     v-model="newaddress.provinceId"
                                >
                                    
                                    <option :value="item.area_id" v-for="item, index in arealist">{{item.area_name}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="module-form-row clear">
                            <div class="form-item-v3 select-item city-wrapper fn-left form-focus-item">
                                <select class="city select-city js-form-city js-verify" v-model="newaddress.cityId">
                                    
                                    <option :value="city.area_id" v-for="city, index in citylist">{{city.area_name}}</option>
                                </select>
                            </div>
                            <div class="form-item-v3 select-item district-wrapper fn-right form-focus-item">
                                <select class="city select-city js-form-city js-verify" v-model="newaddress.countyId">
                            <option :value="county.area_id" v-for="county, index in countylist">{{county.area_name}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="module-form-row">
                            <div class="form-item-v3">
                                <input placeholder="详细地址，如街道名称，楼层，门牌号码等" type="text" class="js-verify"
                                     v-model="newaddress.address"
                                >
                                <div class="verify-error"></div>
                            </div>
                        </div>
                        <div class="module-form-row fn-clear">
                            <input type="checkbox" class="hide" value="1">
                            <span class="blue-checkbox" 
                                @click="tabdefault" 
                                :class="{'blue-checkbox-on': newaddress.default}"
                                ></span>设为默认
                        </div>
                        <div class="dialog-blue-btn big-main-btn js-verify-address" 
                            @click="submitmodify"
                            :class="{'disabled-btn': !allright}">
                            <a>保存</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>    
</div>
</template>

<script>
import arealist from '@/lib/addList'
export default {
    name: 'editadd',
    props:{
        addindex: {
            type: Number
        }
    },
    data(){
        return {
            arealist,
            newaddress: {
            'name': '',
            'phone': '',
            'areaCode': '',
            'landLine': '',
            'provinceId': null,
            'province': '',
            'cityId': null,
            'city': '',
            'countyId': null,
            'county': '',
            'address': '',
            'default': false
          },
          phonenumok: true,
          allright: false
        }

    },
    watch: {
        'newaddress.countyId' (){
            this.countylist.forEach((item, index) => {
                if (item.area_id === this.newaddress.countyId) {
                    this.newaddress.county = item.area_name
                    return
                }
            })
        },
        'phonenumok' (){
            if (!this.phonenumok) {
                this.allright =false
            }
        },
        newaddress: {
            handler() {
                this.cansubmit()
            },
            deep: true
        }
    },
    mounted(){
        // this.newaddress = this.oldadd
        this.newaddress.name = this.oldadd.name
        this.newaddress.phone = this.oldadd.phone
        this.newaddress.default = this.oldadd.default
        this.newaddress.address = this.oldadd.address
        this.newaddress.provinceId = this.oldadd.provinceId
        this.newaddress.cityId = this.oldadd.cityId
        this.newaddress.countyId = this.oldadd.countyId
        // console.log(this.newaddress.provinceId)
        // console.log(this.oldadd)
        // console.log(this.addindex)
    },
    computed: {
        oldadd(){
            return this.$store.state.addressinfo[this.addindex]
        },       
        citylist(){
            let citys = []
            this.arealist.forEach((item, index) => {
                if (item.area_id === this.newaddress.provinceId) {
                    this.newaddress.province = item.area_name
                    citys = item.city_list
                    return
                }
            })
            if (this.newaddress.provinceId === '0') {
                this.newaddress.cityId = '0'
                this.newaddress.countyId = '0'
            }
            return citys
        },
        countylist(){
            let countys = []
            this.citylist.forEach((item, index) => {
                if (item.area_id === this.newaddress.cityId) {
                    this.newaddress.city = item.area_name
                    countys = item.county_list
                    return
                }
            })
            if (this.newaddress.cityId === '0') {                
                this.newaddress.countyId = '0'
            }
            return countys
        }
    },
    methods: {
        hideadd(){
            this.$emit('hide')
            // console.log(this.newaddress)
        },
        checknum(){
            if(this.newaddress.phone.length != 11){
                this.phonenumok = false
            }
        },
        clearerr(){
            this.phonenumok = true
        },
        tabdefault(){
            this.newaddress.default= !this.newaddress.default
        },
        cansubmit(){
            let address = this.newaddress
if (this.phonenumok && address.name && address.provinceId && address.provinceId!='0' && address.cityId && address.cityId!='0' && address.countyId && address.countyId!='0' && address.address) {
                this.allright = true
            }else{
                this.allright = false
            }
        },
        submitmodify(){
            if(this.allright) {
                this.$emit('hide')
                // console.log(this.addindex)
                this.$store.commit('savemodify',{add:this.newaddress,addindex:this.addindex})               
            }
        }
    }
}
</script>

<style>
#pop .module-dialog-layer{
    display: none;
    position: fixed;
    _position: absolute;
    left: 0;
    top: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: .6;
}
#pop .module-dialog .dialog-panel, .module-dialog:after{
    display: inline-block;
    vertical-align: middle;     
}
#pop .module-dialog:after{
    content: '';
    height: 100%;
    margin-left: -.25em;
}
#pop .module-dialog{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1001;
    text-align: center;
    opacity: 0;
    transition: opacity .2s ease-in;
}
#pop .module-dialog-show{
    opacity: 1;
}
#pop .module-dialog .dialog-panel{
    position: relative;
    width: 450px;
    min-width: 200px;
    border-radius: 10px;
    background: #FFF;
    box-shadow: 0 0 0 1px rgba(0,0,0,.1) inset, 1px 0 3px rgba(0,0,0,.1);
    text-align: left;
    height: 592px;  
}
#pop .module-dialog .topbar{
    overflow: hidden;
    width: 100%;
    height: 60px;
    background: linear-gradient(#FFF,#F5F5F5);
    border-bottom: 1px solid #DCDCDC;
    border-radius: 10px 10px 0 0;
    box-shadow: 2px 0 5px rgba(0,0,0,.1);
}
#pop .module-dialog-address .topbar{
    position: relative;
    z-index: 10;
}
#pop .module-dialog .dialog-tit{
    height: 60px;
    padding: 0 15px;
    line-height: 60px;
}
#pop .module-dialog .dialog-tit h4{
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    color: #666;
}
#pop .module-dialog .dialog-close{
    overflow: hidden;
    display: block;
    position: absolute;
    right: 10px;
    top: 15px;
    z-index: 20;
    width: 30px;
    height: 30px;
    line-height: 30px;
    font-size: 30px;
    color: #000;
    opacity: .2;
    cursor: pointer;
    transition: all .3s linear;
}
#pop .module-dialog .dialog-close:hover{
    opacity: .3;
}
#pop .module-dialog .animate-layer{
    position: relative;
}
#pop .module-dialog-address .save-address-box{
    width: 450px;
    padding-top: 29px;
}
#pop .address-form{
    width: 370px;
    margin: 0 auto;
}
#pop .account-address .address-form{
    padding: 30px;
    margin: 0;
}
#pop .module-form-row{
    position: relative;
    padding-bottom: 10px;
    margin: 0 auto;
}
#pop .address-form .module-form-row{
    padding-bottom: 15px;
}
#pop .module-form-row .form-item-v3{
    position: relative;
    height: 46px;
    background: #FFF;
    border: 1px solid #CCC;
    border-radius: 6px;
    box-shadow: 0 3px 5px -4px rgba(0,0,0,.4) inset, -1px 0 3px -2px rgba(0,0,0,.1) inset;
    line-height: 46px;
    font-size: 18px;
    opacity: .618;
    transition: opacity .3s ease;
}
#pop .module-form-row .form-item-v3 i{
    position: absolute;
    left: 15px;
    top: 0;
    font-size: 16px;
    color: #BEBEBE;
}
#pop .module-form-row .form-item-v3 input{
    padding: 0 15px;
    background-color: transparent;
    border: none;
    font-size: 16px;
}
#pop .address-form .form-item-v3 input{
    width: 330px;
}
#pop .address-form .area-code-w{
    width: 118px;
}
#pop .address-form .telephone-w{
    width: 238px;
}
#pop .module-form-row div.select-item{
    width: auto;
    height: auto;
    margin: 0;
    background: 0 0;
    border: none;
    box-shadow: none;
    opacity: 1;
}
#pop .module-form-row .form-item-v3 select{
    margin: 0 0 0 15px;
    background-color: transparent;
    border: none;
    font-size: 16px;
    color: #333;
}
#pop .address-form .select-province{
    width: 370px;
}
#pop .form-focus-item{
    z-index: 1;
    opacity: 1;
    border: 1px solid #6B93F2;
}
#pop .module-form-row div.select-item{
    width: auto;
    height: auto;
    margin: 0;
    background: 0 0;
    border: none;
    box-shadow: none;
    opacity: 1;
}
#pop .module-form-row .form-item-v3 select{
    height: 48px;
    padding: 0 15px;
    margin: 0;
    background: -webkit-linear-gradient(top,#FAFAFA,#F5F5F5);
    background: linear-gradient(#FAFAFA,#F5F5F5);
    border: 1px solid #CCC;
    border-radius: 6px;
    box-shadow: 2px 0 0 rgba(255,255,255,.4) inset, 1px 0 0 rgba(255,255,255,.3);
    line-height: 48px;
    text-indent: 0;
    outline: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    cursor: pointer;
}
#pop .address-form .select-city, .address-form .select-district{
    width: 180px;
}
#pop .blue-checkbox{
    display: inline-block;
    position: relative;
    width: 20px;
    height: 20px;
    background: url(../assets/img/checkbox-bg.png) no-repeat;
    cursor: pointer;
}
#pop .blue-checkbox-on{
  background: url(../assets/img/checkbox-bg.png) 0 -20px no-repeat;
}
#pop .address-form .blue-checkbox{
    top: 0;
    float: left;
    margin-right: 5px;
}
#pop .dialog-blue-btn{
    padding: 1px;
    background: #6383C6;
    background: linear-gradient(#6383C6,#4262AF);
    border-radius: 6px;
    text-align: center;
    color: #FFF;
}
#pop .disabled-btn{
    opacity: .4;
}
#pop .disabled-btn, .disabled-btn a{
    cursor: not-allowed;
    -webkit-transition: none;
    transition: none;
    pointer-events: none;
}
#pop .dialog-blue-btn a{
    display: block;
    padding: 2px 0;
    background: #5F7ED7;
    background: linear-gradient(#6F97E5,#527ED9);
    border-radius: 5px;
    box-shadow: inset 0 1px 2px #7EA1E8;
    text-shadow: 0 -1px 0 #4F70B3;
    color: #FFF;
}
#pop .big-main-btn a{
    height: 42px;
    line-height: 42px;
    font-size: 18px;
}
#pop .module-form-row .form-invalid-item{
  opacity: 1;
  border: 1px solid red;
}
#pop .module-form-row .form-invalid-item:after{
  visibility: visible;
  opacity: 1;
}
</style>
