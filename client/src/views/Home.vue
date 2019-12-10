<template>
  <div id="app">
    <SearchView id="searchView" @searchResultFromFetch="updateSearchResult"/>
    <SearchResultView id="searchResultView" :searchResult="searchResult"/>
  </div>
</template>

<script>
  import SearchView from "../components/home/SearchView.vue"
  import SearchResultView from "../components/home/SearchResultView.vue"

  export default {
    name: 'home',
    components: {
      SearchView,
      SearchResultView,
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

  #searchView{
    margin: 20px;
  }
</style>
