<template>
  <div>
    <div class="mylist-contents-list">
      <div class="mylist-contents" v-for="item in limitedAndFilteredItems" :key="item.video_id">
        <div class="video-thumbnail" v-lazy-container="{ selector: 'img' }">
          <a :href="getUrl(item.video_id)" target="_blank" rel="noopener">
            <img :data-src="getThumbnailUrl(item.thumbnail_url)" width="320" height="180">
          </a>
        </div>
        <div class="video-title">{{ item.title }}</div>
        <div class="video-tags">
          <div class="video-tag" v-for="tag in item.tags">
            <span>{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <p v-on:click="loadNextMylistItems">次の{{ this.showMylistCountPer }}を読み込む</p>
    </div>
  </div>
</template>

<style>
.mylist-name {
  color: #e3eddb;
  margin-left: 16px;
}

.mylist-contents-list {
  display: flex;
  flex-flow: wrap;
}
.mylist-contents {
  width: 320px;
  height: 380px;
  margin: 3px;
  background-color: #1c1c1c;
  border-radius: 20px;
  box-shadow: 0 0 2px rgba(180, 207, 158, .3);
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
  import NocoLisToolClient from './util/nicolistool_client';

  const client = new NocoLisToolClient();

  export default {
    props: {
      'mylistId'  : String,
      'mylistName': String,
      'mylistFilterWord': String
    },
    data: function() {
      return {
        items: [],
        mylistItemSearch: '',
        showMylistCount: 50,
        showMylistCountPer: 50
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
          this.showMylistCount = this.showMylistCountPer;
          this.fetchData(newMylistId);
        }
      }
    },
    methods: {
      fetchData: async function(myListId) {
        const response = await client.getMyListItems(myListId);
        const split = (array, n) => array.reduce( (acc, c, i) => i % n ? acc : [ ...acc, array.slice(i, i + n )], []);
        await Promise.all(split(response, 100).flatMap(async resArr => {
          const tags_infos = await client.getVideosTags(resArr.map(res => res.video_id.slice(2)));
          for (let i = 0; i < resArr.length; i++) {
            resArr[i].tags = tags_infos[i];
          }
        }));
        this.items = response;
      },
      loadNextMylistItems: function() {
        this.showMylistCount += this.showMylistCountPer;
      },
      getUrl: function(id) {
        return `https://www.nicovideo.jp/watch/${id}`;
      },
      getThumbnailUrl: function(url) {
        return url.replace(/https?/, "https");
      }
    },
    computed: {
      limitedAndFilteredItems() {
        if (this.mylistFilterWord === "") {
          return this.items.slice(0, this.showMylistCount);
        }
        return this.items.filter(item => {
          const word = this.mylistFilterWord.toLowerCase();
          const likeTitle = item.title.toLowerCase().indexOf(word) > -1;
          const likeTags  = item.tags.some(tag => tag.toLowerCase().indexOf(word) > -1);
          return likeTitle || likeTags;
        }).slice(0, this.showMylistCount);
      }
    }
  }
</script>
