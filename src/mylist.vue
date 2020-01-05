<template>
  <div class="mylist-selector-component">
    <div class="selected-mylist-name" v-on:click="toggleMylistSelectorViewer">
      {{ showMylistSelectorViewer ? '^' : 'v' }} {{ selectedMylistName || 'マイリスト選択' }}
    </div>
    <div class="mylist-selector" v-if="showMylistSelectorViewer">
      <input class="mylist-search" type="text" v-model="mylistSearchWord">
      <div class="mylists">
        <div class="mylist-item" v-for="ml in filteredMylistItems" :key="ml.id">
          <span v-on:click="updateSelectedMylist(ml.id, ml.name)">{{ ml.name }}</span>
          <!-- <span>{{ml.public ? "public" : "private" }}</span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.mylist-selector-component {
  color: #e3eddb;
  text-align: right;
  width: 30%;
}
.mylist-selector-component .selected-mylist-name {
  line-height: 36px;
  height: 100%;
  font-size: 1em;
}

.mylist-selector {
  background-color: #1c1c1c;
}
.mylist-selector .mylist-search {
  width: 50%;
  border-radius: 6px;
  margin-left: 16px;
  border: none;
}

.mylists .mylist-item {
  padding-bottom: 6px;
  padding-top: 6px;
}
.mylists .mylist-item span {
  border-bottom: 1px solid #e3eddb;
  padding-bottom: 6px;
}
</style>

<script>
  import NocoLisToolClient from './util/nicolistool_client';

  const client = new NocoLisToolClient();

  export default {
    props: {
      selectedMylistName: String,
      updateSelectedMylist: Function
    },
    data: function() {
      return {
        myLists: [],
        mylistSearchWord: '',
        showMylistSelectorViewer: false
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
      toggleMylistSelectorViewer: function() {
        this.showMylistSelectorViewer = !this.showMylistSelectorViewer;
      },
      updateMylistFilterWordValue: function(e) {
        this.$emit("input", e.target.value);
      }
    },
    computed: {
      filteredMylistItems() {
        if (this.mylistSearchWord.toLowerCase() === "") {
          return this.myLists;
        }
        return this.myLists.filter(item => {
          return item.name.toLowerCase().indexOf(this.mylistSearchWord.toLowerCase()) > -1
        })
      }
    }
  }
</script>
