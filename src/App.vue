<template>
    <div>
    <mylist-component
      :updateSelectedMylist=updateSelectedMylist
    />
    <div class="dummy-header"></div>
    <mylist-item-component
      :mylistId=selectedMylistId
      :mylistName=selectedMylistName
    />
  </div>
</template>

<style>
.dummy-header {
  height: 28px;
  padding: 12px;
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
          selectedMylistName: ""
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
