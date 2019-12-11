<template>
    <div id="mainContainer">
        <h1>Uimahallit</h1>
        <form v-on:submit.prevent="searchByName">
            <fieldset id="searchSet">
                <label><input v-model="locationName" type="text" name="poolSearch" id="nameSearchField" required></label>
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
    //var _ = require('lodash');
    import {groupBy} from "lodash";

    /**
     * Component that handles searching for inside swimming pools in the metropolitan area of Helsinki Finland.
     * The search option are searching all swimming pools, searching pools by city and searching pools by keyword.
     * The search result is in JSON format and are emitted to SearchResultView component that handles viewing the swimming pools.
     *
     */
    export default {
        name: "SearchView",
        /**
         * locationName - user input keyword used to search for pools
         * searchResult - An array of JavaScript objects, each object contains information on a specific pool
         * searchResultGrouped - JavaScript object that groups pools by their city, lodash library used for grouping
         */
        data: function (){
            return{
                locationName:"",
                searchResult:[],
                searchResultGrouped:{},
                latestSearchType: ""
            }
        },
        methods:{
            /**
             * Function for searching every swimming pool in the database.
             */
            searchAll: function(){
                let url = "http://localhost:8080/api/location/all";
                this.latestSearchType = "all";

                fetch(url).then(res => res.json())
                    .then(data => (this.searchResult = data))
                    .catch(function(error) {
                    console.error(error);
                });
            },
            /**
             * Function for searching swimming pools in the database by city name.
             * @param event - event object from clicking a DOM element
             */
            searchByCity: function(event) {
                let city = event.target.getAttribute("value");
                console.log(city);
                this.latestSearchType = city;

                let url = "http://localhost:8080/api/location/city?name=" + city;
                fetch(url).then(res => res.json())
                    .then(data => (this.searchResult = data))
                    .catch(function(error) {
                        console.error(error);
                    });

            },
            /**
             * Function for searching swimming pools in the database by keyword.
             */
            searchByName: function(){
                console.log(this.locationName);
                this.latestSearchType = this.locationName;

                let url = "http://localhost:8080/api/location?searchWord=" + this.locationName;
                fetch(url).then(res => res.json())
                    .then(data => (this.searchResult = data))
                    .catch(function(error) {
                        console.error(error);
                    });

                this.locationName = "";


            }
        },
        watch:{
            /**
             * Function that handles grouping of search result when searchResult-data changes.
             * lodash library used for grouping.
             * Emits searchResultGrouped to Home component that conveys it to be used in SearchResultView
             */
            searchResult: function () {
                this.searchResultGrouped = groupBy(this.searchResult, "kaupunki");
                console.log("hakutyyppi: " + this.latestSearchType)
                console.log(this.searchResultGrouped);
                this.$emit("searchResultFromFetch", this.searchResultGrouped, this.latestSearchType);
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

#mainContainer{
    display: flex;
    flex-direction: column;
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
    margin: 0 0 0 20px;
}

@media screen and (max-width: 680px){
    #citySet > label{
        float: none;
        width: 100%;
    }
}
</style>