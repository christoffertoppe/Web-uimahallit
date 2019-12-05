<template>
    <div id="add-view">
        <h2>Luo uusi uimahalli:</h2>
        <form @submit.prevent="createSwimhall">
            Nimi:
            <input type="text" v-model="nimi" size="25" pattern=".{10,}" placeholder="Uimahallin nimi" required/>
            Ratapituus:
                <label><input type="radio" v-model="ratapituus" name="ratapituus" value="ei" id="ei" required>ei tiedossa</label>
                <label><input type="radio" v-model="ratapituus" name="ratapituus" value="17">17</label>
                <label><input type="radio" v-model="ratapituus" name="ratapituus" value="25">25</label>
                <label><input type="radio" v-model="ratapituus" name="ratapituus" value="50">50</label>
            Ratamäärä:
            <input type="number" v-model="ratamäärä" min="0" max="99" required>
            Hinta aikuinen:
            <input type="number" min="0" max="50" step="0.1" v-model="hinta" required>
            Hinta muut:
            <input type="number" maxlength="2" min="0" max="50" step="0.1" v-model="alehinta" required><br>
            Puhelin:
            <input type="text" v-model="puhelin" pattern="[0-9]{8,}" placeholder="0401231234" required>
            Osoite:
            <input type="text" v-model="osoite" size="40" placeholder="osoite, postinumero ja paikkakunta" required>
            Kaupunki:
            <input type="text" v-model="kaupunki" placeholder="kaupunki" required>
            Nettisivu:
            <input type="text" v-model="url" placeholder="https://www.osoite.fi" size="50" required>
            <fieldset>
                <legend>Aukioloajat:</legend>
                MA<input type="text" v-model="ma" placeholder="10.00-20.00 / kiinni" pattern="[0-9]{1,2}.[0-9]{2}(?:-|–)[0-9]{1,2}.[0-9]{2}.*|kiinni" title="anna muodossa alku-loppu!" required>
                TI<input type="text" v-model="ti" placeholder="10.00-20.00 / kiinni" pattern="[0-9]{1,2}.[0-9]{2}(?:-|–)[0-9]{1,2}.[0-9]{2}.*|kiinni" title="anna muodossa alku-loppu!" required>
                KE<input type="text" v-model="ke" placeholder="10.00-20.00 / kiinni" pattern="[0-9]{1,2}.[0-9]{2}(?:-|–)[0-9]{1,2}.[0-9]{2}.*|kiinni" title="anna muodossa alku-loppu!" required>
                TO<input type="text" v-model="to" placeholder="10.00-20.00 / kiinni" pattern="[0-9]{1,2}.[0-9]{2}(?:-|–)[0-9]{1,2}.[0-9]{2}.*|kiinni" title="anna muodossa alku-loppu!" required>
                PE<input type="text" v-model="pe" placeholder="10.00-20.00 / kiinni" pattern="[0-9]{1,2}.[0-9]{2}(?:-|–)[0-9]{1,2}.[0-9]{2}.*|kiinni" title="anna muodossa alku-loppu!" required>
                LA<input type="text" v-model="la" placeholder="10.00-20.00 / kiinni" pattern="[0-9]{1,2}.[0-9]{2}(?:-|–)[0-9]{1,2}.[0-9]{2}.*|kiinni" title="anna muodossa alku-loppu!" required>
                SU<input type="text" v-model="su" placeholder="10.00-20.00 / kiinni" pattern="[0-9]{1,2}.[0-9]{2}(?:-|–)[0-9]{1,2}.[0-9]{2}.*|kiinni" title="anna muodossa alku-loppu!" required><br>
            </fieldset>
            <input type="submit" value="Lisää uimahalli" id="submitButton">
            <p v-if="success" class="success-message">Uimahalli lisätty</p>
        </form>
    </div>
</template>

<script>
  export default {
    name: 'addView',
    data() {
      return {
        seen: true,
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
        url: '',
      };
    },

    methods: {
      createSwimhall() {

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
          kaupunki: this.kaupunki,
          url: this.url,
          kommentit: []
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

        this.nimi = '',
        this.ratapituus = '',
        this.ratamäärä = '',
        this.puhelin = '',
        this.ma = '',
        this.ti = '',
        this.ke = '',
        this.to = '',
        this.pe = '',
        this.la = '',
        this.su = '',
        this.hinta = '',
        this.alehinta = '',
        this.osoite = '',
        this.kaupunki = '',
        this.url = '',

        this.success = true
      },
    },
  };
</script>

<style scoped>
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
    }
</style>