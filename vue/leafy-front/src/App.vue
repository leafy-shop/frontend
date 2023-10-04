<script setup>
import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios';
import { onBeforeMount, ref } from "vue"
// let origin = 'http://localhost:5000'
let origin = `${import.meta.env.VITE_BASE_URL}`;

let url = `${origin}/api/products`
let login_url = `${origin}/api/authentication`

axios.defaults.withCredentials = true;

// axios({
//   method: 'get',
//   url: '/api/users',
//   // data: {
//   //   firstName: 'Fred',
//   //   lastName: 'Flintstone'
//   // }
// });
let response = ref()
let error = ref()
let status = ref(0)
let credentials = {
  proxy: {
    protocol: 'http',
    host: '149.129.239.170',
    port: 5000,
  }
}

// const proxy = {
//   host: 'some_ip',
//   port: some_port_number,
//   auth: {
//     username: 'some_login',
//     password: 'some_pass'
//   }
// };

let test = async () => {
  console.log(import.meta.env.VITE_BASE_URL)
  // try {
  //   let res = await axios.get(url,credentials)
  //   console.log(res.status)
  //   status.value = res.status
  //   response.value = res.data
  //   return res.data
  // } catch (err) {
  //   error.value = err.response.data
  //   status.value = err.response.status
  // }
  try {
    let res = await fetch(url, {
      method: "GET",
      headers: {
      "Content-Type": "application/json",
      },
      credentials: "include"
    })
    response.value = await res.json()
    status.value = res.status
    return response.value
  } catch (err) {
    error.value = err.message
    status.value = err.status
  }
}

let login = async () => {
  // try {
  //   let user = {"email": "sahatat44@gmail.com","password": "abcd1234"}
  //   let res = await axios.post(login_url,user,credentials)
  //   console.log(res.status)
  //   // status.value = res.status
  //   // response.value = res.data
  //   return res.data
  // } catch (err) {
  //   error.value = err.response.data
  //   status.value = err.response.status
  // }
  try {
    let user = {"email": "sahatat44@gmail.com","password": "abcd1234"}
    let res = await fetch(login_url, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include"
    })
    response.value = res.json()
    status.value = res.status
    return response.value
  } catch (err) {
    error.value = err.message
    status.value = err.status
  }
}

onBeforeMount(() => {
  login()
  setTimeout(() => {
    test()
  }, 1000);
})

</script>

<template>
  <!-- <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" /> -->
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
