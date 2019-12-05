<template>
    <div id="app">
        <h1>Admin</h1>
        <add-view id="addView"/>
        <div id="mainContainer">
        <show-all-view id="showAllView" @editHall="updateHall" :swimhalls="swimhalls"/>
            <update-view id="updateView" @delete:kommentti="deleteComment" :hall="hall" :swimhalls="swimhalls" />
        </div>
    </div>

</template>

<script>
  import showAllView from './components/showAllView';
  import addView from './components/addView';
  import updateView from './components/updateView';

  export default {
    name: 'app',
    components: {
      updateView,
      showAllView,
      addView
    },
    data() {
      return {
        swimhalls: [],
        hall:{},
        kommentit:[]
      }
    },
    mounted() {
      this.getSwimHalls()
    },

    methods: {
      async getSwimHalls() {
        try {
          const response = await fetch('http://localhost:8080/api/location/all')
          const data = await response.json()
          console.log("hakee....")
          this.swimhalls = data
        } catch (error) {
          console.error(error);
        }
      },
      updateHall(hall) {
        this.hall = hall;
      },
      async deleteComment(id, commentId) {
          let url = "http://localhost:8080/api/comment";
          const data = {
            id: id,
            comment: commentId
          };
          const options = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          };

          fetch(url, options)
          /*.then(res => res.json())
        .then(data => (console.log(data)))*/
          /*.then(this.updateComments())*/.catch(function(error) {
            console.log(error);
          });
      }
    }
  }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        margin-top: 60px;
    }
    #mainContainer{
        display: flex;
        flex-direction: row;
    }
    #showAllView{
        width: 50%;
        padding: 30px;
        background-color: darkgrey;
    }
    #updateView{
        width: 50%;
        padding: 30px;
        background-color: burlywood;
    }

    #addView{
        width: 100%;
        padding: 30px;
        background-color: deepskyblue;
    }
</style>
