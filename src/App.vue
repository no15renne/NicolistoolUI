<template>
    <div>
    <header-component
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
  /* components */
  import HeaderComponent     from './header.vue';
  import MylistItemComponent from './mylist_item.vue';

  export default {
    data: function() {
      return {
        selectedMylistId: "",
        selectedMylistName: "",
        mylistFilterWord: ""
      }
    },
    components: {
      'header-component': HeaderComponent,
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
