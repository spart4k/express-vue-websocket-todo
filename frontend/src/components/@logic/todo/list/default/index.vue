<template>
  <div>
    <div>
      startTest
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
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" module src="./style.scss"/>