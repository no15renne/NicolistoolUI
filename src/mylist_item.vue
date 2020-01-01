<template>
  <div>
    <!--<h2 class="mylist-name">{{ mylistName }}</h2>-->
    <div id="grid" class="mylist-contents-list">
      <div class="mylist-contents" v-for="item in filteredItems" :key="item.video_id">
        <div class="video-thumbnail">
          <img :src=item.thumbnail_url width="320" height="180">
        </div>
        <div class="video-title">{{ item.title }}</div>
        <div class="video-tags">
            <div class="video-tag" v-for="tag in item.tags">
              <span>{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.mylist-name {
  color: #e3eddb;
  margin-left: 16px;
}

.mylist-contents-list {
}
.mylist-contents {
  width: 320px;
  height: 380px;
  margin: 3px;
  background-color: #1c1c1c;
  border-radius: 20px;
  /*box-shadow: 0 0 2px rgba(0,0,0,.1);*/
}
.video-thumbnail {
  width: 320px;
}
.video-thumbnail img {
  width: 320px;
  border-radius: 20px 20px 0px 0px;
}
.video-title {
  color: #e3eddb;
  padding: 6px;
}
.video-tags {
  display:flex;
  flex-wrap: wrap;
  padding-bottom: 6px;
}
.video-tag {
  padding: 3px;
  font-size: 0.7em;
  color: rgba(227, 239, 217, .8);
}
</style>

<script>
  import 'babel-polyfill';
  import NocoLisToolClient from './util/nicolistool_client';
  const client = new NocoLisToolClient();

  module.exports = {
    props: {
      'mylistId'  : String,
      'mylistName': String,
      'mylistFilterWord': String
    },
    data: function() {
      return {
        items: [],
        mylistItemSearch: ''
      }
    },
    created: function () {
      if (this.mylistId) {
        this.fetchData(this.mylistId);
      }
    },
    updated: function() {
      $('#grid').masonry('reloadItems').masonry();
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
        const response = await client.getMyListItems(myListId);
        await Promise.all(response.map(async res => {
          const tags_info = await client.getVideoTags(res.video_id.slice(2));
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
        if (this.mylistFilterWord === "") {
          return this.items;
        }
        return this.items.filter(item => {
          const word = this.mylistFilterWord.toLowerCase();
          const likeTitle = item.title.toLowerCase().indexOf(word) > -1;
          const likeTags  = item.tags.some(tag => tag.toLowerCase().indexOf(word) > -1);
          return likeTitle || likeTags;
        });
      }
    }
  }
</script>
