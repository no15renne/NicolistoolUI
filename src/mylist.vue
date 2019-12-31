<template>
	<div>
		<h2 v-bind:style="fontStyle">{{ title }}</h2>
    <input type="text" v-model="search">
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
	module.exports = {
	  props: {
	    updateSelectedMylist: Function
	  },
  	data: function() {
	    return {
	      title: "Nico MyLists Items!",
	      fontStyle: {
	          fontSize: "20px",
	      },
	      myLists: [],
				myListsUrl: [],
				search: ''
	    }
	  },
	  created: function () {
	    this.fetchData();
	  },
	  methods: {
	    fetchData: async function() {
				const client = new NocoLisToolClient();
				let response = await client.getMyLists();
				this.myLists = response;
	    }
    },
    computed: {
      filteredItems() {
        if (this.search.toLowerCase() === "") {
          return this.myLists;
        }
        return this.myLists.filter(item => {
          return item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        })
      }
    }
	}
</script>
