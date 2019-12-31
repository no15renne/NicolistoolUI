<template>
	<div>
		<h2 v-bind:style="fontStyle">{{ mylistName }}</h2>
    <input type="text" v-model="search">
		<ul>
			<li v-for="item in filteredItems" :key="item.video_id">
			  <div class="video_thumbnail">
          <img :src=item.thumbnail_url>
        </div>
				<span><a :href="getUrl(item.video_id)">{{ item.title }}</a></span>
				<div class="video_tags">
				  <ul>
				    <li v-for="tag in item.tags">
				      <span>{{ tag }}</span>
				    </li>
				  </ul>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import 'babel-polyfill';
	import NocoLisToolClient from './util/nicolistool_client';
	module.exports = {
	  props: {
	    'mylistId': String,
	    'mylistName': String
	  },
  	data: function() {
	    return {
	      fontStyle: {
          fontSize: "20px",
	      },
	      items: [],
				search: ''
	    }
	  },
	  created: function () {
	    if (this.mylistId) {
	      this.fetchData(this.mylistId);
	    }
	  },
	  watch: {
      mylistId: function(newMylistId, oldMylistId){
        if (newMylistId !== oldMylistId) {
          this.fetchData(newMylistId);
        }
      }
    },
	  methods: {
	    fetchData: async function(myListId) {
				const client = new NocoLisToolClient();
				let response = await client.getMyListItems(myListId);
				await Promise.all(response.map(async res => {
				  let tags_info = await client.getVideoTags(res.video_id.slice(2));
				  res.tags = tags_info.tags;
				}));
				this.items = response;
	    },
			getUrl: function(id) {
				return `https://www.nicovideo.jp/watch/${id}`;
			}
    },
    computed: {
      filteredItems() {
        if (this.search.toLowerCase() === "") {
          return this.items;
        }
        let res = this.items.filter(item => {
          return item.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        })
        console.log(res);
        return res;
      }
    }
	}
</script>
