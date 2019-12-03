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
        <h2>Luo uusi uimahalli:</h2>
        <p v-if="error && submitting" class="error-message">TÄYTÄ KAIKKI KENTÄT!</p>
        <form @submit.prevent="createSwimhall">
            Nimi:
            <input type="text" v-model="nimi" pattern=".{10,}" placeholder="Uimahallin nimi" required/>
            <div>
            Ratapituus:
                <label><input type="radio" v-model="ratapituus" name="ratapituus" value="ei" id="ei" required>ei tiedossa</label>
                <label><input type="radio" v-model="ratapituus" name="ratapituus" value="17">17</label>
                <label><input type="radio" v-model="ratapituus" name="ratapituus" value="25">25</label>
                <label><input type="radio" v-model="ratapituus" name="ratapituus" value="50">50</label>
            </div>
                <div>
            Ratamäärä:
            <input type="number" v-model="ratamäärä" min="0" max="99" required>
            </div>
            <div>
            Puhelin:
            <input type="text" v-model="puhelin" pattern="[0-9]{8,}" placeholder="0401231234" required>
            </div>
            <div>
            Osoite:
            <input type="text" v-model="osoite" placeholder="osoite, postinumero ja paikkakunta" required>
            </div>
            <div>
            Kaupunki:
            <input type="text" v-model="kaupunki" placeholder="kaupunki" required>
            </div>
            <fieldset>
            <legend>Aukioloajat:</legend>
            MA<input type="text" v-model="ma" placeholder="10.00-20.00 / kiinni" pattern="[0-9]{1,2}.[0-9]{2}(?:-|–)[0-9]{1,2}.[0-9]{2}.*|kiinni" title="anna muodossa alku-loppu!" required>
                <br>TI<input type="text" v-model="ti" placeholder="10.00-20.00 / kiinni" pattern="[0-9]{1,2}.[0-9]{2}(?:-|–)[0-9]{1,2}.[0-9]{2}.*|kiinni" title="anna muodossa alku-loppu!" required>
                <br>KE<input type="text" v-model="ke" placeholder="10.00-20.00 / kiinni" pattern="[0-9]{1,2}.[0-9]{2}(?:-|–)[0-9]{1,2}.[0-9]{2}.*|kiinni" title="anna muodossa alku-loppu!" required>
                <br>TO<input type="text" v-model="to" placeholder="10.00-20.00 / kiinni" pattern="[0-9]{1,2}.[0-9]{2}(?:-|–)[0-9]{1,2}.[0-9]{2}.*|kiinni" title="anna muodossa alku-loppu!" required>
                <br>PE<input type="text" v-model="pe" placeholder="10.00-20.00 / kiinni" pattern="[0-9]{1,2}.[0-9]{2}(?:-|–)[0-9]{1,2}.[0-9]{2}.*|kiinni" title="anna muodossa alku-loppu!" required>
                <br>LA<input type="text" v-model="la" placeholder="10.00-20.00 / kiinni" pattern="[0-9]{1,2}.[0-9]{2}(?:-|–)[0-9]{1,2}.[0-9]{2}.*|kiinni" title="anna muodossa alku-loppu!" required>
                <br>SU<input type="text" v-model="su" placeholder="10.00-20.00 / kiinni" pattern="[0-9]{1,2}.[0-9]{2}(?:-|–)[0-9]{1,2}.[0-9]{2}.*|kiinni" title="anna muodossa alku-loppu!" required><br>
            </fieldset>
            Hinta aikuinen:
            <input type="number" min="0" max="50" step="0.1" v-model="hinta" required>
            Hinta muut:
            <input type="number" value="5" min="0" max="50" step="0.1" v-model="alehinta" required>
            <div>
            <input type="submit" value="Lisää uimahalli">
            </div>
            <p v-if="success" class="success-message">Uimahalli lisätty...</p>
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
        nimi: '',
        ratapituus: '',
        ratamäärä: '',
        puhelin: '',
        ma: '',
        ti: '',
        ke: '',
        to: '',
        pe: '',
        la: '',
        su: '',
        hinta: '',
        alehinta: '',
        osoite: '',
        kaupunki: '',
      };
    },
    props: {
      swimhalls: Array,
    },
    methods: {
      createSwimhall() {
        this.submitting = true
        this.clearStatus()

        console.log(this.nimi + ", " + this.ratapituus);
        if (this.invalidName || this.invalidRatapituus) {
          this.error = true
          return
        }

        let url = "http://localhost:8080/api/add";
        const data = {
          nimi: this.nimi,
          ratapituus: parseInt(this.ratapituus),
          ratamäärä: parseInt(this.ratamäärä),
          puhelin: this.puhelin,
          aika: [this.ma, this.ti, this.ke, this.to, this.pe, this.la, this.su],
          hinta: parseFloat(this.hinta),
          alehinta: parseFloat(this.alehinta),
          osoite: this.osoite,
          kaupunki: this.kaupunki
        };
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        };

        fetch(url, options)
        .then(res => res.json())
        .then(data => (console.log(data)))
        .catch(function(error) {
          console.error(error);
        });

        this.error = false
        this.success = true
        this.submitting = false

      },
      clearStatus() {
        this.success = false
        this.error = false
      }
    },
    computed: {
      invalidName() {
        return this.nimi === '';
      },
      invalidRatapituus() {
        return this.ratapituus === '';
      },
    },
  };
</script>

<style scoped>
    #add-view {
        position: relative;
    }
    input[type="submit"]{
        font-size: large;
        background-color: blue;
        color: white;
    }
    input[type="number"]{
    }
    input[type="text"] {
    }

    form {
        width: 100%;
        color: #0366EE;
    }
</style>