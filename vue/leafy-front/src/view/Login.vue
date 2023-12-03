<script setup>
import{ref}from 'vue'
import axios from 'axios';
import fetch from '../JS/api'
const email=ref('')
const password=ref('')

let origin = `${import.meta.env.VITE_BASE_URL}`;
let url = `${origin}/api/products`
let login_url = `${import.meta.env.VITE_BASE_URL}/api/authentication`
axios.defaults.withCredentials = true;

const response = ref('')
let error = ref()
let status = ref(0)

let login =async()=>{
  console.log(email.value,password.value)
  fetch.login(email.value,password.value)
}
// let login = async () => {
//   try {
//     // let user = {"email": "sahatat44@gmail.com","password": "abcd1234"}
//     let user = {"email": email.value,"password": password.value}
//     console.log(login_url)
//     let res = await axios.post(login_url,user)
//     console.log(res.status)
//     // status.value = res.status
//     // response.value = res.data
//     response.value=res.data
//     localStorage.setItem("token",res.data.token)
//     localStorage.setItem("refreshToken",res.data.refreshToken)
//     console.log(res.data) 
//   } catch (err) {
//     error.value = err.response.data
//     status.value = err.response.status
//   }
// }

const result=ref(undefined)


</script>
<template>
    <div>
        <!-- <label for="email">username</label> -->
        <input v-model="email" type="text" placeholder="email">
        <!-- <label for="password"></label> -->
        <input v-model="password" type="text" placeholder="password">
        <button @click="login"> login</button>
    </div>

    <div>
        {{ result }}
    </div>
</template>
<style scoped>
</style>