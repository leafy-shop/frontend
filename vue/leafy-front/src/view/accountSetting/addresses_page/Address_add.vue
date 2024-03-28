<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, computed, onBeforeMount } from 'vue'
import fetch from '../../../JS/api'
import validation from '../../../JS/validation'
import cookie from '../../../JS/cookie'
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
// get only use edit mode
const getAddressById = async () => {
    let { status, msg, data } = await fetch.getAddressById(userName.value, addressId.value)
    if (status) {
        addressOrigin.value = data
        console.log(addressOrigin.value)
        // assign value
        addressName.value = data.addressname
        addressPhone.value = data.phone
        address.value = data.address
        addressProvince.value = data.province
        addressDistrinct.value = data.distrinct
        addressSubDistrinct.value = data.subDistrinct
        addressZip.value = data.postalCode
    }
}
// submit button
const AddressSubmit = async () => {
    let submitStatus = true
    // console.log(validation.textRange(address.value, 1, 50))
    //validate data every thing can do
    // if(addressName.value.length === 0){
    //     submitStatus=false
    //     nameS.value=true
    //     nameM.value="Please input your address's name"
    // }
    // if(address.value.length === 0){
    //     submitStatus=false
    //     addressS.value=true
    //     addressM.value="Please input your address"
    // }
    // if(addressProvince.value.length === 0){
    //     submitStatus=false
    //     provinceS.value=true
    //     provinceM.value="Please input your province"
    // }
    // if(addressDistrinct.value.length === 0){
    //     submitStatus=false
    //     districtS.value=true 
    //     districtM.value="Please input your district"
    // }
    // if(addressZip.value.length !== 5){
    //     submitStatus=false
    //     zipS.value=true
    //     zipM.value="Please input your zip"
    // }
    // if(addressPhone.value.length !== 10 && addressPhone.value.length !== 11){
    //     submitStatus=false
    //     phoneS.value=true
    //     phoneM.value="Please input your phone"
    // }


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
            if (status) {
                console.log('add new success')
                goAddress()
            } else {
                // error from server
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
                    }
                }
            }
    }
}


onBeforeMount(async () => {
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

})
</script>
<template>
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
                        <h5>
                            Name
                        </h5>
                        <input v-model="addressName" class="input" type="text">
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
                        <h5>
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
                    <h5>
                        Address
                    </h5>
                    <input v-model="address" class="input" type="text">
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
                        <h5>
                            Province
                        </h5>
                        <input v-model="addressProvince" class="input" type="text">
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
                        <h5>
                            District
                        </h5>
                        <input v-model="addressDistrinct" class="input" type="text">
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
                        <h5>
                            Sub district
                        </h5>
                        <input v-model="addressSubDistrinct" class="input" type="text">
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
                        <h5>
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
                <!-- submit -->
                <div class="submit">
                    <button @click="goAddress()">
                        Cancel
                    </button>
                    <button @click="AddressSubmit()">
                        Save
                    </button>
                </div>
            </div>

        </div>

    </div>
</template>
<style scoped>
* {
    box-sizing: border-box;
}

.wrapper_address {
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: #fff;
}

.address {
    display: flex;
    width: inherit;
    height: inherit;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 24px;
}

.address h4 {
    display: flex;
    width: 100%;
    height: 28px;
    font-size: 18px;
    font-weight: 500;
    align-items: center;
}

.container_address {
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    gap: 24px;
}

.container_address .inputs {
    display: flex;
    width: 100%;
    height: fit-content;
    gap: 24px;
    justify-content: start;
    align-items: start;
}

.input_field {
    display: flex;
    width: 100%;
    height: fit-content;
    gap: 4px;
    flex-direction: column;

}

.input_field h5 {
    width: fit-content;
    height: 20px;
    font-size: 14px;
    font-weight: 500;
    color: #212121;
}

.input_field .input {
    width: 100%;
    height: 36px;
    border: 1px solid;
    border-radius: 4px;
    border-color: #D1D5DB;
    box-shadow: 0px 1px 2px 0px #0000000D;
    padding: 8px 12px;
}


.submit {
    display: flex;
    width: 100%;
    height: 60px;
    padding: 12px 24px;
    gap: 8px;
    justify-content: end;
}

.submit button {
    width: 80px;
    height: 36px;
    border: 1px solid;
    padding: 8px 12px;
    border-radius: 4px;
    border-color: #E0E0E0;
    box-shadow: 0px 1px 2px 0px #0000000D;
    cursor: pointer;
}

.submit button:nth-child(1) {
    background-color: #fff;
    color: #212121;
}

.submit button:nth-child(2) {
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
    /* 16.32px */
    letter-spacing: 0.2px;
    color: #F75555;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>