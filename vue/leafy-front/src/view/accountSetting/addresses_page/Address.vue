<script setup>
import {useRouter} from 'vue-router'
import {ref,onBeforeMount} from 'vue'
import fetch from '../../../JS/api';
import cookie from '../../../JS/cookie';
import validation from '../../../JS/validation'
import BaseBankItem from '../../../components/bank/BaseBankItem.vue';
import BaseAlert from '../../../components/BaseAlert.vue';
import BaseEmptyList from '../../../components/BaseEmptyList.vue';
import BaseConfirm from '../../../components/BaseConfirm.vue';
// link
const myRouter =useRouter()
const goAdd=()=>myRouter.push({name:'Address_AS_add',params:{method:'new-address'}})
const goUpdate=(id)=>myRouter.push({name:'Address_AS_add',params:{method:'edit-address',id:validation.encrypt(id)}})


// for display confirm delete
const isDelete=ref(false)
// common attribute
const userName=ref('')
const addressList=ref([])
const addressId=ref('')
const addressDefault=ref(undefined)

// alert attribute
const isShowAlert=ref(false)
const alertType=ref(0)
const alertDetail=ref('')
const alertTime=ref(2)

// get status
const getDataStatus=ref(undefined)

const showConfirm=(id)=>{
    isDelete.value=true
    addressId.value=id
}
const confirmAddress=async(input=false)=>{
    if(!input) isDelete.value=false;
    else{
        
        // delete api
        // console.log("delete function")
        if(addressId.value.length!=0){
            await deleteAddress();
            // console.log(addressId.value)
        }
        else{
            isDelete.value=false
            console.log("close overlay")

        }
    }
}

const getAddress=async()=>{
    getDataStatus.value=undefined
    let {username}=cookie.decrypt()
    userName.value=username
    let {status,msg,data}=await fetch.getAllAddress(username)
    if(await status){
        // console.log(data)
        
        let indexD= data.findIndex(x=>{
            return x.isDefault==true
        })
        console.log(indexD)
        if(data[indexD]!=undefined){
            if(await data.length==0){
                getDataStatus.value=false
            }else{
                getDataStatus.value=true
                addressDefault.value=data[indexD] //assign data to attribute
                data.splice(indexD, 1)
                addressList.value = data //remove data default
                
                console.log(data)
            }
            
            // console.log(indexD)
        }
        // // addressList.value=data
        // console.log(addressList.value)
        // console.log(addressDefault.value)
        
    }else{
        isShowAlert.value=true
        alertType.value=1
        alertDetail.value="Oops! It seems like there's a server error at the moment. Please try again later."
        alertTime.value=10
        getDataStatus.value=false
    }
}
const deleteAddress =async()=>{
    // console.log(addressId.value)
    // let status =true
    let {status,msg}= await fetch.deleteAddressById(userName.value,addressId.value)
    if(await status){
        // close overlay
        isDelete.value=false
        console.log("close overlay")
        await getAddress()
    }else {
        //error 
        isDelete.value=false
        isShowAlert.value=true
        alertType.value=1
        alertDetail.value="Oops! It seems like there's a server error at the moment. Please try again later."
        alertTime.value=10
    }
}

const setDefaultAddress = async (addressId) => {
    let {status,msg}= await fetch.updateAddressById(userName.value,addressId, {isDefault: true})
    if(await status){
        // close overlay
        isDelete.value=false
        console.log("close overlay")
        await getAddress()
    }else {
        //error 
        isDelete.value=false
        isShowAlert.value=true
        alertType.value=1
        alertDetail.value="Oops! It seems like there's a server error at the moment. Please try again later."
        alertTime.value=10
    }
}


// reset show alert status
const getShowAlertChange=(input)=>{
    isShowAlert.value=input
    alertType.value=0
    alertDetail.value=''
    alertTime.value=2
}

onBeforeMount(async()=>{
    // console.log(userName.value)
    await getAddress()
})
</script>
<template>
    <div class="wrapper_all">
        <div class="wrapper_address">
            <div class="address">
                <div class="header_address">
                    <h4>
                        Addresses
                    </h4>
                    <button @click="goAdd">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 0C5.26522 0 5.51957 0.105357 5.70711 0.292893C5.89464 0.48043 6 0.734784 6 1V4H9C9.26522 4 9.51957 4.10536 9.70711 4.29289C9.89464 4.48043 10 4.73478 10 5C10 5.26522 9.89464 5.51957 9.70711 5.70711C9.51957 5.89464 9.26522 6 9 6H6V9C6 9.26522 5.89464 9.51957 5.70711 9.70711C5.51957 9.89464 5.26522 10 5 10C4.73478 10 4.48043 9.89464 4.29289 9.70711C4.10536 9.51957 4 9.26522 4 9V6H1C0.734784 6 0.48043 5.89464 0.292893 5.70711C0.105357 5.51957 0 5.26522 0 5C0 4.73478 0.105357 4.48043 0.292893 4.29289C0.48043 4.10536 0.734784 4 1 4H4V1C4 0.734784 4.10536 0.48043 4.29289 0.292893C4.48043 0.105357 4.73478 0 5 0Z" fill="white"/>
                        </svg>
                        New Address
                    </button>
                </div>
                <!-- default -->
                <!-- <BaseBankItemList name="address_default" :dataList="[addressDefault]" :isDefault="true" @showConfirm="showConfirm" @goUpdate="goUpdate" @setDefaultAddress="setDefaultAddress" /> -->
                <div v-if="addressDefault!=undefined" class="wrapper_address_component">
                    <BaseBankItem name="address_default"  :item-name="addressDefault.addressname" :item-id="addressDefault.addressId" :item-description="`${addressDefault.address} ${addressDefault.province} ${addressDefault.distrinct} ${addressDefault.subDistrinct} ${addressDefault.postalCode}`"
                    :item-number="addressDefault.phone" :is-default="true" :show-set-d-btn="false" :show-bin-btn="false" :showDefaultIcon="true" @goUpdate="goUpdate" />
                </div>
                
                <!-- address list -->
                <!-- <BaseBankItemList name="address_list" :dataList="addressList"  @goUpdate="goUpdate" @showConfirm="showConfirm" @setDefaultAddress="setDefaultAddress" /> -->
                <div v-if="getDataStatus==true" v-for="(address,index) of addressList" :key="index"  class="wrapper_address_component">
                    <BaseBankItem name="address_item"  :item-name="address.addressname" :item-id="address.addressId" :item-description="`${address.address} ${address.province} ${address.distrinct} ${address.subDistrinct} ${address.postalCode}`"
                    :item-number="address.phone" :is-default="true"  @showConfirm="showConfirm" @goUpdate="goUpdate" @setDefaultBank="setDefaultAddress" />
                </div> 
                <BaseEmptyList name="address_list" title="You don’t have address yet." :showEmpty="getDataStatus" />
                <!-- create new -->
                <div class="create_new_mobile">
                    <button @click="goAdd">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M5 0C5.26522 0 5.51957 0.105357 5.70711 0.292893C5.89464 0.48043 6 0.734784 6 1V4H9C9.26522 4 9.51957 4.10536 9.70711 4.29289C9.89464 4.48043 10 4.73478 10 5C10 5.26522 9.89464 5.51957 9.70711 5.70711C9.51957 5.89464 9.26522 6 9 6H6V9C6 9.26522 5.89464 9.51957 5.70711 9.70711C5.51957 9.89464 5.26522 10 5 10C4.73478 10 4.48043 9.89464 4.29289 9.70711C4.10536 9.51957 4 9.26522 4 9V6H1C0.734784 6 0.48043 5.89464 0.292893 5.70711C0.105357 5.51957 0 5.26522 0 5C0 4.73478 0.105357 4.48043 0.292893 4.29289C0.48043 4.10536 0.734784 4 1 4H4V1C4 0.734784 4.10536 0.48043 4.29289 0.292893C4.48043 0.105357 4.73478 0 5 0Z"
                                fill="white" />
                        </svg>
                        New Address
                    </button>
                </div>
            </div>   
            <BaseConfirm name="address_list_confirm" header-confirm="Do you want to delete the current address?" submit-title="Delete" :show-confirm="isDelete" @cancel="confirmAddress()" @submit="confirmAddress(true)" /> 
            <!-- <div v-show="isDelete" class="wrapper_confirm_delete">
                <div class="confirm_delete">
                    <h5>
                        Do you want to delete the current address?
                    </h5>
                    <div>
                        <button @click="confirmAddress()">
                            Cancel
                        </button>
                        <button @click="confirmAddress(true)">
                            Delete
                        </button>    
                    </div>
                    
                </div>
            </div>  -->
        </div>
        <BaseAlert name="address_list_alert" :show-alert="isShowAlert" :alert-detail="alertDetail" :alert-status="alertType" :second="alertTime" @getShowAlertChange="getShowAlertChange"/>
    </div>
</template>
<style scoped>
*{
    box-sizing: border-box;
}
.wrapper_all {
    overflow: hidden;
    border: none;
    border-radius: min(0.556dvw,8px);
    box-shadow: 0px min(0.069dvw,1px) min(0.208dvw,3px) rgba(0, 0, 0, 0.1), 0px min(0.069dvw,1px) min(0.139dvw,2px) rgba(0, 0, 0, 0.06);
    /* gap: 24px; */
}
.wrapper_address{
    display: flex;
    position: relative;
    width: inherit;
    height: fit-content;
    padding: min(1.389dvw,20px);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: min(0.556dvw,8px);
    background-color: #FFFFFF;
}
.address{
    display: flex;
    width: 100%;
    height: inherit;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: min(0.972dvw,14px);
}
.header_address{
    display: flex;
    width: 100%;
    height: fit-content;
    justify-content: space-between;
    align-items: center;
}
.header_address >h4{
    display: flex;
    width: 100%;
    /* width: inherit; */
    height: min(1.944dvw,28px);
    font-size: min(1.25dvw,18px);
    font-weight: 500;
    color: #212121;
    align-items: center;
}
.create_new_mobile{
    display: none;
}
.header_address >button{
    display: flex;
    width: fit-content;
    height: min(2.5dvw,36px);
    border-radius: min(0.278dvw,4px);
    border: none;
    padding: min(0.556dvw,8px) min(0.833dvw,12px) min(0.556dvw,8px) min(0.556dvw,8px);
    gap: min(0.278dvw,4px);
    background-color: #26AC34;
    color: #fff;
    font-size: min(0.972dvw,14px);
    font-weight: 500;
    box-shadow: 0px min(0.069dvw,1px) min(0.139dvw,2px) 0px #0000000D;
    align-items: center;
    justify-content: start;
    cursor: pointer;
}
.header_address> button >svg{
    width: min(0.694dvw,10px);
    height: min(0.694dvw,10px);
    margin: min(0.347dvw,5px);
}
.address .wrapper_address_component{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
}

/* mobile */
@media (width<=432px){
    .wrapper_all{
        border-radius: 0px;
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px min(0.069dvw,1px) min(0.139dvw,2px) rgba(0, 0, 0, 0.06);
    }
    .wrapper_address{
        padding: 20px;
        border-radius: 0px;
    }
    .address{
        gap: 24px;
    }
    /* .header_address{
    } */
    .header_address >h4{
        height: 24px;
        font-size: 16px;
    }
    /* old button */
    .header_address >button{
        display:none;
    }
    
    /* create new mobile */
    .create_new_mobile{
        display: flex;
        width: 100%;
        height: fit-content;
        flex-direction: column;
    }
    .create_new_mobile >button{
        display: flex;
        width: 100%;
        height: 36px;
        border-radius: 4px;
        border: none;
        padding: 8px 12px 8px 8px;
        gap: 4px;
        background-color: #26AC34;
        color: #fff;
        font-size: 14px;
        line-height: 144%;
        font-weight: 500;
        box-shadow: 0px 1px 2px 0px #0000000D;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        white-space: nowrap
    }
    .create_new_mobile >button >svg {
        width: 10px;
        height: 10px;
        margin: 5px;
    }
}

/* start */
/* .container_address{
    display: flex;
    width: 100%;
    height: fit-content;
    justify-content: center;
    align-items: start;
}
.address_list{
    display: flex;
    width: inherit;
    height: inherit;
    flex-direction: column;
    gap: min(1.667dvw,24px);
}
.address_item{
    display: flex;
    width: inherit;
    height: fit-content;
    flex-direction: column;
    padding-top: min(1.667dvw,24px);
    border-top: min(0.069dvw,1px) solid ;
    border-color: #E0E0E0;
    justify-content: end;
    gap: min(0.278dvw,4px);
}
.title{
    display: flex;
    width: inherit;
    height: min(1.667dvw,24px);
    justify-content: space-between;
    align-items: center;
}
.title .info{
    display: flex;
    width: fit-content;
    height: inherit;
    gap: min(0.556dvw,8px);
    align-items: center;
}
.info h5{
    font-size: min(1.111dvw,16px);
    font-weight: 500;
    color: #212121;
    padding-right: min(0.556dvw,8px);
    border-right: min(0.069dvw,1px) solid;
    border-color: #E0E0E0;
}
.info p{
    font-size: min(0.972dvw,14px);
    font-weight: 400;
    color: #616161;

}
.title .operation{
    display: flex;
    width: min(3.333dvw,48px);
    height: inherit;
    gap: min(0.556dvw,8px);
    justify-content: center;
    align-items: center;
}
.operation button{
    display: flex;
    width: min(1.389dvw,20px);
    height: min(1.389dvw,20px);
    border: none;
    background-color: #fff;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.address_item > p{
    display: flex;
    width: min(37.5dvw,540px);
    height: fit-content;
    font-weight: 400;
    font-size: 14px;
    color: #616161;
} */
/* end */
/* .wrapper_confirm_delete{
    display: flex;
    position: fixed;
    width: 100%;
    height: 100dvh;
    background-color: #00000040;
    top: 0;
    left: 0;
    z-index: 999;
    justify-content: center;
    align-items: center;
}
.confirm_delete{
    display: flex;
    width: min(31.111dvw,448px);
    height: min(10.278dvw,148px);
    flex-direction: column;
    background-color: #fff;
    padding: min(2.222dvw,32px) min(2.778dvw,40px);
    border-radius: min(0.556dvw,8px);
    gap: min(1.667dvw,24px);
}
.confirm_delete h5{
    display: flex;
    width: 100%;
    height: min(1.667dvw,24px);
    font-size: min(1.111dvw,16px);
    font-weight: 500;
    justify-content: center;
    align-items: center;
}
.confirm_delete div{
    display: flex;
    width: 100%;
    height: fit-content;
    gap: min(0.556dvw,8px);
    justify-content: center;
    align-items: center;
}
.confirm_delete div button{
    display: flex;
    width: min(5.556dvw,80px);
    height: min(2.5dvw,36px);
    justify-content: center;
    align-items: center;
    border-radius: min(0.278dvw,4px);
    padding: min(0.556dvw,8px) min(0.833dvw,12px);
    box-shadow: 0px min(0.069dvw,1px) min(0.139dvw,2px) 0px #0000000D;
    cursor: pointer;
}
.confirm_delete div button:nth-child(1){
    border: min(0.069dvw,1px) solid;
    border-color: #E0E0E0;
    background-color: #fff;
    color: #212121;

}
.confirm_delete div button:nth-child(2){
    background-color: #26AC34;
    color: #fff;
    border: none;
} */
</style>