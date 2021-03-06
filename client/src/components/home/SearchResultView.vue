<template>
    <div>
        <div id="mainContainer">
        <div id="poolListContainer">
            <h2>Haun tulokset:</h2>
            <ul>
                <li v-for="(city, name) in this.watchedSearchResult" :key="name"><h3>{{name}}</h3>
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
    import {groupBy} from "lodash";
    /**
     * Component handles showing swimming pool search results, and the logic for displaying pool information and comments.
     */
    export default {
        name: "SearchResultView",
        /**
         * searchResult - Contains information on the swimming pools. Receives the grouped object emitted from searchView by searchResult
         * latestSearchType - The most recent type of search, emitted from SearchView
         */
        props:{
            // searchResult - Contains information on the swimming pools. Receives the grouped object emitted from searchView by searchResult
            searchResult: Object,
            // latestSearchType - The most recent type of search, emitted from SearchView
            latestSearchType: String
        },
        /**
         * weekdays - An array containing weekdays, used in printing opening hours for swimming pools
         * poolIndex - Indicates current clicked index of the swimming pool array, used in hiding pool data and comments
         * currentCity - Indicates current clicked city of the grouped swimming pool object
         * currentPool - The current pool that is clicked in the swimming pool array, used to display corresponding comments
         * userComment - User comment string
         * showComments - Flag for indicating whether comment section for a swimming pool should be displayed
         * watchedSearchResult - an object variable in which searchResult prop is put
         */
        data: function(){
            return{
                weekdays: ["Ma", "Ti", "Ke", "To", "Pe", "La", "Su"],
                poolIndex: -1,
                currentCity: "",
                currentPool: {},
                userComment: "",
                showComments: false,
                watchedSearchResult: {}
            }
        },
        methods:{
            /**
             * @vuese
             * Updates the index of swimming pool array the user clicks.
             * The pool information and comments are hidden if user clicks the same index twice
             *
             * @arg index - list item index the user clicked
             */
            updatePoolIndex: function(index){
                if(this.poolIndex === index){
                    this.poolIndex = -1;
                    this.showComments = false;
                }else {
                    this.poolIndex = index;
                    this.showComments = true;
                }
            },
            /**
             * @vuese
             * Updates the current city based on the location where the pool that user has clicked.
             * Prevents displaying pool information from other cities with the same pool index.
             *
             * @arg name - name of the city
             */
            updateCurrentCity: function(name){
              this.currentCity = name;
            },
            /**
             * @vuese
             * Updates the pool that user has clicked, used to show corresponding comments
             * @arg pool - pool that user has clicked
             */
            updateCurrentPool: function(pool){
                this.currentPool = pool;
            },
            /**
             * @vuese
             * Helper function that fires when user clicks a pool in the displayed pool array.
             * Contains functions tha
             *
             * @arg pool - pool object from the pool list user has clicked
             * @arg index - index from the pool list user has clicked
             * @arg name - city name
             */
            helper:function(pool, index, name){
                this.updateCurrentPool(pool);
                this.updatePoolIndex(index);
                this.updateCurrentCity(name);
            },
            /**
             * @vuese
             * Fires when user clicks the corresponding button. Sends user comment string to api using http post request.
             * Respond contains set of pool objects with updated comments
             */
            sendComment: function () {
                console.log(this.userComment);
                console.log(this.latestSearchType);

                let url = "http://localhost:8080/api/comment";
                const data = {
                    id: this.currentPool._id,
                    comment: this.userComment,
                    type: this.latestSearchType
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
                        console.log("kommentti vastaus");
                        console.log(res);
                        let grouped = groupBy(res, "kaupunki");
                        this.watchedSearchResult = grouped;
                        this.currentPool = grouped[this.currentCity][this.poolIndex];
                    })
                    .catch(function(error){
                        console.log(error);
                    });

                this.userComment = "";
            }
        },
        watch:{
            /**
             * @vuese
             * Fires when searchResult prop is changed. Sets comment section visibility to false,
             * and resets current user clicked pool to empty. Sets searchResult prop to variable so it can be mutated.
             */
            searchResult: function(){
                this.poolIndex = -1;
                this.showComments = false;
                this.currentPool = {};
                this.watchedSearchResult = this.searchResult;
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