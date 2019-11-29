<template>
    <div id="mainContainer">
        <h3>Sivuelementti</h3>
        <ul id="commentList">
        </ul>

        <form v-on:submit.prevent="sendComment">
            <label>Jätä kommentti: <textarea v-model="userComment" name="userComment" placeholder="Jätä kommentti"></textarea></label>
            <input type="submit" name="comment" value="Lähetä">
        </form>
    </div>
</template>

<script>
    export default {
        name: "AsideView",
        data: function(){
            return{
                userComment: ""
            }
        },
        methods:{
            sendComment: function () {

                let url = 'http://localhost:4000/location/';
                fetch()
            }
        }
    }
</script>

<style scoped>

</style>