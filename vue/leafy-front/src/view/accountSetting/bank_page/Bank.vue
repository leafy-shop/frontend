<script setup>
import { useRouter } from 'vue-router'
import { ref, onBeforeMount, computed } from 'vue'
import validation from '../../../JS/validation'
import cookie from '../../../JS/cookie';
import fetch from '../../../JS/api';
import bankTypeList from '../../../JS/enum/bankAccount.js'
import BaseBankItemList from '../../../components/bank/BaseBankItemList.vue';
import BaseAlert from '../../../components/BaseAlert.vue';
// link
const myRouter = useRouter()
const goAdd = () => myRouter.push({ name: 'Bank_AS_add', params: { method: 'new-bank' } })
const goUpdate = (id) => myRouter.push({ name: 'Bank_AS_add', params: { method: 'edit-bank', id: validation.encrypt(id) } })
// for display confirm delete
const isDelete = ref(false)
// common attribute
const userName = ref('')
const bankList = ref([])
const bankId = ref('')
const bankDefault=ref(undefined)//for default data
// alert attribute
const isShowAlert=ref(false)
const alertType=ref(0)
const alertDetail=ref('')
const alertTime=ref(2)

// const isBank=computed({
//for match full name
// const fullNameBank = (keyword) => {
//     //find keyword match to data then find index of that information
//     let index = bankTypeList.map((x) => x.value == keyword).indexOf(true)
//     // console.log(index)
//     if (index != -1) return bankTypeList[index].name;


// }
// })
const showConfirm = (id) => {
    isDelete.value = true
    bankId.value = id
}

const confirmBank = async (input = false) => {
    if (!input) isDelete.value = false;
    else {

        // delete api
        // console.log("delete function")
        if (bankId.value.length != 0) {
            await deleteBank();
            // console.log(addressId.value)
        }
        else {
            isDelete.value = false
            console.log("close overlay")

        }
    }
}

const getBank = async () => {
    let { username } = cookie.decrypt()
    userName.value = username
    let { status, msg, data } = await fetch.getAllPayment(username)
    if (await status) {
        // remove default data list
        // get default 
        // let [indexD]= data.map(x=>{
        //     if(x.isDefault==true){
        //         return data.indexOf(x) //return default data
        //     }
        // })
        let indexD= data.findIndex(x=>{
            return x.isDefault==true
        })
        if(data[indexD]!=undefined){
            bankDefault.value=data[indexD] //assign data to attribute
            data.splice(indexD, 1)
            bankList.value = data //remove data default
            
            console.log(data)
            // console.log(indexD)
        }
    }else{
        isShowAlert.value=true
        alertType.value=1
        alertDetail.value="Oops! It seems like there's a server error at the moment. Please try again later."
        alertTime.value=10
    }
}
const deleteBank = async () => {
    // console.log(addressId.value)
    // let status =true
    let { status, msg } = await fetch.deletePaymentById(userName.value, bankId.value)
    if (await status) {
        // close overlay
        isDelete.value = false
        console.log("close overlay")
        await getBank()
    } else{
        //error 
        isDelete.value = false
        isShowAlert.value=true
        alertType.value=1
        alertDetail.value="Oops! It seems like there's a server error at the moment. Please try again later."
        alertTime.value=10
    }

}

const setDefaultBank = async (paymentId) => {
    let { status, msg } = await fetch.updatePaymentById(userName.value, paymentId, { isDefault: true })
    if (status) {
        // close overlay
        isDelete.value = false
        console.log("close overlay")
        await getBank()
    } else {
        //error 
        isDelete.value = false
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

onBeforeMount(async () => {

    // console.log(userName.value)
    await getBank()
})
</script>
<template>
    <div class="wrapper_all">
        <div class="wrapper_bank">
            <div class="bank">
                <div class="header_bank">
                    <div class="header_detail">
                        <h4>
                            Bank Accounts
                        </h4>
                        <p>
                            These bank accounts will be used for buyer refund or to receive seller’s sales amount displayed
                            in Seller Balance.
                        </p>
                    </div>

                    <button @click="goAdd">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M5 0C5.26522 0 5.51957 0.105357 5.70711 0.292893C5.89464 0.48043 6 0.734784 6 1V4H9C9.26522 4 9.51957 4.10536 9.70711 4.29289C9.89464 4.48043 10 4.73478 10 5C10 5.26522 9.89464 5.51957 9.70711 5.70711C9.51957 5.89464 9.26522 6 9 6H6V9C6 9.26522 5.89464 9.51957 5.70711 9.70711C5.51957 9.89464 5.26522 10 5 10C4.73478 10 4.48043 9.89464 4.29289 9.70711C4.10536 9.51957 4 9.26522 4 9V6H1C0.734784 6 0.48043 5.89464 0.292893 5.70711C0.105357 5.51957 0 5.26522 0 5C0 4.73478 0.105357 4.48043 0.292893 4.29289C0.48043 4.10536 0.734784 4 1 4H4V1C4 0.734784 4.10536 0.48043 4.29289 0.292893C4.48043 0.105357 4.73478 0 5 0Z"
                                fill="white" />
                        </svg>
                        New Bank Account
                    </button>
                </div>
                <!-- default -->
                <BaseBankItemList name="bank_default" :dataList="[bankDefault]" :isDefault="true"  @setDefaultBank="setDefaultBank"  @goUpdate="goUpdate" @showConfirm="showConfirm"  />

                <!-- <div v-if="Object.keys(bankDefault).length!=0" class="container_bank">
                    <div class="bank_list">
                        <div class="bank_item">
                            title
                            <div class="title">
                                <div class="info">
                                    <h5>
                                        {{ bankDefault["bankname"] }}
                                    </h5>
                                    <p>
                                        {{ bankDefault["bankAccount"] }}
                                    </p>
                                </div>

                                <div class="operation">

                                    edit
                                    <button @click="goUpdate(bankDefault.paymentId)">
                                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M7.16671 3.16664H3.00004C2.55801 3.16664 2.13409 3.34223 1.82153 3.65479C1.50897 3.96736 1.33337 4.39128 1.33337 4.83331V14C1.33337 14.442 1.50897 14.8659 1.82153 15.1785C2.13409 15.491 2.55801 15.6666 3.00004 15.6666H12.1667C12.6087 15.6666 13.0327 15.491 13.3452 15.1785C13.6578 14.8659 13.8334 14.442 13.8334 14V9.83331M12.655 1.98831C12.8088 1.82912 12.9927 1.70215 13.196 1.6148C13.3994 1.52746 13.6181 1.48148 13.8394 1.47956C14.0607 1.47763 14.2801 1.5198 14.485 1.6036C14.6898 1.6874 14.8759 1.81116 15.0324 1.96765C15.1889 2.12414 15.3126 2.31022 15.3964 2.51505C15.4802 2.71988 15.5224 2.93934 15.5205 3.16064C15.5185 3.38194 15.4726 3.60064 15.3852 3.80398C15.2979 4.00732 15.1709 4.19123 15.0117 4.34497L7.85671 11.5H5.50004V9.14331L12.655 1.98831Z"
                                                stroke="#9E9E9E" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                        </svg>

                                    </button>
                                    bin
                                    <button v-show="false" @click="showConfirm(bankDefault.paymentId)">
                                        <svg width="16" height="18" viewBox="0 0 16 18" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6.33337 8.16667V13.1667M9.66671 8.16667V13.1667M1.33337 4.83333H14.6667M13.8334 4.83333L13.1109 14.9517C13.0809 15.3722 12.8928 15.7657 12.5843 16.053C12.2758 16.3403 11.8699 16.5 11.4484 16.5H4.55171C4.13016 16.5 3.72426 16.3403 3.41578 16.053C3.10729 15.7657 2.91914 15.3722 2.88921 14.9517L2.16671 4.83333H13.8334ZM10.5 4.83333V2.33333C10.5 2.11232 10.4122 1.90036 10.256 1.74408C10.0997 1.5878 9.88772 1.5 9.66671 1.5H6.33337C6.11236 1.5 5.9004 1.5878 5.74412 1.74408C5.58784 1.90036 5.50004 2.11232 5.50004 2.33333V4.83333H10.5Z"
                                                stroke="#9E9E9E" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                        </svg>
                                    </button>    
                                </div>
                            </div>
                            discription
                            <div class="discription">
                                <p>
                                    {{ fullNameBank(bankDefault.bankCode) }}
                                </p>
                                set default
                                <button @click="setDefaultBank(bankDefault.paymentId)">
                                    Set as default
                                </button>

                            </div>
                            default
                            <div class="default_icon" v-show="bankDefault.isDefault" >
                                Default
                            </div>

                            <button @click="setDefaultBank(bank.paymentId)">Set as default</button>
                            <button v-show="bank.isDefault" disabled>Default</button>
                        </div>
                    </div>
                </div> -->
                <!-- bank list -->
                <BaseBankItemList name="bank_list" :dataList="bankList"  @setDefaultBank="setDefaultBank"  @goUpdate="goUpdate" @showConfirm="showConfirm"  />
                
                <!-- bank list -->
                <!-- <div class="container_bank">
                    <div class="bank_list">
                        <div v-show="bankList.length!=0" v-for="(bank, index) of bankList" :key="index" class="bank_item">
                            title
                            <div class="title">
                                <div class="info">
                                    <h5>
                                        {{ bank.bankname }}
                                    </h5>
                                    <p>
                                        {{ bank.bankAccount }}
                                    </p>
                                </div>

                                <div class="operation">

                                    edit
                                    <button @click="goUpdate(bank.paymentId)">
                                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M7.16671 3.16664H3.00004C2.55801 3.16664 2.13409 3.34223 1.82153 3.65479C1.50897 3.96736 1.33337 4.39128 1.33337 4.83331V14C1.33337 14.442 1.50897 14.8659 1.82153 15.1785C2.13409 15.491 2.55801 15.6666 3.00004 15.6666H12.1667C12.6087 15.6666 13.0327 15.491 13.3452 15.1785C13.6578 14.8659 13.8334 14.442 13.8334 14V9.83331M12.655 1.98831C12.8088 1.82912 12.9927 1.70215 13.196 1.6148C13.3994 1.52746 13.6181 1.48148 13.8394 1.47956C14.0607 1.47763 14.2801 1.5198 14.485 1.6036C14.6898 1.6874 14.8759 1.81116 15.0324 1.96765C15.1889 2.12414 15.3126 2.31022 15.3964 2.51505C15.4802 2.71988 15.5224 2.93934 15.5205 3.16064C15.5185 3.38194 15.4726 3.60064 15.3852 3.80398C15.2979 4.00732 15.1709 4.19123 15.0117 4.34497L7.85671 11.5H5.50004V9.14331L12.655 1.98831Z"
                                                stroke="#9E9E9E" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                        </svg>

                                    </button>
                                    bin
                                    <button @click="showConfirm(bank.paymentId)">
                                        <svg width="16" height="18" viewBox="0 0 16 18" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6.33337 8.16667V13.1667M9.66671 8.16667V13.1667M1.33337 4.83333H14.6667M13.8334 4.83333L13.1109 14.9517C13.0809 15.3722 12.8928 15.7657 12.5843 16.053C12.2758 16.3403 11.8699 16.5 11.4484 16.5H4.55171C4.13016 16.5 3.72426 16.3403 3.41578 16.053C3.10729 15.7657 2.91914 15.3722 2.88921 14.9517L2.16671 4.83333H13.8334ZM10.5 4.83333V2.33333C10.5 2.11232 10.4122 1.90036 10.256 1.74408C10.0997 1.5878 9.88772 1.5 9.66671 1.5H6.33337C6.11236 1.5 5.9004 1.5878 5.74412 1.74408C5.58784 1.90036 5.50004 2.11232 5.50004 2.33333V4.83333H10.5Z"
                                                stroke="#9E9E9E" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                        </svg>
                                    </button>    
                                </div>
                            </div>
                            discription
                            <div class="discription">
                                <p>
                                    {{ fullNameBank(bank.bankCode) }}
                                </p>
                                set default
                                <button @click="setDefaultBank(bank.paymentId)">
                                    Set as default
                                </button>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>

            <div v-show="isDelete" class="wrapper_confirm_delete">
                <div class="confirm_delete">
                    <h5>
                        Do you want to delete the current bank account?
                    </h5>
                    <div>
                        <button @click="confirmBank()">
                            Cancel
                        </button>
                        <button @click="confirmBank(true)">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <BaseAlert name="bank_list" :show-alert="isShowAlert" :alert-detail="alertDetail" :alert-status="alertType" :second="alertTime" @getShowAlertChange="getShowAlertChange"/>
    </div>
</template>
<style scoped>
* {
    box-sizing: border-box;
}

.wrapper_all {
    overflow: hidden;
    border: none;
    border-radius: min(0.556dvw,8px);
    box-shadow: 0px min(0.069dvw,1px) min(0.208dvw,3px) rgba(0, 0, 0, 0.1), 0px min(0.069dvw,1px) min(0.139dvw,2px) rgba(0, 0, 0, 0.06);
    /* gap: 24px; */
}

.wrapper_bank {
    display: flex;
    position: relative;
    width: inherit;
    min-width: min(56.667dvw,816px);
    max-width: 100%;
    height: fit-content;
    padding: min(1.389dvw,20px);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* border-radius: 8px; */
    background-color: #FFFFFF;
}

.bank {
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: min(1.667dvw,24px);
}

.header_bank {
    display: flex;
    width: 100%;
    height: fit-content;
    justify-content: space-between;
    align-items: start;
    gap: min(1.389dvw,20px);
}

.header_bank .header_detail {
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    gap: min(0.278dvw,4px);
    align-items: start;
    justify-content: center;
}

.header_bank .header_detail > h4 {
    display: flex;
    width: inherit;
    height: min(1.944dvw,28px);
    font-size: min(1.25dvw,18px);
    font-weight: 500;
    color: #212121;
    align-items: center;
}

.header_bank .header_detail >p {
    display: flex;
    width: inherit;
    height: min(2.778dvw,40px);
    font-weight: 400;
    font-size: min(0.972dvw,14px);
    line-height: 144%;
    color: #757575;
    align-items: center
}

.header_bank >button {
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
    line-height: 144%;
    font-weight: 500;
    box-shadow: 0px min(0.069dvw,1px) min(0.139dvw,2px) 0px #0000000D;
    align-items: center;
    justify-content: start;
    cursor: pointer;
    white-space: nowrap
}

.header_bank >button >svg {
    width: min(0.694dvw,10px);
    height: min(0.694dvw,10px);
    margin: min(0.347dvw,5px);
}
/* // */
/* .container_bank {
    display: flex;
    width: 100%;
    height: fit-content;
    justify-content: center;
    align-items: start;
    
}

.bank_list {
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    gap: min(0.833dvw,12px);
}

.bank_item {
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    border-top: min(0.069dvw,1px) solid ;
    border-color: #E0E0E0;
    justify-content: end;
    padding-top: min(0.833dvw,12px);
    gap: min(0.278dvw,4px);
}

.title {
    display: flex;
    width: inherit;
    height: min(1.667dvw,24px);
    justify-content: space-between;
    align-items: center;
}

.title .info {
    display: flex;
    width: fit-content;
    height: inherit;
    gap: min(0.556dvw,8px);
    align-items: center;
}

.info >h5 {
    font-size: min(1.111dvw,16px);
    font-weight: 500;
    color: #212121;
    padding-right: min(0.556dvw,8px);
    border-right: min(0.069dvw,1px) solid;
    border-color: #E0E0E0;
}

.info >p {
    font-size: min(0.972dvw,14px);
    font-weight: 400;
    color: #616161;

}

.title .operation {
    display: flex;
    width: min(3.333dvw,48px);
    height: inherit;
    gap: min(0.556dvw,8px);
    justify-content: center;
    align-items: center;
}

.operation> button {
    display: flex;
    width: min(1.389dvw,20px);
    height: min(1.389dvw,20px);
    border: none;
    background-color: #fff;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.bank_item .discription{
    display: flex;
    width: 100%;
    min-width: fit-content;
    height: fit-content;
    justify-content: space-between;
}
.discription p {
    display: flex;
    width: min(37.5dvw,540px);
    height: fit-content;
    font-weight: 400;
    font-size: min(0.972dvw,14px);
    line-height: 144%;
    color: #616161;
}
.discription button{
    display: flex;
    width: fit-content;
    height: min(1.667dvw,24px);
    justify-content: center;
    align-items: center;
    border: min(0.069dvw,1px) solid;
    padding: min(0.278dvw,4px) min(0.833dvw,12px);
    border-color: #E0E0E0;
    background-color: #fff;
    box-shadow: 0px min(0.069dvw,1px) min(0.139dvw,2px) 0px #0000000D;
    border-radius: min(0.278dvw,4px);
    font-size: min(0.833dvw,12px);
    line-height: 136%;
    font-weight: 500;
    color: #212121;
    cursor: pointer;
}
.default_icon{
    display: flex;
    width: min(4.167dvw,60px);
    height: min(1.389dvw,20px);
    padding: min(0.278dvw,4px) min(0.833dvw,12px);
    justify-content: center;
    align-items: center;
    border: min(0.069dvw,1px) solid;
    border-radius: min(0.278dvw,4px);
    border-color: #26AC34;
    color: #26AC34;
    box-shadow: 0px min(0.069dvw,1px) min(0.139dvw,2px) 0px #0000000D;
    font-size: min(0.694dvw,10px);
    line-height: 120%;
    font-weight: 500;
} */
/* end */
.wrapper_confirm_delete {
    display: flex;
    position: fixed;
    width: 100%;
    height: 100dvh;
    background-color: #00000040;
    top: 0;
    left: 0;
    z-index: 999;
    /* opacity: 25%; */
    justify-content: center;
    align-items: center;
}

.confirm_delete {
    display: flex;
    width: min(31.111dvw,448px);
    height: min(10.278dvw,148px);
    flex-direction: column;
    background-color: #fff;
    padding: min(2.222dvw,32px) min(2.778dvw,40px);
    border-radius: min(0.556dvw,8px);
    gap: min(1.667dvw,24px);
}

.confirm_delete h5 {
    display: flex;
    width: 100%;
    height: min(1.667dvw,24px);
    font-size: min(1.111dvw,16px);
    font-weight: 500;
    /* text-align: center; */
    justify-content: center;
    align-items: center;
}

.confirm_delete div {
    display: flex;
    width: 100%;
    height: fit-content;
    gap: min(0.556dvw,8px);
    justify-content: center;
    align-items: center;
}

.confirm_delete div button {
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

.confirm_delete div button:nth-child(1) {
    border: min(0.069dvw,1px) solid;
    border-color: #E0E0E0;
    background-color: #fff;
    color: #212121;

}

.confirm_delete div button:nth-child(2) {
    background-color: #26AC34;
    color: #fff;
    border: none;
}
</style>