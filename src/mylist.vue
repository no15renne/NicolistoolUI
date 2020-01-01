<template>
  <div>
    <h2>{{ title }}</h2>
    <input type="text" v-model="mylistSearch">
    <ul>
      <li v-for="ml in filteredItems" :key="ml.id">
        <span><p v-on:click="updateSelectedMylist(ml.id, ml.name)">{{ ml.name }}</p></span>
        <span>{{ml.public ? "public" : "private" }}</span>
      </li>
    </ul>
  </div>
</template>

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
        title: "それコーンフレークやないかい！！！じゃあコーンフレーク違うかー！！！お嬢様ですわ。阪神また負けましたわ。",
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
