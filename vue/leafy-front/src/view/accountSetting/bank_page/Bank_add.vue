<script setup>
import {useRouter} from 'vue-router'
// link
const myRouter=useRouter()
const goAddress=()=>myRouter.push({name:'Bank_AS'})
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
                <input class="input" type="text">
            </div>
                
            <!-- Account_number -->
            <div class="input_field">
                <h5>
                    Account number
                </h5>
                <input class="input" type="text">
            </div>

            <!-- Bank name -->
            <div class="input_field">
                <h5>
                    Bank name
                </h5>
                <input class="input" type="text">
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