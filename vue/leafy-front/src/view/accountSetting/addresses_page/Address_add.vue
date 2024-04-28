<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, computed, onBeforeMount } from 'vue'
import fetch from '../../../JS/api'
import validation from '../../../JS/validation'
import cookie from '../../../JS/cookie'
import BaseAlert from '../../../components/BaseAlert.vue'
import BaseSubmit from '../../../components/accountSetting/BaseSubmit.vue'
// common attribute
const { params } = useRoute()
const addressId = ref('')
const userName = ref('')
const addressOrigin = ref({})
// link
const myRouter = useRouter()
const goAddress = () => myRouter.push({ name: 'Address_AS' })

// attribute
const addressName = ref('')
const addressPhone = ref('')
const address = ref('')
const addressProvince = ref('')
const addressDistrinct = ref('')
const addressSubDistrinct = ref('')
const addressZip = ref('')
//status
const nameS = ref(false)
const phoneS = ref(false)
const addressS = ref(false)
const provinceS = ref(false)
const districtS = ref(false)
const subDistrictS = ref(false)
const zipS = ref(false)
//msg
const nameM = ref('')
const phoneM = ref('')
const addressM = ref('')
const provinceM = ref('')
const districtM = ref('')
const subDistrictM = ref('')
const zipM = ref('')
//change mode
const isEditMode = ref(false)

// alert attribute
const isShowAlert=ref(false)
const alertType=ref(0)
const alertDetail=ref('')
const alertTime=ref(2)


// only use in edit mode
const isAddress = computed(() => {
    let returnData = { status: false, data: {} }

    // let status=false
    if (addressName.value != addressOrigin.value.addressname) {
        returnData.status = true
        returnData.data["addressname"] = addressName.value
    }
    if (addressPhone.value != addressOrigin.value.phone) {
        returnData.status = true
        returnData.data["phone"] = addressPhone.value
    }
    if (address.value != addressOrigin.value.address) {
        returnData.status = true
        returnData.data["address"] = address.value
    }
    if (addressProvince.value != addressOrigin.value.province) {
        returnData.status = true
        returnData.data["province"] = addressProvince.value
    }
    if (addressDistrinct.value != addressOrigin.value.distrinct) {
        returnData.status = true
        returnData.data["distrinct"] = addressDistrinct.value
    }
    if (addressSubDistrinct.value != addressOrigin.value.subDistrinct) {
        returnData.status = true
        returnData.data["subDistrinct"] = addressSubDistrinct.value
    }
    if (addressZip.value != addressOrigin.value.postalCode) {
        returnData.status = true
        returnData.data["postalCode"] = addressZip.value
    }
    return returnData
})
// time to submit??
const isSubmitTime=computed(()=>{
    let status =false
    // isAddress mean data change? (edit mode)
    if(isEditMode.value){
        if(isAddress.value.status==false){ //data change
            status=true
        }
        return status
    }else{ //add mode
        if(addressName.value.length==0){ //data not empty
            status=true
        }
        if(addressPhone.value.length==0){
            status=true
        }
        if(address.value.length==0){
            status=true
        }
        if(addressProvince.value.length==0){
            status=true
        }
        if(addressDistrinct.value.length==0){
            status=true
        }
        if(addressSubDistrinct.value.length==0){
            status=true
        }if(addressZip.value.length==0){
            status=true
        }

        return status
    }
   
})
// get only use edit mode
const getAddressById = async () => {
    let { status, msg, data } = await fetch.getAddressById(userName.value, addressId.value)
    if (await status) {
        addressOrigin.value = await data
        console.log(addressOrigin.value)
        // assign value
        addressName.value = data.addressname
        addressPhone.value = data.phone
        address.value = data.address
        addressProvince.value = data.province
        addressDistrinct.value = data.distrinct
        addressSubDistrinct.value = data.subDistrinct
        addressZip.value = data.postalCode
    }else{
        isShowAlert.value=true
        alertType.value=1
        alertDetail.value="Oops! It seems like there's a server error at the moment. Please try again later."
        alertTime.value=10
        getDataStatus.value=false
    }
}
// submit button
const AddressSubmit = async () => {
    let submitStatus = true
    if (!validation.text(addressName.value) || !validation.textRange(addressName.value, 50, 1)) {
        submitStatus = false
        nameS.value = true
        nameM.value = "Your address's name is invalid"
    }
    if (!validation.textRange(address.value, 50, 1)) {
        submitStatus = false
        addressS.value = true
        addressM.value = "Your address is invalid"
    }
    if (!validation.text(addressProvince.value) || !validation.textRange(addressProvince.value, 50, 1)) {
        submitStatus = false
        provinceS.value = true
        provinceM.value = "Your province is invalid"
    }
    if (!validation.text(addressDistrinct.value) || !validation.textRange(addressDistrinct.value, 50, 1)) {
        submitStatus = false
        districtS.value = true
        districtM.value = "Your district is invalid"
    }
    if (!validation.text(addressSubDistrinct.value) || !validation.textRange(addressSubDistrinct.value, 50, 1)) {
        submitStatus = false
        subDistrictS.value = true
        subDistrictM.value = "Your sub district is invalid"
    }
    if (!validation.number(addressZip.value) || !validation.textRange(addressZip.value, 5, 5)) {
        submitStatus = false
        zipS.value = true
        zipM.value = "Your zip is invalid"
    }
    if (!validation.number(addressPhone.value) || !validation.textRange(addressPhone.value, 11, 10)) {
        submitStatus = false
        phoneS.value = true
        phoneM.value = "Your phone is invalid"
    }
    // check status
    if (submitStatus) {

        // select mode
        if (!isEditMode.value) {
            // console.log(isAddress.value.data)
            // let data={
            //     addressname: addressName.value,
            //     address: address.value,
            //     province: addressProvince.value,
            //     distrinct: addressDistrinct.value,
            //     subDistrinct: addressSubDistrinct.value,
            //     postalCode: addressZip.value,
            // }
            // if(addressPhone.value!=undefined&&)
            // phone: addressPhone.value
            // inputData.value

            let { status, msg } = await fetch.addAddress(userName.value, isAddress.value.data)
            // let status =true
            if (await status) {
                console.log('add new success')
                goAddress()
            } else {
                // error from server
                isShowAlert.value=true
                alertType.value=1
                alertDetail.value="Oops! It seems like there's a server error at the moment. Please try again later."
                alertTime.value=10
                getDataStatus.value=false
            }
        } else //edit mode
            if (isEditMode.value && addressId.value.length != 0) {
                // check only data that change  if not can not edit
                if (isAddress.value.status) {
                    console.log(isAddress.value.data)
                    let { status, msg } = await fetch.updateAddressById(userName.value, addressId.value, isAddress.value.data)
                    if (status) {
                        console.log('update success')
                        goAddress()
                    } else {
                        // error from server
                        isShowAlert.value=true
                        alertType.value=1
                        alertDetail.value="Oops! It seems like there's a server error at the moment. Please try again later."
                        alertTime.value=10
                        getDataStatus.value=false
                    }
                }
            }
    }
}


// reset show alert status
const getShowAlertChange=(input)=>{
    isShowAlert.value=input
    alertType.value=0
    alertDetail.value=''
    alertTime.value=2
    goAddress()
}

onBeforeMount(async () => {
    validation.navigationTo()
    if(cookie.checkKeyPass()){
        //get username
        let { username } = cookie.decrypt()
        userName.value = username
        // check params
        if (params.id != undefined && params.id.length != 0) {
            addressId.value = validation.decrypt(params.id)
            isEditMode.value = true
            console.log(params.id)
            await getAddressById()
        }
        // console.log(isEditMode.value)

    }

})
</script>
<template>
    <div class="wrapper_all">
        <div class="wrapper_address">
        <div class="address">
            <h4 v-if="!isEditMode">
                Add New Address
            </h4>
            <h4 v-else>
                Edit Address
            </h4>
            <div class="container_address">
                <!-- name and phone -->
                <div class="inputs">
                    <!-- name -->
                    <div class="input_field">
                        <h5 class="important_input">
                            Name
                        </h5>
                        <input v-model="addressName" class="input" type="text" maxlength="50">
                        <!-- worning -->
                        <div v-show="nameS" class="wrapper_errorMsg">
                            <div>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M1.5 8.99951C1.5 4.86026 4.86 1.49951 9 1.49951C13.1475 1.49951 16.5 4.86026 16.5 8.99951C16.5 13.1403 13.1475 16.4995 9 16.4995C4.86 16.4995 1.5 13.1403 1.5 8.99951ZM8.34 6.15701C8.34 5.79776 8.64 5.49701 9 5.49701C9.36 5.49701 9.6525 5.79776 9.6525 6.15701V9.47201C9.6525 9.83276 9.36 10.1245 9 10.1245C8.64 10.1245 8.34 9.83276 8.34 9.47201V6.15701ZM9.0075 12.5103C8.64 12.5103 8.3475 12.2103 8.3475 11.8503C8.3475 11.4903 8.64 11.1978 9 11.1978C9.3675 11.1978 9.66 11.4903 9.66 11.8503C9.66 12.2103 9.3675 12.5103 9.0075 12.5103Z"
                                        fill="#F75555" />
                                </svg>
                                <p>
                                    {{ nameM }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- phone -->
                    <div class="input_field">
                        <h5 class="important_input"> 
                            Phone number
                        </h5>
                        <input v-model="addressPhone" class="input" type="text" maxlength="11"
                            placeholder="000-000-0000">
                        <!-- worning -->
                        <div v-show="phoneS" class="wrapper_errorMsg">
                            <div>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M1.5 8.99951C1.5 4.86026 4.86 1.49951 9 1.49951C13.1475 1.49951 16.5 4.86026 16.5 8.99951C16.5 13.1403 13.1475 16.4995 9 16.4995C4.86 16.4995 1.5 13.1403 1.5 8.99951ZM8.34 6.15701C8.34 5.79776 8.64 5.49701 9 5.49701C9.36 5.49701 9.6525 5.79776 9.6525 6.15701V9.47201C9.6525 9.83276 9.36 10.1245 9 10.1245C8.64 10.1245 8.34 9.83276 8.34 9.47201V6.15701ZM9.0075 12.5103C8.64 12.5103 8.3475 12.2103 8.3475 11.8503C8.3475 11.4903 8.64 11.1978 9 11.1978C9.3675 11.1978 9.66 11.4903 9.66 11.8503C9.66 12.2103 9.3675 12.5103 9.0075 12.5103Z"
                                        fill="#F75555" />
                                </svg>
                                <p>
                                    {{ phoneM }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- address -->
                <div class="input_field">
                    <h5 class="important_input">
                        Address
                    </h5>
                    <input v-model="address" class="input" type="text" maxlength="50">
                    <!-- worning -->
                    <div v-show="addressS" class="wrapper_errorMsg">
                        <div>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M1.5 8.99951C1.5 4.86026 4.86 1.49951 9 1.49951C13.1475 1.49951 16.5 4.86026 16.5 8.99951C16.5 13.1403 13.1475 16.4995 9 16.4995C4.86 16.4995 1.5 13.1403 1.5 8.99951ZM8.34 6.15701C8.34 5.79776 8.64 5.49701 9 5.49701C9.36 5.49701 9.6525 5.79776 9.6525 6.15701V9.47201C9.6525 9.83276 9.36 10.1245 9 10.1245C8.64 10.1245 8.34 9.83276 8.34 9.47201V6.15701ZM9.0075 12.5103C8.64 12.5103 8.3475 12.2103 8.3475 11.8503C8.3475 11.4903 8.64 11.1978 9 11.1978C9.3675 11.1978 9.66 11.4903 9.66 11.8503C9.66 12.2103 9.3675 12.5103 9.0075 12.5103Z"
                                    fill="#F75555" />
                            </svg>
                            <p>
                                {{ addressM }}
                            </p>
                        </div>
                    </div>
                </div>
                <!-- province and district -->
                <div class="inputs">
                    <!-- province -->
                    <div class="input_field">
                        <h5 class="important_input">
                            Province
                        </h5>
                        <input v-model="addressProvince" class="input" type="text" maxlength="20">
                        <!-- <select class="input" name="province" >
                        <option value="" selected>select your ...</option>
                    </select> -->
                        <!-- <input class="input" type="text"> -->
                        <!-- worning -->
                        <div v-show="provinceS" class="wrapper_errorMsg">
                            <div>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M1.5 8.99951C1.5 4.86026 4.86 1.49951 9 1.49951C13.1475 1.49951 16.5 4.86026 16.5 8.99951C16.5 13.1403 13.1475 16.4995 9 16.4995C4.86 16.4995 1.5 13.1403 1.5 8.99951ZM8.34 6.15701C8.34 5.79776 8.64 5.49701 9 5.49701C9.36 5.49701 9.6525 5.79776 9.6525 6.15701V9.47201C9.6525 9.83276 9.36 10.1245 9 10.1245C8.64 10.1245 8.34 9.83276 8.34 9.47201V6.15701ZM9.0075 12.5103C8.64 12.5103 8.3475 12.2103 8.3475 11.8503C8.3475 11.4903 8.64 11.1978 9 11.1978C9.3675 11.1978 9.66 11.4903 9.66 11.8503C9.66 12.2103 9.3675 12.5103 9.0075 12.5103Z"
                                        fill="#F75555" />
                                </svg>
                                <p>
                                    {{ provinceM }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- district -->
                    <div class="input_field">
                        <h5 class="important_input">
                            District
                        </h5>
                        <input v-model="addressDistrinct" class="input" type="text" maxlength="20">
                        <!-- <select class="input" name="district" >
                        <option value="" selected>select your ...</option>
                    </select> -->
                        <!-- <input class="input" type="text"> -->
                        <!-- worning -->
                        <div v-show="districtS" class="wrapper_errorMsg">
                            <div>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M1.5 8.99951C1.5 4.86026 4.86 1.49951 9 1.49951C13.1475 1.49951 16.5 4.86026 16.5 8.99951C16.5 13.1403 13.1475 16.4995 9 16.4995C4.86 16.4995 1.5 13.1403 1.5 8.99951ZM8.34 6.15701C8.34 5.79776 8.64 5.49701 9 5.49701C9.36 5.49701 9.6525 5.79776 9.6525 6.15701V9.47201C9.6525 9.83276 9.36 10.1245 9 10.1245C8.64 10.1245 8.34 9.83276 8.34 9.47201V6.15701ZM9.0075 12.5103C8.64 12.5103 8.3475 12.2103 8.3475 11.8503C8.3475 11.4903 8.64 11.1978 9 11.1978C9.3675 11.1978 9.66 11.4903 9.66 11.8503C9.66 12.2103 9.3675 12.5103 9.0075 12.5103Z"
                                        fill="#F75555" />
                                </svg>
                                <p>
                                    {{ districtM }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- sub district and postal -->
                <div class="inputs">
                    <!-- sub district -->
                    <div class="input_field">
                        <h5 class="important_input">
                            Sub district
                        </h5>
                        <input v-model="addressSubDistrinct" class="input" type="text" maxlength="20">
                        <!-- <select class="input" name="sub_district" >
                        <option value="" selected>select your ...</option>
                    </select> -->
                        <!-- <input class="input" type="text"> -->
                        <!-- worning -->
                        <div v-show="subDistrictS" class="wrapper_errorMsg">
                            <div>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M1.5 8.99951C1.5 4.86026 4.86 1.49951 9 1.49951C13.1475 1.49951 16.5 4.86026 16.5 8.99951C16.5 13.1403 13.1475 16.4995 9 16.4995C4.86 16.4995 1.5 13.1403 1.5 8.99951ZM8.34 6.15701C8.34 5.79776 8.64 5.49701 9 5.49701C9.36 5.49701 9.6525 5.79776 9.6525 6.15701V9.47201C9.6525 9.83276 9.36 10.1245 9 10.1245C8.64 10.1245 8.34 9.83276 8.34 9.47201V6.15701ZM9.0075 12.5103C8.64 12.5103 8.3475 12.2103 8.3475 11.8503C8.3475 11.4903 8.64 11.1978 9 11.1978C9.3675 11.1978 9.66 11.4903 9.66 11.8503C9.66 12.2103 9.3675 12.5103 9.0075 12.5103Z"
                                        fill="#F75555" />
                                </svg>
                                <p>
                                    {{ subDistrictM }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- postal -->
                    <div class="input_field">
                        <h5 class="important_input">
                            Zip / Postal
                        </h5>
                        <input v-model="addressZip" class="input" type="text" maxlength="5">
                        <!-- <select class="input" name="postal" >
                        <option value="" selected>select your ...</option>
                    </select> -->
                        <!-- <input class="input" type="text"> -->
                        <!-- worning -->
                        <div v-show="zipS" class="wrapper_errorMsg">
                            <div>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M1.5 8.99951C1.5 4.86026 4.86 1.49951 9 1.49951C13.1475 1.49951 16.5 4.86026 16.5 8.99951C16.5 13.1403 13.1475 16.4995 9 16.4995C4.86 16.4995 1.5 13.1403 1.5 8.99951ZM8.34 6.15701C8.34 5.79776 8.64 5.49701 9 5.49701C9.36 5.49701 9.6525 5.79776 9.6525 6.15701V9.47201C9.6525 9.83276 9.36 10.1245 9 10.1245C8.64 10.1245 8.34 9.83276 8.34 9.47201V6.15701ZM9.0075 12.5103C8.64 12.5103 8.3475 12.2103 8.3475 11.8503C8.3475 11.4903 8.64 11.1978 9 11.1978C9.3675 11.1978 9.66 11.4903 9.66 11.8503C9.66 12.2103 9.3675 12.5103 9.0075 12.5103Z"
                                        fill="#F75555" />
                                </svg>
                                <p>
                                    {{ zipM }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
        </div>
        </div>
        <!-- submit -->
        <!-- <div class="submit">
            <button @click="goAddress()">
                Cancel
            </button>
            <button @click="AddressSubmit()" :disabled="isSubmitTime" id="submit_address" :class="[isSubmitTime?'submit_deactive':'']">
                Save
            </button>
        </div> -->
        <BaseSubmit name="address_add" :disabled="isSubmitTime" @goBack="goAddress" @submit="AddressSubmit()" />
        <BaseAlert name="order_list_alert" :show-alert="isShowAlert" :alert-detail="alertDetail" :alert-status="alertType" :second="alertTime" @getShowAlertChange="getShowAlertChange" />
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
.wrapper_address {
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: min(1.389dvw,20px);
    background-color: #fff;
    animation: show_element ease-in 1.5s;
}

.address {
    display: flex;
    width: inherit;
    height: inherit;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: min(1.667dvw,24px);
}

.address h4 {
    display: flex;
    width: inherit;
    height: min(1.944dvw,28px);
    font-size: min(1.25dvw,18px);
    font-weight: 500;
    color: #212121;
    align-items: center;
}

.container_address {
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    gap: min(1.667dvw,24px);
}

.container_address .inputs {
    display: flex;
    width: 100%;
    height: fit-content;
    gap: min(1.667dvw,24px);
    justify-content: start;
    align-items: start;
}

.input_field {
    display: flex;
    width: 100%;
    height: fit-content;
    gap: min(0.278dvw,4px);
    flex-direction: column;

}

.input_field h5 {
    width: fit-content;
    height: min(1.389dvw,20px);
    font-size: min(0.972dvw,14px);
    font-weight: 500;
    color: #212121;
}

.input_field .input {
    width: 100%;
    height: min(2.5dvw,36px);
    border: min(0.069dvw,1px) solid;
    border-radius: min(0.278dvw,4px);
    border-color: #D1D5DB;
    box-shadow: 0px min(0.069dvw,1px) min(0.139dvw,2px) 0px #0000000D;
    padding: min(0.556dvw,8px) min(0.833dvw,12px);
    font-style: normal;
    font-weight: 400;
    font-size: min(0.972dvw,14px);
    line-height: 144%;
    letter-spacing: min(0.014dvw,0.2px);
    /* color: #9E9E9E; */
}

/* mobile */
@media (width<=432px){
    .wrapper_all {
        border-radius:min(1.852dvw,8px);
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px min(0.069dvw,1px) min(0.139dvw,2px) rgba(0, 0, 0, 0.06);
    }
    .wrapper_address {
        padding: min(4.63dvw,20px);
    }
    .address {
        gap: min(4.63dvw,20px);
    }
    .address h4 {
        height: min(5.556dvw,24px);
        font-size: min(3.704dvw,16px);
    }
    .container_address {
        gap: min(2.778dvw,12px);
    }
    .container_address .inputs {
        gap: min(2.778dvw,12px);
        flex-direction: column;
    }
    .input_field {
        gap: min(0.926dvw,4px);
    }
    .input_field h5 {
        height: min(4.63dvw,20px);
        font-size: min(3.241dvw,14px);
    }
    .input_field .input {
        height: min(8.333dvw,36px);
        border: min(0.231dvw,1px) solid #D1D5DB;
        border-radius: min(0.926dvw,4px);
        box-shadow: 0px 1px 2px 0px #0000000D;
        padding: min(1.852dvw,8px) min(2.778dvw,12px);
        font-size: min(3.241dvw,14px);
        line-height: 144%;
        letter-spacing: min(0.046dvw,0.2px);
    }
}
/* 
.submit {
    display: flex;
    width: 100%;
    height: min(4.167dvw,60px);
    padding: min(0.833dvw,12px) min(1.389dvw,20px);
    gap: min(0.556dvw,8px);
    justify-content: end;
    background-color: #FAFAFA;
}

.submit button {
    width: min(5.556dvw,80px);
    height: min(2.5dvw,36px);
    border: min(0.069dvw,1px) solid;
    padding: min(0.556dvw,8px) min(0.833dvw,12px);
    border-radius: min(0.278dvw,4px);
    box-shadow: 0px min(0.069dvw,1px) min(0.139dvw,2px) 0px #0000000D;
    cursor: pointer;
}

.submit button:nth-child(1) {
    border-color: #E0E0E0;
    background-color: #fff;
    color: #212121;
}

.submit button:nth-child(2) {
    border-color: #26AC34;
    background-color: #26AC34;
    color: #fff;
}

.wrapper_errorMsg {
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    padding: min(0.556dvw, 8px) min(0.833dvw, 12px);
    font-size: min(0.833dvw, 12px);
    border-radius: min(0.278dvw, 4px);
    background-color: rgba(245, 72, 74, 0.08);
    gap: min(0.556dvw, 8px)
}

.wrapper_errorMsg div {
    display: flex;
    width: inherit;
    height: inherit;
    gap: min(0.278dvw, 4px);
}

.wrapper_errorMsg div svg {
    width: min(1.042dvw, 15px);
    height: min(1.042dvw, 15px);
}

.wrapper_errorMsg div p {
    width: 100%;
    font-size: min(0.833dvw, 12px);
    font-style: normal;
    font-weight: 400;
    line-height: 136%;
    letter-spacing: min(0.014dvw,0.2px);
    color: #F75555;
    overflow: hidden;
    text-overflow: ellipsis;
}
.submit_deactive{
    background-color: #BDBDBD !important;
    cursor: not-allowed !important;
    border-color: transparent !important;
}*/
.important_input::after{
    content: "*";
    color: #F75555;
} 
</style>