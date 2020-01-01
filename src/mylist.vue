<template>
  <div class="mylist-search-component">
    <div class="selected-mylist-name" v-on:click="toggleMylistSelector">{{ showMylistSelector ? '^' : 'v' }} {{ selectedMylistName || 'マイリスト選択' }}</div>
    <div class="mylist-selector" v-if="showMylistSelector">
      <input class="mylist-search" type="text" v-model="mylistSearch">
      <div class="mylists">
        <div class="mylist-item" v-for="ml in filteredItems" :key="ml.id">
          <span v-on:click="updateSelectedMylist(ml.id, ml.name)">{{ ml.name }}</span>
          <!-- <span>{{ml.public ? "public" : "private" }}</span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.mylist-search {
  width: 50%;
  border-radius: 6px;
  margin-left: 16px;
  border: none;
}
.mylist-selector {
  background-color: #1c1c1c;
}
.mylists {
  color: #e3eddb;
}

.mylists .mylist-item {
  padding-bottom: 6px;
  padding-top: 6px;
}
.mylists .mylist-item span {
  border-bottom: 1px solid #e3eddb;
  padding-bottom: 6px;
}
.mylist-search-component {
  color: #e3eddb;
  text-align: right;
  width: 30%;
}

.mylist-search-component .selected-mylist-name {
  line-height: 36px;
  height: 100%;
  font-size: 1em;
}
.mylist-contents-search {
  width: 50%;
  border-radius: 6px;
  border: none;
}
</style>

<script>
  import 'babel-polyfill';
  import NocoLisToolClient from './util/nicolistool_client';

  const client = new NocoLisToolClient();

  module.exports = {
    props: {
      selectedMylistName: String,
      updateSelectedMylist: Function
    },
    data: function() {
      return {
        myLists: [],
        myListsUrl: [],
        mylistSearch: '',
        showMylistSelector: false
      }
    },
    created: function () {
      this.fetchData();
    },
    methods: {
      fetchData: async function() {
        const response = await client.getMyLists();
        this.myLists = response;
      },
      toggleMylistSelector: function() {
        this.showMylistSelector = !this.showMylistSelector;
      },
      updateMylistFilterWordValue: function(e) {
        this.$emit("input", e.target.value);
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
