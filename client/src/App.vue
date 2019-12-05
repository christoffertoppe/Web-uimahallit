<template>
  <div id="app">
    <SearchView @searchResultFromFetch="updateSearchResult"/>
    <div id="midContainer">
      <SearchResultView id="searchResultView" :searchResult="searchResult" @selectedPool="updatePool" @hideComments="hideComments"/>
      <AsideView id="asideView" :showComments="showComments" :pool="pool" />
    </div>
  </div>
</template>

<script>
import SearchView from "./components/SearchView.vue"
import SearchResultView from "./components/SearchResultView.vue"
import AsideView from "./components/AsideView.vue";

export default {
  name: 'app',
  components: {
    SearchView,
    SearchResultView,
    AsideView
  },
  data: function(){
    return{
      searchResult: {},
      showComments: false,
      pool: {}
    };
  },
  methods:{
    updateSearchResult(data){
      this.searchResult = data;
    },
    updatePool(pool, showComments){
      this.pool = pool;
      this.showComments = showComments;
    },
    hideComments(showComments){
      this.showComments = showComments;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#midContainer{
  display: flex;
  flex-direction: row;
}

#searchResultView{
  width: 75%;
}
#asideView{
  width: 25%;
}

@media screen and (max-width: 820px){
  #midContainer{
    flex-direction: column;
  }
  #searchResultView{
    width: 100%;
  }
  #asideView{
    width: 100%;
  }
}
</style>
