<template>
    <div id="mainContainer">
        <h2>Haun tulokset:</h2>
        <ul id="searchResultList">
            <li v-for="(pool, index) in searchResult" :key="pool.id" class="pool">
                <h4 class="poolName" @click="helper(index)">{{pool.nimi}}</h4>
                <ul class="poolInfoList" v-if="poolIndex === index">
                    <li class="openingHoursItem">
                        <h5>Aukioloajat:</h5>
                        <ul id="openingHours">
                            <li v-for="(hours, index) in pool.aika" :key="hours.id">{{weekdays[index]}}: {{hours}}</li>
                        </ul>
                    </li>
                    <li>Ratapituus: {{pool.ratapituus}} m</li>
                    <li v-if="pool.ratamäärä > 0">Ratojen määrä: {{pool.ratamäärä}}</li>
                    <li>Hinta: {{pool.hinta}} €</li>
                    <li>Alehinta: {{pool.alehinta}} €</li>
                    <li>Kaupunki: {{pool.kaupunki}}</li>
                    <li>Osoite: {{pool.osoite}}</li>
                    <li>Puhelin: {{pool.puhelin}}</li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "SearchResultView",
        props:{
            searchResult: Array
        },
        data: function(){
            return{
                weekdays: ["Ma", "Ti", "Ke", "To", "Pe", "La", "Su"],
                poolIndex: -1
            }
        },
        methods:{
            updatePoolIndex: function(index){
                if(this.poolIndex === index){
                    this.poolIndex = -1;
                }else {
                    this.poolIndex = index;
                }
            },
            sendComments: function(index){
                this.$emit("commentsFromResult", this.searchResult[index].kommentit, this.poolIndex);
            },
            helper:function(index){
                this.updatePoolIndex(index);
                this.sendComments(index);
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
.poolName:hover{
    background: black;
    color: white;
}
</style>