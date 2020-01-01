<template>
  <div class="header-wrapper">
    <div class="header">
      <h2>{{ title }}</h2>
      <input class="mylist-contents-search" type="text" @input="updateMylistFilterWordValue">
      <mylist-component
        v-model="mylistFilterWord"
        :selectedMylistName=selectedMylistName
        :updateSelectedMylist=updateSelectedMylist
      />
    </div>
  </div>
</template>

<style>
.header-wrapper {
  height: 48px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2020;
  transform: translateY(0);
  transition: transform 0.3s ease;
  background-color: #1c1c1c;
  box-shadow: 0 0 2px rgba(180, 207, 158, .3);
}
.header {
  height: 36px;
  padding: 6px 12px;
  display: flex;
  justify-content: space-between;
  font-size: 1.2em;
}
.header h2 {
  margin: 0px;
  line-height: 36px;
  color: #e3eddb;
  font-size: 1em;
}
</style>

<script>
  import 'babel-polyfill';
  import NocoLisToolClient from './util/nicolistool_client';

  /* components */
  import MylistComponent from './mylist.vue';

  const client = new NocoLisToolClient();

  module.exports = {
    props: {
      selectedMylistName: String,
      updateSelectedMylist: Function
    },
    data: function() {
      return {
        title: "NicolistoolUI"
      }
    },
    components: {
      'mylist-component': MylistComponent,
    },
    methods: {
      updateMylistFilterWordValue: function(e) {
        this.$emit("input", e.target.value);
      }
    }
  }
</script>
