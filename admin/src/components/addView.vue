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
        <p v-if="error && submitting" class="error-message">TÄYTÄ KAIKKI KENTÄT!</p>
        <p v-if="success" class="success-message">Uimahalli lisätty...</p>
        <form @submit.prevent="handleSubmit">
            Nimi:
            <input type="text" v-model="swimhall.nimi"/><br>
            Ratapituus:<br>
            <input type="radio" v-model="swimhall.ratapituus" value="ei">ei tiedossa<br>
            <input type="radio" v-model="swimhall.ratapituus" value="25">25<br>
            <input type="radio" v-model="swimhall.ratapituus" value="50">50<br>
            Ratamäärä:
            <input type="number" v-model="swimhall.ratamäärä" min="0" max="99"><br>
            Puhelin:
            <input type="text" v-model="swimhall.puhelin"><br>
            Aukioloajat:<br>
            MA<input type="text" name="ma"><br>TI<input type="text" name="ti"><br>KE<input type="text" name="ke"><br>TO<input type="text" name="to"><br>PE<input type="text" name="pe"><br>LA<input type="text" name="la"><br>SU<input type="text" name="su"><br>

            Hinta aikuinen:
            <input type="number" step="0.1" v-model="swimhall.hinta"><br>
            Hinta muut:
            <input type="number" step="0.1" v-model="swimhall.alehinta"><br>
            Osoite:
            <input type="text" v-model="swimhall.osoite"><br>
            Kaupunki:
            <input type="text" v-model="swimhall.kaupunki"><br>
            <button>Lisää uimahalli</button>
        </form>
    </div>
</template>

<script>
  export default {
    name: 'add-view',
    data() {
      return {
        submitting: false,
        error: false,
        success: false,
        swimhall: {
          nimi: '',
          ratapituus: '',
        },
      }
    },
    props: {
      swimhalls: Array,
    },
    methods: {
      handleSubmit() {
        this.submitting = true
        this.clearStatus()

        if (this.invalidName || this.invalidRatapituus) {
          this.error = true
          return
        }
        this.$emit('add:swimhall', this.swimhall)
        console.log()
        this.swimhall = {
          nimi: '',
          ratapituus: '',
        }
        this.error = false
        this.success = true
        this.submitting = false
      },
      clearStatus(){
        this.success = false
        this.error = false
      }
    },
    computed: {
      invalidName() {
        return this.swimhall.nimi === ''
      },
      invalidRatapituus(){
        return this.swimhall.ratapituus === ''
      },
    },
  }
</script>

<style scoped>
    #add-view {
        width: 50%;
    }
</style>