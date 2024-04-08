<script setup>
import { io } from "socket.io-client";
import { onBeforeMount, ref } from "vue";
let origin = `${import.meta.env.VITE_BASE_URL}`;

const username = ref("Sahathat");
const message = ref("Test");

const messageLog = ref([]);

const socket = io(origin, {
  reconnectionDelayMax: 10000,
});

// Receive message history from server
socket.on("load messages", function (messages) {
  //   let messagesList = document.getElementById("messages");
  //   messages.forEach(function (msg) {
  //     let item = document.createElement("li");
  //     item.innerHTML = "<strong>" + msg.sender + "</strong>: " + msg.message;
  //     messagesList.appendChild(item);
  //   });

  messageLog.value = messages;
});

socket.on("chat message", function (msg) {
  //   // Receive new message from server
  //   let item = document.createElement("li");
  //   item.innerHTML =
  //     "<strong>" + msg.sender + "</strong>: " + msg.message;
  //   document.getElementById("messages").appendChild(item);
  messageLog.value.push(msg);
});

onBeforeMount(() => {
  // join room
  socket.emit("join", { roomId: "kvsijjsiejvissvd", username: "Sahathat" });
});

function sendMessage() {
  //   const inputUser = document.getElementById("inputUser").value;
  //   const inputMessage = document.getElementById("inputMessage").value;
  //   socket.emit("chat message", {
  //     sender: inputUser,
  //     message: inputMessage,
  //   });
  //   document.getElementById("inputMessage").value = "Test";

  socket.emit("chat message", {
    sender: username.value,
    message: message.value,
  });
}
</script>
<template>
  <div id="chat">
    <p>username: <input type="text" id="inputUser" v-model="username" /></p>
    <p>message: <input type="text" id="inputMessage" v-model="message" /></p>
    <button @click="sendMessage()">Send</button>
    <!-- <div id="messages"></div> -->
    <div id="messages">
      <ul v-for="chat in messageLog">
        <li>
          <strong>{{ chat.sender }}</strong
          >{{ chat.message }}
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped></style>
