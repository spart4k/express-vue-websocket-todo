<template>
  <div id="app">
    <div class="">
      <input placeholder="name" v-model="name" type="text">
      <input placeholder="surname" v-model="surname" type="text">
    </div>

    <button style="margin-bottom: 20px;" @click="startSocket">
      enter
    </button>
    <div v-for="(item, index) in messages" :key="index" class="">
      <div class="">
        <input v-model="messages[index].name" type="text">
        <input v-model="messages[index].surname" type="text">
      </div>
      <button @click="removeUser(item._id)" class="">delete</button>
      <button @click="updateUser(item._id, item)" class="">update</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'App',
  components: {
  },
  setup () {
    const name = ref('')
    const surname = ref('')
    const test = ref('tested')
    const startSocket = () => {
      sendMessage({
        name: name.value,
        surname: surname.value})
    }
    const messages = ref([])
    let wsConnection = null
    wsConnection = new WebSocket("ws://192.168.0.102:8999");
    wsConnection.onopen = function() {
        //alert("Соединение установлено.");
    };

    wsConnection.onclose = function(event) {
        if (event.wasClean) {
            //alert('Соединение закрыто чисто');
        } else {
            //alert('Обрыв соединения'); // например, "убит" процесс сервера
        }
        //alert('Код: ' + event.code + ' причина: ' + event.reason);
    };

    wsConnection.onerror = function() {

    };

    const wsSend = function(data) {
    // readyState - true, если есть подключение
        if(!wsConnection.readyState){
            setTimeout(function (){
                wsSend(data);
            },100);
        } else {
            wsConnection.send(data);
        }
    };
    const sendMessage = (message) => {
      console.log(message)
      console.log(wsConnection)
      wsConnection.send(JSON.stringify({ event: 'add-user', payload: { message }}))
      name.value = ''
      surname.value = ''
    }
    wsConnection.onmessage = (event) => {
      const data = JSON.parse(event.data)
      console.log(data)
      if (data.event === 'add-user') {
        messages.value.push(data.payload.result)
      }
      if (data.event === 'start') {
        messages.value = data.payload.message
      }
      if (data.event === 'remove-user') {
        console.log(data.payload)
        if (data.payload.result === 200) {
          const el = messages.value.find(el => el._id === data.payload._id)
          const index = messages.value.indexOf(el)
          messages.value.splice(index, 1)
        }
      }
      if (data.event === 'update-user') {
        console.log(data.payload)
        if (data.payload.result === 200) {
          const el = messages.value.find(el => el._id === data.payload._id)
          const index = messages.value.indexOf(el)
          console.log(index)
          messages.value[index].name = data.payload.user.name
          messages.value[index].surname = data.payload.user.surname
        }
      }
    }
    const removeUser = (id) => {
      console.log(id)
      wsConnection.send(JSON.stringify({ event: "remove-user", payload: { id }}))
    }
    const updateUser = (_id, item) => {
      wsConnection.send(JSON.stringify({ event: "update-user", payload: { _id, item }}))
    }
    document.onvisibilitychange = () => {
      //if (document.visibilityState === 'visible') {
      //  wsConnection = new WebSocket("ws://192.168.0.102:8999");
      //  if (wsConnection.readyState === 1) new WebSocket("ws://192.168.0.102:8999");
      //  console.log(wsConnection)
      //}
    };
    return {
      startSocket,
      test,
      sendMessage,
      wsSend,
      messages,
      name,
      surname,
      removeUser,
      updateUser
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 21px;
}
</style>
