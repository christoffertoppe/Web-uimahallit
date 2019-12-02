<template>
    <div id="mainContainer">
        <h3 v-if="showComments">Kommenttiosio</h3>
        <h3 v-else>Sivuelementti</h3>
        <div id="commentContainer" v-if="showComments">
            <ul id="commentList">
                <li v-for="(comment, index) in pool.kommentit" :key=index class="comment">{{comment}}</li>
            </ul>

            <form v-on:submit.prevent="sendComment" id="commentForm">
                <label>Jätä kommentti: <textarea v-model="userComment" name="userComment" placeholder="Jätä kommentti" form="commentForm"></textarea></label>
                <input type="submit" name="comment" value="Lähetä">
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AsideView",
        props: {
            showComments: Boolean,
            pool: Object
        },
        data: function(){
            return{
                userComment: "",
                poolId: ""
            }
        },
        methods:{
            sendComment: function () {
                console.log(this.userComment);

                let url = "http://localhost:8080/api/comment";
                const data = {
                    id: 2,
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
                    .then(data => (console.log(data)))
                    .catch(function(error) {
                        console.error(error);
                    });
                /*let url = "http://localhost:8080/api/comment";

                fetch(url, {
                    method: "POST",
                    body: {
                        id: 2,
                        comment: this.userComment
                    },
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(function(res) {
                    return res.json();
                }).then(function(data){
                    console.log(data);
                }).catch(function(error) {
                    console.error(error);
                });
*/
            }
        }
    }
</script>

<style scoped>
ul{
    list-style-type: none;
    padding: 0;
}
li{
    margin: 0;
    padding: 20px;
    width: auto;
}
</style>