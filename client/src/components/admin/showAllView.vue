<template>
    <div id="show-all-view">
        <h2>Tietokanta</h2>
        <p v-if="swimhalls.length < 1">
            Ei uimahalleja!
        </p>
        <table v-else>
            <thead>
            <tr>
                <th>id</th>
                <th>Nimi</th>
                <th>Kaupunki</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(swimhall, index) in swimhalls" :key="swimhall._id">
                <td>{{ swimhall._id }}</td>
                <td>{{ swimhall.nimi }}</td>
                <td>{{ swimhall.kaupunki }}</td>
                <td><button id="update" v-on:click="modifyHall(index)">Muokkaa tietoja</button></td>
                <td><button id="remove" v-on:click="deleteHall(swimhall._id, swimhall.nimi)">Poista</button></td>

            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
  /**
   * Component takes care of showing all the swimming halls of the database.
   * It also offers the buttons for updating and deleting swimming halls.
   * Retrieves the data from Admin through swimhalls array
   */
  export default {
    name: "showAllView",
    props: {
      swimhalls: Array,
    },
    methods: {
      /**
       * Offers the data of selected swimming hall for the updateView form by emitting the data of the chosen swimming hall
       * to Admin component. Admin component conveys the data to updateView for showing it in the update form with hall Object.
       */
      modifyHall: function(index) {
        this.$emit("editHall", this.swimhalls[index]);
      },
      /**
       * Deletes the chosen swimming hall. Sends the index of the removable hall to the api using
       * http delete request.
       */
      deleteHall: function(index, nimi) {
        console.log(index);
        console.log(nimi);
        if (confirm("Haluatko varmasti poistaa " + nimi + "n?")) {
          let url = "http://localhost:8080/api/removeswimhall";
          const data = {
            _id: index
          };
          const options = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          };

          fetch(url, options).then(res => res.json()).then(data => (console.log(data))).catch(function(error) {
            console.error(error);
          });
          console.log(nimi + " poistettu!");
        }
      },
    },/*
    watch: {
      swimhalls: function() {
        console.log("muuttuuu!");
      }
    }*/
  }
</script>

<style scoped>

    #update {
        background-color: deepskyblue;
    }
    #remove {
        background-color: red;
    }

</style>