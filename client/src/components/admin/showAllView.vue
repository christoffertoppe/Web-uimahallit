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
            <tr v-for="(swimhall, index) in swimhalls" :key="index">
                <td>{{ swimhall._id }}</td>
                <td>{{ swimhall.nimi }}</td>
                <td>{{ swimhall.kaupunki }}</td>
                <td><button id="update" v-on:click="showInfo(index)">Muokkaa tietoja</button></td>
                <td><button id="remove" v-on:click="deleteHall(swimhall._id, swimhall.nimi)">Poista</button></td>

            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
  export default {
    name: "showAllView",
    props: {
      swimhalls: Array,
    },
    methods: {
      showInfo: function(index) {
        this.$emit("editHall", this.swimhalls[index]);
      },
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
    },
    watch: {
      swimhalls: function f() {
        console.log(this.swimhalls);
      }
    }
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