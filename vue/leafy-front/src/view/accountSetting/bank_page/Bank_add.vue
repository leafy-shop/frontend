<script setup>
import {useRouter,useRoute} from 'vue-router'
import {ref,computed,onBeforeMount} from 'vue'
import fetch from '../../../JS/api'
import validation from '../../../JS/validation'
import cookie from '../../../JS/cookie'
// link
const myRouter=useRouter()
const goBanks=()=>myRouter.push({name:'Bank_AS'})
//common attribute
const bankOrigin=ref({})
const {params} =useRoute()
const userName=ref('')
const paymentId=ref('')
const bankList=[
    {name:"ธนาคารกรุงเทพ จำกัด ( BBL )",value:"BBL"},
    {name:"ธนาคารกสิกรไทย ( KBANK )",value:"KBANK"},
    {name:"ธนาคารไทยพาณิชย์ ( SCB )",value:"SCB"},
    {name:"ธนาคารกรุงศรีอยุธยา ( BAY )",value:"BAY"},
    {name:"ธนาคารออมสิน ( GSB )",value:"GSB"},
    {name:"ธนาคารกรุงไทย ( KTB )",value:"KTB"},
    {name:"ธนาคารทหารไทย ( TMB )",value:"TMB"},
    {name:"ธนาคารทหารไทยธนชาติ ( TTB )",value:"TTB"},
    {name:"ธนาคารซิตี้แบงค์ ( CITI )",value:"CITI"},
    
]
const isEditMode=ref(false)
const paymentName=ref('')
const accountNumber=ref('')
const bankName=ref('')
// status
const paymentNameS=ref(false)
const accountNumberS=ref(false)
const bankNameS=ref(false)
//message
const paymentNameM=ref('')
const accountNumberM=ref('')
const bankNameM=ref('')

const isPayment=computed(()=>{
    let returnData ={status:false,data:{}}
    console.log(bankOrigin.value)
    //ชื่อ
    if(paymentName.value!=bankOrigin.value.bankname){
        returnData.status=true
        returnData.data['bankname']=paymentName.value
    }
    // เลขธนาคาร
    if(accountNumber.value!=bankOrigin.value.bankAccount){
        returnData.status=true
        returnData.data['bankAccount']=accountNumber.value
    }
    // ชื่อย่อธนาคาร
    if(bankName.value!=bankOrigin.value.bankCode){
        returnData.status=true
        returnData.data['bankCode']=bankName.value
    }
    
    return returnData
})

// get only use edit mode
const getPaymentById=async()=>{
    let {status,msg,data}=await fetch.getPaymentById(userName.value,paymentId.value)
    if(status){
        bankOrigin.value=data
        // console.log(bankOrigin.value)
        // assign value
        paymentName.value=data.bankname
        accountNumber.value=data.bankAccount
        bankName.value=data.bankCode        
    }
}

const bankSubmit=async()=>{
    let submitStatus=true
    // validation
    if(paymentName.value.length==0){
        submitStatus=false
        paymentNameS.value=true
        paymentNameM.value="Please input your payment' name"
        console.log('submit')

    }
    if(accountNumber.value.length==0){
        submitStatus=false
        accountNumberS.value=true
        accountNumberM.value="Please input your account number"
        console.log('submit')

    }
    if(bankName.value.length==0){
        submitStatus=false
        bankNameS.value=true
        bankNameM.value="Please input your bank name"
        console.log('submit')

    }
    // console.log('submit')

    if(submitStatus){
        // console.log(bank)
        // select mode
        if(!isEditMode.value){
        // console.log("not edit mode")

            // let data={
            //     bankName:paymentName.value,
            //     bankCode:bankName.value,
            //     bankAccount:accountNumber.value
            // }
            console.log(isPayment.value.data)
            // console.log(data)
            let {status,msg}=await fetch.addPayment(isPayment.value.data)
            if(status){
                console.log("add payment success")
                goBanks()
            }    
        }else //edit mode
        if(isEditMode.value&&paymentId.value.length!=0){
            // console.log('edit mode')
            // check only data that change  if not can not edit
            if(isPayment.value.status){
                console.log(isPayment.value.data)
                let {status,msg} =await fetch.updatePaymentById(userName.value,paymentId.value,isPayment.value.data)
                if(status){
                    console.log('update success')
                    goBanks()
                }else{
                    // error from server
                }
            }
        }
        
    }
}

onBeforeMount(async()=>{
    //get username
    let {username}=cookie.decrypt()
    userName.value=username 
    // check params
    if(params.id!=undefined&&params.id.length!=0){
        paymentId.value=validation.decrypt(params.id)
        // console.log(validation.decrypt(params.id))
        isEditMode.value=true
        // console.log(params.id)
        await getPaymentById()
    }
})
</script>
<template>
<div class="wrapper_bank">
    <div class="bank">
        <h4>
            Add New Bank Account
        </h4>
        <div class="container_bank">
            <!-- name -->
            <div class="input_field">
                <h5>
                    Name
                </h5>
                <input v-model="paymentName" class="input" type="text">
                <!-- worning -->
                <div v-show="paymentNameS" class="wrapper_errorMsg">
                    <div >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 8.99951C1.5 4.86026 4.86 1.49951 9 1.49951C13.1475 1.49951 16.5 4.86026 16.5 8.99951C16.5 13.1403 13.1475 16.4995 9 16.4995C4.86 16.4995 1.5 13.1403 1.5 8.99951ZM8.34 6.15701C8.34 5.79776 8.64 5.49701 9 5.49701C9.36 5.49701 9.6525 5.79776 9.6525 6.15701V9.47201C9.6525 9.83276 9.36 10.1245 9 10.1245C8.64 10.1245 8.34 9.83276 8.34 9.47201V6.15701ZM9.0075 12.5103C8.64 12.5103 8.3475 12.2103 8.3475 11.8503C8.3475 11.4903 8.64 11.1978 9 11.1978C9.3675 11.1978 9.66 11.4903 9.66 11.8503C9.66 12.2103 9.3675 12.5103 9.0075 12.5103Z" fill="#F75555"/>
                        </svg>
                        <p>
                            {{paymentNameM}}
                        </p>
                    </div>
                </div>
            </div>
                
            <!-- Account_number -->
            <div class="input_field">
                <h5>
                    Account number
                </h5>
                <input v-model="accountNumber" class="input" type="text" maxlength="12">
                <!-- worning -->
                <div v-show="accountNumberS" class="wrapper_errorMsg">
                    <div >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 8.99951C1.5 4.86026 4.86 1.49951 9 1.49951C13.1475 1.49951 16.5 4.86026 16.5 8.99951C16.5 13.1403 13.1475 16.4995 9 16.4995C4.86 16.4995 1.5 13.1403 1.5 8.99951ZM8.34 6.15701C8.34 5.79776 8.64 5.49701 9 5.49701C9.36 5.49701 9.6525 5.79776 9.6525 6.15701V9.47201C9.6525 9.83276 9.36 10.1245 9 10.1245C8.64 10.1245 8.34 9.83276 8.34 9.47201V6.15701ZM9.0075 12.5103C8.64 12.5103 8.3475 12.2103 8.3475 11.8503C8.3475 11.4903 8.64 11.1978 9 11.1978C9.3675 11.1978 9.66 11.4903 9.66 11.8503C9.66 12.2103 9.3675 12.5103 9.0075 12.5103Z" fill="#F75555"/>
                        </svg>
                        <p>
                            {{accountNumberM}}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Bank name -->
            <div class="input_field">
                <h5>
                    Bank name
                </h5>
                <!-- <input v-model="bankName" class="input" type="text"> -->
                <select v-model="bankName"  class="input">
                    <option value="" selected hidden>Select your bank account</option>
                    <option v-for="(bank,index) of  bankList" :key="index" :value="bank.value">{{ bank.name }} </option>
                </select>
                <!-- worning -->
                <div v-show="bankNameS" class="wrapper_errorMsg">
                    <div >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 8.99951C1.5 4.86026 4.86 1.49951 9 1.49951C13.1475 1.49951 16.5 4.86026 16.5 8.99951C16.5 13.1403 13.1475 16.4995 9 16.4995C4.86 16.4995 1.5 13.1403 1.5 8.99951ZM8.34 6.15701C8.34 5.79776 8.64 5.49701 9 5.49701C9.36 5.49701 9.6525 5.79776 9.6525 6.15701V9.47201C9.6525 9.83276 9.36 10.1245 9 10.1245C8.64 10.1245 8.34 9.83276 8.34 9.47201V6.15701ZM9.0075 12.5103C8.64 12.5103 8.3475 12.2103 8.3475 11.8503C8.3475 11.4903 8.64 11.1978 9 11.1978C9.3675 11.1978 9.66 11.4903 9.66 11.8503C9.66 12.2103 9.3675 12.5103 9.0075 12.5103Z" fill="#F75555"/>
                        </svg>
                        <p>
                            {{bankNameM}}
                        </p>
                    </div>
                </div>
            </div>
            
            <!-- submit -->
            <div class="submit">
                <button @click="goBanks()">
                    Cancel
                </button>
                <button @click="bankSubmit()">
                    Save
                </button>
            </div>
        </div>
        
    </div>
    
</div>
</template>
<style scoped>
*{
    box-sizing: border-box;
}

.wrapper_bank{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: #fff;
}
.bank{
    display: flex;
    width: inherit;
    height: inherit;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 24px;
}
.bank h4{
    display: flex;
    width: 100%;
    height: 28px;
    font-size: 18px;
    font-weight: 500;
    align-items: center;
}
.container_bank{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    gap: 24px;
}
.container_bank .inputs{
    display: flex;
    width: 100%;
    height: fit-content;
    gap: 24px;
    justify-content: start;
    align-items: center;
}
.input_field{
    display: flex;
    width: 100%;
    height: fit-content;
    gap: 4px;
    flex-direction: column;
}
.input_field h5{
    width: fit-content;
    height: 20px;
    font-size: 14px;
    font-weight: 500;
    color: #212121;
}
.input_field .input{
    width: 100%;
    height: 36px;
    border: 1px solid;
    border-radius: 4px;
    border-color: #D1D5DB;
    box-shadow: 0px 1px 2px 0px #0000000D;
    padding: 8px 12px;
}


.submit{
    display: flex;
    width: 100%;
    height: 60px;
    padding: 12px 24px;
    gap: 8px;
    justify-content: end;
}
.submit button{
    width: 80px;
    height: 36px;
    border: 1px solid;
    padding: 8px 12px;
    border-radius: 4px;
    border-color: #E0E0E0;
    box-shadow: 0px 1px 2px 0px #0000000D;
    cursor: pointer;
}
.submit button:nth-child(1){
    background-color: #fff;
    color: #212121;
}
.submit button:nth-child(2){
    background-color: #26AC34;
    color: #fff;
}
.wrapper_errorMsg{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    padding: min(0.556dvw,8px) min(0.833dvw,12px);
    font-size: min(0.833dvw,12px);
    border-radius: min(0.278dvw,4px);
    background-color: rgba(245, 72, 74, 0.08);
    gap: min(0.556dvw,8px)
}
.wrapper_errorMsg div{
    display: flex;
    width: inherit;
    height: inherit;
    gap: min(0.278dvw,4px);
}
.wrapper_errorMsg div svg{
    width: min(1.042dvw,15px);
    height: min(1.042dvw,15px);
}
.wrapper_errorMsg div p{
    width: 100%;
    font-size:min(0.833dvw,12px);
    font-style: normal;
    font-weight: 400;
    line-height: 136%; /* 16.32px */
    letter-spacing: 0.2px;
    color: #F75555;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>