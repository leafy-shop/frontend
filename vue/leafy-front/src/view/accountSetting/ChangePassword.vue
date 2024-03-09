<script setup>
import {useRouter} from 'vue-router'
const myRouter=useRouter()
const goNewPW=()=>myRouter.push({name:"NewPW_AS"})

</script>
<template>
<div class="wrapper_change_PW">
    <div class="change_PW">
        <div class="header_change_PW">
            <h4>
                Change Password
            </h4>
            <p>
                To protect your account security, please verify your identity with one of the methods below.
            </p>
        </div>
        <div class="inputs">
            <div class="input_item">
                <h5>
                    Current password
                </h5>
                <div class="input_field">
                    <input type="password">
                    <button>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.94182 4.22798C9.28738 4.1877 9.64036 4.16699 9.99996 4.16699C13.8866 4.16699 16.9998 6.58586 18.3333 10.0003C18.0045 10.8423 17.5674 11.6238 17.0372 12.3234M5.43298 5.43319C3.73292 6.47037 2.41755 8.07748 1.66663 10.0003C3.00007 13.4148 6.11332 15.8337 9.99996 15.8337C11.6979 15.8337 13.2483 15.372 14.5671 14.5673M8.23227 8.23248C7.77981 8.6849 7.49996 9.30993 7.49996 10.0003C7.49996 11.381 8.61925 12.5003 9.99996 12.5003C10.6904 12.5003 11.3154 12.2205 11.7678 11.768" stroke="#BDBDBD" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M3.33337 3.33301L16.6667 16.6663" stroke="#BDBDBD" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>
                <button>
                    Forgot Password ?
                </button>
            </div>
            <div class="new_PW">
                <div class="input_item">
                    <h5>
                        Current password
                    </h5>
                    <div class="input_field">
                        <input type="password">
                        <button>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.94182 4.22798C9.28738 4.1877 9.64036 4.16699 9.99996 4.16699C13.8866 4.16699 16.9998 6.58586 18.3333 10.0003C18.0045 10.8423 17.5674 11.6238 17.0372 12.3234M5.43298 5.43319C3.73292 6.47037 2.41755 8.07748 1.66663 10.0003C3.00007 13.4148 6.11332 15.8337 9.99996 15.8337C11.6979 15.8337 13.2483 15.372 14.5671 14.5673M8.23227 8.23248C7.77981 8.6849 7.49996 9.30993 7.49996 10.0003C7.49996 11.381 8.61925 12.5003 9.99996 12.5003C10.6904 12.5003 11.3154 12.2205 11.7678 11.768" stroke="#BDBDBD" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M3.33337 3.33301L16.6667 16.6663" stroke="#BDBDBD" stroke-linecap="round"/>
                            </svg>
                        </button>
                    </div>
                    <p>
                        Make your password short and easy to guess.
                    </p>
                </div>
                <div class="input_item">
                    <h5>
                        Current password
                    </h5>
                    <div class="input_field">
                        <input type="password">
                        <button>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.94182 4.22798C9.28738 4.1877 9.64036 4.16699 9.99996 4.16699C13.8866 4.16699 16.9998 6.58586 18.3333 10.0003C18.0045 10.8423 17.5674 11.6238 17.0372 12.3234M5.43298 5.43319C3.73292 6.47037 2.41755 8.07748 1.66663 10.0003C3.00007 13.4148 6.11332 15.8337 9.99996 15.8337C11.6979 15.8337 13.2483 15.372 14.5671 14.5673M8.23227 8.23248C7.77981 8.6849 7.49996 9.30993 7.49996 10.0003C7.49996 11.381 8.61925 12.5003 9.99996 12.5003C10.6904 12.5003 11.3154 12.2205 11.7678 11.768" stroke="#BDBDBD" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M3.33337 3.33301L16.6667 16.6663" stroke="#BDBDBD" stroke-linecap="round"/>
                            </svg>
                        </button>
                    </div>
                    <p>
                        Make your password short and easy to guess.
                    </p>
                </div>
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
</template>
<style scoped>
*{
    box-sizing: border-box;
}
.wrapper_change_PW{
    display: flex;
    width: 100%;
    height: fit-content;
    padding: 20px;
    gap: 24px;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    border: none;
    border-radius: 8px;
    background-color: #fff;
}
.change_PW{
    display: flex;
    width: 100%;
    height: inherit;
    flex-direction: column;
    gap: 24px;
}
.header_change_PW{
    display: flex;
    width: inherit;
    height: inherit;
    flex-direction: column;
    gap: 4px;
    align-items: start;
    justify-content: center;
}
.header_change_PW h4{
    display: flex;
    width: inherit;
    height: 28px;
    font-size: 18px;
    font-weight: 500;
    color: #212121;
    align-items: center;
}
.header_change_PW p{
    display: flex;
    width: inherit;
    height: 20px;
    font-weight: 400;
    font-size: 14px;
    color: #757575;
    align-items: center
}
.inputs{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    gap: 24px;
}
.input_item{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    gap: 8px;
}
.input_item h5{
    display: flex;
    width: inherit;
    height: 20px;
    font-weight: 500;
    font-size: 14px;
    color: #212121;
}
.input_item .input_field{
    display: flex;
    width: 320px;
    height: 36px;
    background-color: #fff;
    border: 1px solid ;
    border-color: #D1D5DB;
    border-radius: 4px;
    box-shadow: 0px 1px 2px 0px #0000000D;
    justify-content: center;
    align-items: center;
    padding-right: 12px;
}
.input_item .input_field:focus-within{
    outline: auto;
}
.input_item .input_field input {
    width: 100%;
    height: inherit;
    border: none;
    outline: none;
    padding: 8px 0px 8px 12px ;
    background-color: transparent;
}
.input_item .input_field button{
    display: flex;
    width: fit-content;
    height: 100%;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: transparent;
    cursor: pointer;
}
.input_item .input_field button svg{
    width: 20px;
    height: 20px;
}
.input_item button{
    width: fit-content;
    height: 20px;
    font-weight: 14px;
    font-weight: 400;
    color: #9E9E9E;
    border: none;
    background-color: transparent;
}
.input_item p{
    display: flex;
    width: 100%;
    height: 20px;
    justify-content: start;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    color: #9E9E9E;
}
.new_PW{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    gap: 24px;
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