<template>
    <div id="app">
        <h1>Admin</h1>
        <div id="mainContainer">
        <show-all-view id="showAllView" @editHall="updateHall" :swimhalls="swimhalls"/>
            <update-view id="updateView" :hall="hall" :swimhalls="swimhalls" />
        <add-view id="addView"/>
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
        hall:{}
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
      }
    }
  }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
    #mainContainer{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
    #showAllView{
        width: 50%;
    }
    #updateView{
        width: 50%;
    }

    #addView{
        width: 100%;
    }
</style>
