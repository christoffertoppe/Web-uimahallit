<template>
  <div id="admin">
    <h1>Admin</h1>
    <add-view id="addView" @add:swimhall="addHall"/>
    <div id="mainContainer">
      <show-all-view id="showAllView" @delete:swimhall="deleteHall" @editHall="transferHall" :swimhalls="swimhalls"/>
      <update-view id="updateView" @update:swimhall="updateHall" :hall="hall" />
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
       * edited - A flag to keep track when the list of showAllView needs to be updated
       * authenticated - Flag for checking if the user has been authenticated by the server, value got from parent component App.vue
       */
      return {
        swimhalls: [],
        hall:{},
        edited: false,
        authenticated: this.$parent.authenticated
      }
    },
    /**
     * @vuese
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
       * @vuese
       * Retrieves all the data from the swimming hall database and inserts it into swimhalls array to be shown in the showAllView table.
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
       * @vuese
       * Sets the swimming hall to be updated from the list of showAllView to the update form of the updateView.
       * Also notifies the watcher when another hall from the list has been selected.
       * @arg hall - swimming hall object that was chosen with showAllView's update button
       */
      transferHall(hall) {
        this.hall = hall;
        this.edited = true;
      },
      /**
       * @vuese
       * Notifies the watcher when new swimming hall has been added in addView.
       */
      addHall() {
        this.edited = true;
      },
      /**
       * @vuese
       * Notifies the watcher when swimming hall has been deleted in showAllView.
       */
      deleteHall() {
        this.edited = true;
      },
      /**
       * @vuese
       * Notifies the watcher when swimming hall has been edited in updateView.
       */
      updateHall() {
        this.edited = true;
      },
    },
    watch: {
      /**
       * @vuese
       * Watcher updates the list of the swimming halls in showAllView with getSwimhalls function
       * and thus keeping the view updated for the user.
       */
      edited: function() {
        this.getSwimHalls();
        this.edited = false;
      }
    }
  }
</script>

<style>


    @import "../assets/admin.module.css";
</style>
