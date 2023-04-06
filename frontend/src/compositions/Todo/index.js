module.exports = class Todo {
  constructor(url) {
    this.url = url;
    this.wsConnection = null
  }

  connect = () => {
    this.wsConnection = new WebSocket(this.url);
    console.log(this.wsConnection)
  }

  sendMessage = (message) => {
    console.log(message)
    this.wsConnection.send(JSON.stringify({ event: 'add-user', payload: { message }}))
  }

  getList = () => {

  }

  onMessage = () => {
    this.wsConnection.onmessage = (event) => {
      const data = JSON.parse(event.data)
      console.log(data)
      if (data.event === 'add-user') {
        //messages.value.push(data.payload.result)
      }
      if (data.event === 'start') {
        console.log(data)
        //messages.value = data.payload.message
      }
      if (data.event === 'remove-user') {
        console.log(data.payload)
        //if (data.payload.result === 200) {
        //  const el = messages.value.find(el => el._id === data.payload._id)
        //  console.log(el)
        //  const index = messages.value.indexOf(el)
        //  messages.value.splice(index, 1)
        //}
      }
      if (data.event === 'update-user') {
        //console.log(data.payload)
        //if (data.payload.result === 200) {
        //  const el = messages.value.find(el => el._id === data.payload._id)
        //  const index = messages.value.indexOf(el)
        //  console.log(index)
        //  messages.value[index].name = data.payload.user.name
        //  messages.value[index].surname = data.payload.user.surname
        //}
      }
    }
  }

}