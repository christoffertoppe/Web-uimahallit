<template>
  <div id="app">
    <SearchView id="searchView" @searchResultFromFetch="updateSearchResult"/>
    <!--div id="lowerContainer"-->
    <SearchResultView id="searchResultView" :searchResult="searchResult"/>
      <!--AsideView id="asideView" :showComments="showComments" :pool="pool" /-->
    <!--/div-->
  </div>
</template>

<script>
  import SearchView from "../components/home/SearchView.vue"
  import SearchResultView from "../components/home/SearchResultView.vue"
  // import AsideView from "../components/home/AsideView.vue";

  export default {
    name: 'home',
    components: {
      SearchView,
      SearchResultView,
      // AsideView
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
      /*updatePool(pool, showComments){
        this.pool = pool;
        this.showComments = showComments;
      },
      hideComments(showComments){
        this.showComments = showComments;
      }*/
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

  /*
  #lowerContainer{
    display: flex;
    flex-direction: row;
  }*/
/*
  #searchResultView{
    width: 100%;
  }*/
  /*#asideView{
    width: 25%;
  }*/

  /*
  @media screen and (max-width: 820px){
    #lowerContainer{
      flex-direction: column;
    }
    #searchResultView{
      width: 100%;
    }
    #asideView{
      width: 100%;
    }
  }*/
</style>
