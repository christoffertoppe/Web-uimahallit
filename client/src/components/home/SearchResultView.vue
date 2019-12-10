<template>
    <div>
        <div id="mainContainer">
        <!--label>Suodata hinnan mukaan: <input id="priceFilter" type="number" min="0" max="10" step="0.1" v-model="minFilteredPrice"></label-->
        <div id="poolListContainer">
            <h2>Haun tulokset:</h2>
            <ul>
                <li v-for="(city, name) in this.searchResult" :key="name"><h3>{{name}}</h3>
                    <ul>
                        <li v-for="(pool, index) in city" :key="pool._id">
                            <h5 class="poolName" @click="helper(pool, index, name)">{{pool.nimi}}</h5>
                            <ul class="poolInfoList" v-if="poolIndex === index && currentCity === pool.kaupunki">
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

        <div id="commentContainer">
            <h3>Kommenttiosio</h3>
            <div v-if="showComments">
                <ul id="commentList">
                    <li v-for="(comment, index) in this.currentPool.kommentit" :key=index class="commentListItem">{{comment}}</li>
                </ul>

                <form v-on:submit.prevent="sendComment" id="commentForm">
                    <label>Jätä kommentti: <textarea v-model="userComment" name="userComment" placeholder="Jätä kommentti" form="commentForm" required></textarea></label>
                    <input type="submit" name="comment" value="Lähetä">
                </form>
            </div>
        </div>
        </div>
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
                weekdays: ["Ma", "Ti", "Ke", "To", "Pe", "La", "Su"],

                poolIndex: -1,
                currentCity: "",

                currentPool: {},
                userComment: "",
                showComments: false
            }
        },
        methods:{
            updatePoolIndex: function(index){
                if(this.poolIndex === index){
                    this.poolIndex = -1;
                    this.showComments = false;
                }else {
                    this.poolIndex = index;
                    this.showComments = true;
                }
            },
            updateCurrentCity: function(name){
              this.currentCity = name;
            },
            updateCurrentPool: function(pool){
                this.currentPool = pool;
            },
            helper:function(pool, index, name){
                this.updateCurrentPool(pool);
                this.updatePoolIndex(index);
                this.updateCurrentCity(name);
            },
            sendComment: function () {
                console.log(this.userComment);

                let url = "http://localhost:8080/api/comment";
                const data = {
                    id: this.currentPool._id,
                    comment: this.userComment
                };
                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                };
                fetch(url, options)
                    .then(res => res.json())
                    .then(res => {
                        console.log(res.status);
                    })
                    .catch(function(error){
                        console.log(error);
                    });

                this.userComment = "";
            }
        },
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
.poolName{
    border-radius: 10px;
}
.poolName:hover{
    background: #0366EE;
    color: white;
    cursor: pointer;
}

.commentListItem{
    padding: 20px;
    border: #0366EE solid 1px;
    border-radius: 10px;
}

#mainContainer{
    display: flex;
    flex-direction: row;
}

#poolListContainer{
    width: 75%;
}

#commentContainer{
    width: 25%;
}

#mainContainer{
    display: flex;
    flex-direction: row;
}

@media screen and (max-width: 820px){
    #mainContainer{
        flex-direction: column;
    }
    #poolListContainer{
        width: 100%;
    }
    #commentContainer{
        width: 100%;
    }
}
</style>