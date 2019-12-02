<template>
    <div id="mainContainer">
        <form v-on:submit.prevent="searchByName">
            <fieldset id="searchSet">
                <label><input v-model="locationName" type="text" name="poolSearch" id="nameSearchField"></label>
                <input id="searchByNameButton" type="submit" name="searchByName" value="Hae">
            </fieldset>
        </form>
        <form>
            <fieldset id="citySet">
                <label>Kaikki <input v-on:click="searchAll" type="radio" name="city" value="All"></label>
                <label>Vantaa <input v-on:click="searchByCity" type="radio" name="city" value="Vantaa"></label>
                <label>Helsinki <input v-on:click="searchByCity" type="radio" name="city" value="Helsinki"></label>
                <label>Espoo <input v-on:click="searchByCity" type="radio" name="city" value="Espoo"></label>
                <label>Kauniainen <input v-on:click="searchByCity" type="radio" name="city" value="Kauniainen"></label>
                <label>Kerava <input v-on:click="searchByCity" type="radio" name="city" value="Kerava"></label>
            </fieldset>
        </form>
    </div>
</template>

<script>
    var _ = require('lodash');

    export default {
        name: "SearchView",
        props:{
        },
        data: function (){
            return{
                locationName:"",
                searchResult:[],
                searchResultGrouped:{}
            }
        },
        methods:{
            searchAll: function(){
                let url = "http://localhost:8080/api/location/all";

                fetch(url).then(res => res.json())
                    .then(data => (this.searchResult = data))
                    .catch(function(error) {
                    console.error(error);
                });
            },
            searchByCity: function(event) {
                let city = event.target.getAttribute("value");
                console.log(city);

                /*
                let url = "http://localhost:8080/api/location?name=" + city;
                    fetch(url).then(function(res) {
                    return res.json();
                }).then(function(data){
                    console.log(JSON.stringify(data));

                }).catch(function(error) {
                    console.error(error);
                });*/
            },
            searchByName: function(){
                console.log(this.locationName);

                /*
                let url = "http://localhost:8080/api/location?name=" + this.locationName;
                    fetch(url).then(function(res) {
                    return res.json();
                }).then(function(data){

                }).catch(function(error) {
                    console.error(error);
                });*/

            }
        },
        watch:{
            searchResult: function () {
                this.searchResultGrouped = _.groupBy(this.searchResult, "kaupunki");
                console.log(this.searchResultGrouped);
                this.$emit("searchResultFromFetch", this.searchResultGrouped);
            }
        }
    }
</script>

<style scoped>
label{
    margin: 0;
    padding: 0;
}
fieldset {
    margin: 0;
}
#citySet > label{
    float: left;
    width: 16.66666666%;
}
#citySet{
    display: table;
    align-content: center;
}

#nameSearchField{
    width: auto;
    margin:5px auto 5px auto;
}

#searchByNameButton{
margin: 0;
}

@media screen and (max-width: 660px){
    #citySet > label{
        float: none;
        width: 100%;
    }
}
</style>