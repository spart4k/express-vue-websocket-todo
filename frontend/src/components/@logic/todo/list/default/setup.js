import { ref } from 'vue'
//import { useStore } from '@/store';
import ToDo from '@/compositions/Todo'
export default {
  name: 'Todo-List',
  components: {
  },
  props: {
  },
  setup () {
    const todo = new ToDo("ws://192.168.0.102:3000")
    todo.connect()
    todo.onMessage()
    const name = ref('')
    const surname = ref('')
    const test = ref('tested')
    const startSocket = () => {
      todo.sendMessage({
        name: name.value,
        surname: surname.value
      })
      //sendMessage({
      //  name: name.value,
      //  surname: surname.value
      //})
    }
    const messages = ref([])
    let wsConnection = null
    wsConnection = new WebSocket("ws://192.168.0.102:3000");
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
          console.log(el)
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
};
