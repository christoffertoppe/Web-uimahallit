<template>
  <div id="app">
    <h1>Uimahallit</h1>
    <SearchView @searchResultFromFetch="updateSearchResult"/>
    <div id="midContainer">
      <SearchResultView id="searchResultView" :searchResult="searchResult"/>
      <AsideView id="asideView"/>
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
      searchResult: []
    };
  },
  methods:{
    updateSearchResult(data){
      this.searchResult = data;
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
  width: 70%;
}
#asideView{
  width: 30%;
}
</style>
