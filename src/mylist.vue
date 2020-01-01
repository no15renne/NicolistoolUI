<template>
  <div class="header">
    <div class="title-wrapper">
      <h2>{{ title }}</h2>
    </div>
    <input class="mylist-search" type="text" v-model="mylistSearch">
    <div class="mylists">
      <div v-for="ml in filteredItems" :key="ml.id">
        <span v-on:click="updateSelectedMylist(ml.id, ml.name)">{{ ml.name }}</span>
        <!-- <span>{{ml.public ? "public" : "private" }}</span> -->
      </div>
    </div>
  </div>
</template>

<style>
.header {
  height: 36px;
  width: 100%;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  padding: 12px;
  font-size: 1.2em;
  z-index: 2020;
  transform: translateY(0);
  transition: transform 0.3s ease;
  background-color: #1c1c1c;
}
.header .title-wrapper {
  height: 100%;
  margin-top: 6px;
  margin-bottom: 6px;
}
.header h2 {
  margin: 0px;
  color: #e3eddb;
  font-size: 1em;
}
.mylist-search {
  width: 50%;
  border-radius: 6px;
  margin-left: 16px;
  border: none;
}
.mylists {
  display: flex;
  color: #e3eddb;
}

</style>

<script>
  import 'babel-polyfill';
  import NocoLisToolClient from './util/nicolistool_client';

  const client = new NocoLisToolClient();

  module.exports = {
    props: {
      updateSelectedMylist: Function
  },
    data: function() {
      return {
        title: "NicolistoolUI",
        myLists: [],
        myListsUrl: [],
        mylistSearch: ''
      }
    },
    created: function () {
      this.fetchData();
    },
    methods: {
      fetchData: async function() {
        const response = await client.getMyLists();
        this.myLists = response;
      }
    },
    computed: {
      filteredItems() {
        if (this.mylistSearch.toLowerCase() === "") {
          return this.myLists;
        }
        return this.myLists.filter(item => {
          return item.name.toLowerCase().indexOf(this.mylistSearch.toLowerCase()) > -1
        })
      }
    }
  }
</script>
