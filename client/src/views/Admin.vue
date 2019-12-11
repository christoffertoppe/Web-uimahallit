<template>
  <div id="admin">
    <h1>Admin</h1>
    <add-view id="addView" @add:swimhall="addHall"/>
    <div id="mainContainer">
      <show-all-view id="showAllView" @editHall="updateHall" :swimhalls="swimhalls"/>
      <update-view id="updateView" :hall="hall" />
    </div>
  </div>

</template>

<script>
  import showAllView from '../components/admin/showAllView';
  import addView from '../components/admin/addView';
  import updateView from '../components/admin/updateView';

  /**
   * Component that holds showAllView, addView and updateView
   */
  export default {
    name: 'admin',
    components: {
      updateView,
      showAllView,
      addView
    },
    props:{
    },
    data() {
      /**
       * swimhalls - An empty array of the swimming halls where the database data is inserted
       * hall - An empty swimming hall object in which the to-be-updated data is transferred
       * authenticated - Flag for checking if the user has been authenticated by the server, value got from parent component App.vue
       */
      return {
        swimhalls: [],
        added: false,
        hall:{},
        authenticated: this.$parent.authenticated
      }
    },
    /**
     * If user not authenticated, page is redirected to home page "/"
     * Loads the database data right away to fill the table in showAllView
     */
    mounted() {
      if(!this.authenticated){
        this.$router.replace({path:"/"});
      }
      this.getSwimHalls()
    },

    methods: {
      /**
       * Retrieves all the data from the swimming hall database and inserts it into swimhalls variable for the showAllView table.
       */
      async getSwimHalls() {
        try {
          const response = await fetch('http://localhost:8080/api/location/all')
          const data = await response.json()
          this.swimhalls = data
        } catch (error) {
          console.error(error);
        }
      },
      /**
       * Sets the swimming hall to be modified from showAllView to the updateView.
       * @param {object} hall - swimming hall object that was chosen with showAllView's update button
       */
      updateHall(hall) {
        this.hall = hall;
      },
      addHall(data) {
        console.log("Admin saavutettu!");
        this.swimhalls = Object.values(data);
        this.added = true;
      }
    },
    watch: {
      added: function() {
        this.getSwimHalls();
        this.added = false;
      }
    }
  }
</script>

<style>
  #admin {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
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
