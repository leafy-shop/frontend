<script setup>
import {useRouter,useRoute} from 'vue-router'
import {ref,computed,onBeforeMount} from 'vue'
import fetch from '../../../JS/api'
import validation from '../../../JS/validation'
import cookie from '../../../JS/cookie'
// link
const myRouter=useRouter()
const goAddress=()=>myRouter.push({name:'Bank_AS'})
//common attribute
const bankOrigin={}
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
    if(paymentName.value!=bankOrigin.value){
        // ...
    }
    return 
})

// get only use edit mode
const getPaymentById=async()=>{
    let {status,msg,data}=await fetch.getPaymentById(userName.value,paymentId.value)
    if(status){
        bankOrigin.value=data
        console.log(bankOrigin.value)
        // assign value
        
    }
}

const bankSubmit=async()=>{
    let submitStatus=true
    // validation
    if(paymentName.value.length==0){
        submitStatus=false
        paymentNameS.value=true
        paymentNameM.value="Please input your payment' name"
    }
    if(accountNumber.value.length==0){
        submitStatus=false
        accountNumberS.value=true
        accountNumberM.value="Please input your account number"
    }
    if(bankName.value.length==0){
        submitStatus=false
        bankNameS.value=true
        bankNameM.value="Please input your bank name"
    }

    if(submitStatus){
        let data={
            bankName:paymentName.value,
            bankCode:bankName.value,
            bankAccount:accountNumber.value
        }
        let {status,msg}=await fetch.addPayment(data)
        if(status){
            console.log("add payment success")
        }
    }
}

onBeforeMount(async()=>{
    //get username
    let {username}=cookie.decrypt()
    userName.value=username 
    // check params
    if(params.id!=undefined&&params.id.length!=0){
        validation.decrypt(params.id)
        isEditMode.value=true
        console.log(params.id)
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
            </div>
                
            <!-- Account_number -->
            <div class="input_field">
                <h5>
                    Account number
                </h5>
                <input v-model="accountNumber" class="input" type="text">
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
            </div>
            
            <!-- submit -->
            <div class="submit">
                <button @click="goAddress()">
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
    height: 60px;
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

</style>