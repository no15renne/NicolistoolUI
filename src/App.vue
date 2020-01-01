<template>
    <div>
    <mylist-component
      v-model="mylistFilterWord"
      :selectedMylistName=selectedMylistName
      :updateSelectedMylist=updateSelectedMylist
    />
    <div class="dummy-header"></div>
    <mylist-item-component
      :mylistFilterWord=mylistFilterWord
      :mylistId=selectedMylistId
      :mylistName=selectedMylistName
    />
  </div>
</template>

<style>
.dummy-header {
  height: 40px;
}
</style>

<script>
  import 'babel-polyfill';
  import MylistComponent     from './mylist.vue';
  import MylistItemComponent from './mylist_item.vue';

  module.exports = {
    data: function() {
      return {
        selectedMylistId: "",
        selectedMylistName: "",
        mylistFilterWord: ""
      }
    },
    components: {
      'mylist-component': MylistComponent,
      'mylist-item-component': MylistItemComponent
    },
    methods: {
      updateSelectedMylist: function(id, name) {
        this.selectedMylistId   = id;
        this.selectedMylistName = name;
      }
    }
  }
</script>
