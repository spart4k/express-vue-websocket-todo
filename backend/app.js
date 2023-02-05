const http = require("http");
const express = require( "express");
const WebSocket = require( "ws");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const User = require('./src/models/user_model.js');
mongoose.connect("mongodb://localhost:27017/testusers", { useNewUrlParser: true });
const createDocument = async (message) => {
  try{
    const reactUser = new User({
      name: message.name,
      surname: message.surname
    })
    const result = await reactUser.save()
    webSocketServer.clients.forEach(client => client.send(JSON.stringify({ event: "add-user", payload: { result }})));
    console.log(result)
    return result
  } catch(err) {
    console.log(err)
  }
}
const removeElement = async (_id) => {
  try {
    await User.deleteOne({_id: _id})
    webSocketServer.clients.forEach(client => client.send(JSON.stringify({ event: "remove-user", payload: { _id, result: 200 }})));
    return 200
  } catch(err) {
    return 400
  }
}
const updateElement = async (_id, item) => {
  try {
    await User.updateOne({_id}, {
      $set: {
        name: item.name,
        surname: item.surname
      }
    })
    const newElement = await User.findOne({_id})
    console.log(newElement)
    webSocketServer.clients.forEach(client => client.send(JSON.stringify({ event: "update-user", payload: { _id, result: 200, user: newElement }})));
    return 200
  } catch(err) {
    return 400
  }
}
const app = express();

const server = http.createServer(app);

const webSocketServer = new WebSocket.Server({ server });

webSocketServer.on('connection', async (ws) => {
  const getElements = async () => {
    const result = await User.find()
    ws.send(JSON.stringify({ event: "start", payload: { message:  result }}));
  }
  getElements()
   ws.on('message', async (m) => {
    let data = JSON.parse(m)
    let message = data.payload.message
    if (data.event === 'add-user') {
      createDocument(message)
    }
    if (data.event === 'remove-user') {
      let _id = data.payload.id
      removeElement(_id)
      //ws.send(JSON.stringify({ event: "remove-user", payload: { message:  { _id, result  } }}));
    }
    if (data.event === 'update-user') {
      const _id = data.payload._id
      const item = data.payload.item
      updateElement(_id, item)
      //ws.send(JSON.stringify({ event: "remove-user", payload: { message:  { _id, result  } }}));
    }
   });
   ws.on("error", e => ws.send(e));
});

server.listen(8999, '0.0.0.0', () => console.log("Server started"))
