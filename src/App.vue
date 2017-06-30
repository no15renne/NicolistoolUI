<template>
	<div id="app">
		<div>
			<h2 v-bind:style="fontStyle">{{ title }}</h2>
			<ul>
				<li v-for="ml in myLists" :key="ml.id">
					<span><a :href="getUrl(ml.id)">{{ ml.name }}</a></span>
					<span>{{ml.public ? "public" : "private" }}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	module.exports = {
  	data: function() {
	    return {
	      title: "Nico MyLists Items!",
	      fontStyle: {
	          fontSize: "20px",
	      },
	      myLists: [],
				myListsUrl: []
	    }
	  },
	  created: function () {
	    this.fetchData();
	  },
	  methods: {
	    fetchData: function() {
	      // TODO: APIはMockやめる
	      this.myLists = [{"id":"57888809","user_id":"63871305","name":"testnano","public":"0","default_sort":"1","create_time":1483031678,"update_time":1483031683,"sort_order":"2","icon_id":"0"},{"id":"57888808","user_id":"63871305","name":"公開test","public":"1","default_sort":"1","create_time":1483031660,"update_time":1483031676,"sort_order":"1","icon_id":"0"}];
	      console.log(this.myLists);
	    },
			getUrl: function(id) {
				return `http://localhost:9000/mylists/${id}/items`;
			}
	  }
	}
</script>
