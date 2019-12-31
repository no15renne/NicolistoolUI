<template>
	<div>
    <mylist-component
      :updateSelectedMylist=updateSelectedMylist
    />
  	<mylist-item-component
  	  :mylistId=selectedMylistId
  	  :mylistName=selectedMylistName
  	/>
  </div>
</template>

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
