<template>
    <div id="show-all-view">
        <h1>Uimahallit tietokannassa:</h1>
        <p v-if="swimhalls.length < 1">
            Ei uimahalleja!
        </p>
        <table v-else>
            <thead>
            <tr>
                <th>Uimahallin id</th>
                <th>Uimahallin nimi</th>
                <th>Kaupunki</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(swimhall, index) in swimhalls" :key="swimhall._id">
                <td>{{ swimhall._id }}</td>
                <td>{{ swimhall.nimi }}</td>
                <td>{{ swimhall.kaupunki }}</td>
                <td><button v-on:click="showNumber(index)">Päivitä</button></td>
                <td><button>Poista</button></td>

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
      showNumber: function(index) {
        this.$emit("editHall", this.swimhalls[index]);
      }
    }
  }
</script>

<style scoped>
</style>