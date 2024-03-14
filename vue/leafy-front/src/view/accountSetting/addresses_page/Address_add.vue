<script setup>
import {useRouter} from 'vue-router'
// link
const myRouter=useRouter()
const goAddress=()=>myRouter.push({name:'Address_AS'})
</script>
<template>
<div class="wrapper_address">
    <div class="address">
        <h4>
            Add New Address
        </h4>
        <div class="container_address">
            <!-- name and phone -->
            <div class="inputs">
                <!-- name -->
                <div class="input_field">
                    <h5>
                        Name
                    </h5>
                    <input class="input" type="text">
                </div>
                <!-- phone -->
                <div class="input_field">
                    <h5>
                        Phone number
                    </h5>
                    <input class="input" type="text" placeholder="000-000-0000">
                </div>
            </div>
            <!-- address -->
            <div class="input_field">
                <h5>
                    Address
                </h5>
                <input class="input" type="text">
            </div>
            <!-- province and district -->
            <div class="inputs">
                <!-- province -->
                <div class="input_field">
                    <h5>
                        province
                    </h5>
                    <select class="input" name="province" >
                        <option value="" selected>select your ...</option>
                    </select>
                    <!-- <input class="input" type="text"> -->
                </div>
                <!-- district -->
                <div class="input_field">
                    <h5>
                        province
                    </h5>
                    <select class="input" name="district" >
                        <option value="" selected>select your ...</option>
                    </select>
                    <!-- <input class="input" type="text"> -->
                </div>
            </div>
            <!-- sub district and postal -->
            <div class="inputs">
                <!-- sub district -->
                <div class="input_field">
                    <h5>
                        Sub district
                    </h5>
                    <select class="input" name="sub_district" >
                        <option value="" selected>select your ...</option>
                    </select>
                    <!-- <input class="input" type="text"> -->
                </div>
                <!-- postal -->
                <div class="input_field">
                    <h5>
                        Zip / Postal
                    </h5>
                    <select class="input" name="postal" >
                        <option value="" selected>select your ...</option>
                    </select>
                    <!-- <input class="input" type="text"> -->
                </div>
            </div>
            <!-- submit -->
            <div class="submit">
                <button @click="goAddress()">
                    Cancel
                </button>
                <button @click="personalInfoSubmit">
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

.wrapper_address{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: #fff;
}
.address{
    display: flex;
    width: inherit;
    height: inherit;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 24px;
}
.address h4{
    display: flex;
    width: 100%;
    height: 28px;
    font-size: 18px;
    font-weight: 500;
    align-items: center;
}
.container_address{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    gap: 24px;
}
.container_address .inputs{
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