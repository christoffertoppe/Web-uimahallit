<template>
  <div id="home">
    <SearchView id="searchView" @searchResultFromFetch="updateSearchResult"/>
    <SearchResultView id="searchResultView" :searchResult="searchResult" :latestSearchType="latestSearchType"/>
  </div>
</template>

<script>
  import SearchView from "../components/home/SearchView.vue"
  import SearchResultView from "../components/home/SearchResultView.vue"

  /**
   * Component that hold SearchView and SearchResultView. Rendered using vue routing.
   */
  export default {
    name: 'home',
    components: {
      SearchView,
      SearchResultView,
    },
    data: function(){
      return{
        searchResult: {},
        latestSearchType: "",
        showComments: false,
        pool: {}
      };
    },
    methods:{
      /**
       * @vuese
       * updates search result data emitted from SearchView
       * @arg data - grouped JavaScript object which contains swimming pools
       * @arg latestSearchType - passes the type of search used last, search by city, keyword, all
       */
      updateSearchResult(data, latestSearchType){
        this.searchResult = data;
        this.latestSearchType = latestSearchType;
      },
    }
  }
</script>

<style>
  #home {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #searchView{
    margin: 20px;
  }
</style>
