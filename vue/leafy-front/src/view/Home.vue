<script setup>
// import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios';
import { onBeforeMount, ref } from "vue"
// let origin = 'http://localhost:5000'
let origin = `${import.meta.env.VITE_BASE_URL}`;

let url = `${origin}/api/products`
let login_url = `${origin}/api/authentication`

axios.defaults.withCredentials = true;

let response = ref()
let error = ref()
let status = ref(0)
// let credentials = {
//   proxy: {
//     protocol: 'http',
//     host: '149.129.239.170',
//     port: 5000,
//   }
// }

let config = {
  headers: {
    Authorization: localStorage.getItem("token")
  }
}

let test = async () => {
  try {
    let res = await axios.get(url, config)
    console.log(res.status)
    status.value = res.status
    response.value = res.data
    return res.data
  } catch (err) {
    error.value = err.response.data
    status.value = err.response.status
  }
  // try {
  //   let res = await fetch(url, {
  //     method: "GET",
  //     headers: {
  //     "Content-Type": "application/json",
  //     },
  //     credentials: "include"
  //   })
  //   response.value = await res.json()
  //   status.value = res.status
  //   return response.value
  // } catch (err) {
  //   error.value = err.message
  //   status.value = err.status
  // }
}

let login = async () => {
  try {
    let user = {"email": "sahatat44@gmail.com","password": "abcd1234"}
    let res = await axios.post(login_url,user)
    console.log(res.status)
    // status.value = res.status
    // response.value = res.data
    console.log(res.data)
    localStorage.setItem("token",res.data.token)
    localStorage.setItem("refreshToken",res.data.refreshToken)
    return res.data
  } catch (err) {
    error.value = err.response.data
    status.value = err.response.status
  }
  // try {
  //   let user = {"email": "sahatat44@gmail.com","password": "abcd1234"}
  //   let res = await fetch(login_url, {
  //     method: "POST",
  //     headers: {
  //     "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(user),
  //     credentials: "include"
  //   })
  //   response.value = res.json()
  //   status.value = res.status
  //   return response.value
  // } catch (err) {
  //   error.value = err.message
  //   status.value = err.status
  // }
}

onBeforeMount(() => {
  login()
  setTimeout(() => {
    test()
  }, 1000);
})

</script>

<template>

  {{ origin }}
  <p v-if="response">
    Response: {{ response }}
    Status code: {{ status }}
  </p>
  <p v-else>
    Error: {{ error }}
    Status code: {{ status }}
  </p>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
