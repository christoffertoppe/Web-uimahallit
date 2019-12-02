<template>
    <div id="add-view">
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
                <th>Kommentit</th>

            </tr>
            </thead>
            <tbody>
            <tr v-for="swimhall in swimhalls" :key="swimhall._id">
                <td>{{ swimhall._id }}</td>
                <td>{{ swimhall.nimi }}</td>
                <td>{{ swimhall.kaupunki }}</td>
                <td>{{ swimhall.kommentit }}</td>

            </tr>
            </tbody>
        </table>
        <br><br>Luo uusi uimahalli:<br><br>
        Nimi:
        <input><br><br>
        Ratapituus:
        <input><br><br>
        Ratamäärä:
        <input><br><br>
        Puhelin:
        <input><br><br>
        Aukioloajat:
        <input><br><br>
        Hinta aikuinen:
        <input><br><br>
        Hinta muut:
        <input><br><br>
        Osoite:
        <input><br><br>
        Kaupunki:
        <input><br><br>
        <button>Tallenna</button>
    </div>
</template>

<script>
  export default {
    name: 'add-view',
    props: {
      swimhalls: Array,
    },
  };
</script>

<style scoped>
    #add-view {
        width: 50%;
    }
</style>