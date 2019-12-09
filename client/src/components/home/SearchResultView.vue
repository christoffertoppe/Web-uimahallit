<template>
    <div id="mainContainer">
        <label>Suodata hinnan mukaan: <input id="priceFilter" type="number" min="0" max="10" step="0.1" v-model="minFilteredPrice"></label>
        <h2>Haun tulokset:</h2>
        <ul>
            <li v-for="(city, name) in this.filteredSearchResult" :key="name"><h3>{{name}}</h3>
                <ul>
                    <li v-for="(pool, index) in city" :key="index">
                        <h4 class="poolName" @click="helper(pool, index, name)">{{pool.nimi}}</h4>
                        <ul class="poolInfoList" v-if="poolIndex === index && clickedCity === pool.kaupunki">
                            <li class="openingHoursItem">
                                <h5>Aukioloajat:</h5>
                                <ul id="openingHours">
                                    <li v-for="(hours, index) in pool.aika" :key="hours.id">{{weekdays[index]}}: {{hours}}</li>
                                </ul>
                            </li>
                            <li v-if="pool.ratapituus == null">Ratapituus: ei tiedossa</li>
                            <li v-else>Ratapituus: {{pool.ratapituus}} m</li>
                            <li v-if="pool.ratamäärä > 0">Ratojen määrä: {{pool.ratamäärä}}</li>
                            <li>Hinta: {{pool.hinta}} €</li>
                            <li>Alehinta: {{pool.alehinta}} €</li>
                            <li>Kaupunki: {{pool.kaupunki}}</li>
                            <li>Osoite: {{pool.osoite}}</li>
                            <li>Puhelin: {{pool.puhelin}}</li>
                            <li>Url: <a :href="pool.url" target="_blank">{{pool.url}}</a></li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "SearchResultView",
        props:{
            searchResult: Object
        },
        data: function(){
            return{
                minFilteredPrice: 10,
                weekdays: ["Ma", "Ti", "Ke", "To", "Pe", "La", "Su"],
                poolIndex: -1,
                clickedCity: "",
                prevPool: {},
                showComments: false
            }
        },
        methods:{
            updatePoolIndex: function(index){
                if(this.poolIndex === index){
                    this.poolIndex = -1;
                }else if(index === -1){
                    this.poolIndex = -1;
                }else {
                    this.poolIndex = index;
                }
            },
            updateClickedCity: function(name){
              this.clickedCity = name;
            },
            sendComments: function(pool){
                if(this.prevPool === pool && this.showComments){
                    this.showComments = false;
                }else{
                    this.showComments = true;
                }
                this.$emit("selectedPool", pool, this.showComments);
                this.prevPool = pool;
            },
            helper:function(pool, index, name){
                this.updatePoolIndex(index);
                this.sendComments(pool);
                this.updateClickedCity(name);
            }
        },
        watch: {
            searchResult: function () {
                this.updatePoolIndex(-1);
                this.showComments = false;
                this.$emit("hideComments", this.showComments);
            }
        },
        computed:{
            filteredSearchResult: function() {
                // filtering not complete
                let filtered = this.searchResult;
                return filtered;
            }
        }
    }
</script>

<style scoped>

h4, h5{
    margin: 0;
    padding: 0;
}
ul{
    list-style-type: none;
    padding: 0;
}
li{
    margin: 0;
    padding: 0;
    width: auto;
}

.pool{
    display: flex;
    flex-direction: column;
}
.poolName{
    border-radius: 10px;
}
.poolName:hover{
    background: #0366EE;
    color: white;
    cursor: pointer;
}
</style>