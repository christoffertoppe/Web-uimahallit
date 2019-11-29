<template>
    <div id="mainContainer">
        <form v-on:submit.prevent="searchByName">
            <fieldset id="searchSet">
                <label><input v-model="locationName" type="text" name="poolSearch" id="nameSearchField"></label>
                <input type="submit" name="searchByName" value="Hae">
            </fieldset>
        </form>
        <form>
            <fieldset id="citySet">
                <label>Kaikki <input v-on:click="searchByCity" type="radio" name="city" value="all"></label>
                <label>Vantaa <input v-on:click="searchByCity" type="radio" name="city" value="vantaa"></label>
                <label>Helsinki <input v-on:click="searchByCity" type="radio" name="city" value="helsinki"></label>
                <label>Espoo <input v-on:click="searchByCity" type="radio" name="city" value="espoo"></label>
                <label>Kauniainen <input v-on:click="searchByCity" type="radio" name="city" value="kauniainen"></label>
                <label>Kerava <input v-on:click="searchByCity" type="radio" name="city" value="kerava"></label>
            </fieldset>
        </form>
    </div>
</template>

<script>
    export default {
        name: "SearchView",
        data: function (){
            return{
                locationName:""
            }
        },
        methods:{
            searchByCity: function(event) {
                let city = event.target.getAttribute("value");
                console.log(city);

                /*
                let url = "http://localhost:4000/api/location/" + city;
                    fetch(url).then(function(res) {
                    return res.json();
                }).then(function(data){

                }).catch(function(error) {
                    console.error(error);
                });*/
            },
            searchByName: function(){
                console.log(this.locationName);

                /*
                let url = "http://localhost:4000/api/location?name=" + this.locationName;
                    fetch(url).then(function(res) {
                    return res.json();
                }).then(function(data){

                }).catch(function(error) {
                    console.error(error);
                });*/

            }
        }
    }
</script>

<style scoped>
label{
    margin: 0;
    padding: 0;
}

#citySet > label{
    display: inline;
    margin-left: 10px;
    margin-right: 10px;
}

#nameSearchField{
    max-width: 50%;
    margin:5px auto 5px auto;

}
</style>