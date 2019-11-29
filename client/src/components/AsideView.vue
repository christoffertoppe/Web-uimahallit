<template>
    <div id="mainContainer">
        <h3>Sivuelementti</h3>
        <div id="commentContainer" v-if="poolVisible">
            <ul id="commentList">
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
        data: function(){
            return{
                userComment: "",
                poolVisible: false,
                poolId: ""
            }
        },
        methods:{
            sendComment: function () {

                console.log(this.userComment);

                /*
                let url = "http://localhost:4000/api/comment";

                fetch(url, {
                    method: "POST",
                    body: {
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

</style>