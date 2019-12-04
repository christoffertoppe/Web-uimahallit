<template>
    <div id="mainContainer">
        <h3>Kommenttiosio</h3>
        <div id="commentContainer" v-if="showComments">
            <ul id="commentList">
                <li v-for="(comment, index) in poolComments" :key=index class="comment">{{comment}}</li>
            </ul>

            <form v-on:submit.prevent="sendComment" id="commentForm">
                <label>Jätä kommentti: <textarea v-model="userComment" name="userComment" placeholder="Jätä kommentti" form="commentForm" required></textarea></label>
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
                poolId: "",
                pools: [],
                poolComments: []
            }
        },
        methods:{
            sendComment: function () {
                console.log(this.userComment);

                let url = "http://localhost:8080/api/comment";
                const data = {
                    id: this.poolId,
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
                    /*.then(res => res.json())
                    .then(data => (console.log(data)))*/
                    /*.then(this.updateComments())*/
                    .catch(function(error){
                        console.log(error);
                    });

                this.userComment = "";
            },
            /*updateComments: function () {
                let url = "http://localhost:8080/api/location/all";

                fetch(url).then(res => res.json())
                    .then(data => this.pools = data)
                    .catch(function(error){
                        console.log(error);
                    });
            }*/
        },
        watch:{
            pool: function(){
                this.poolId = this.pool._id;
                this.poolComments = this.pool.kommentit;
            },
            /*pools: function () {
                for(let i = 0; i < this.pools.length; i++){
                    if(this.pools[i]._id === this.poolId){
                        this.poolComments = this.pools[i].kommentit;
                        console.log(this.poolComments);
                        break;
                    }
                }
            }*/
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