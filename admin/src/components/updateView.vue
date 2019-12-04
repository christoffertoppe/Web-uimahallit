<template>
    <div id="add-view">

        <h2>Muokkaa uimahallia</h2>
        <form @submit.prevent="updateSwimHall">
            Nimi:
            <input type="text" pattern=".{10,}" placeholder="Uimahallin nimi" :value="nimi" required/>
            <div>
                Ratapituus:
                <label><input type="radio" name="ratapituus" value="ei" id="ei" required>ei tiedossa</label>
                <label><input type="radio" name="ratapituus" value="17">17</label>
                <label><input type="radio" name="ratapituus" value="25">25</label>
                <label><input type="radio" name="ratapituus" value="50">50</label>
            </div>
            <div>
                Ratamäärä:
                <input type="number"  min="0" max="99" :value="ratamäärä" required>
            </div>
            <div>
                Puhelin:
                <input type="text"  pattern="[0-9]{8,}" :value="puhelin" required>
            </div>
            <div>
                Osoite:
                <input type="text"  :value="osoite" required>
            </div>
            <div>
                Kaupunki:
                <input type="text" :value="kaupunki" required>
            </div>
            <fieldset>
                <legend>Aukioloajat:</legend>
                MA<input type="text" :value="ma" pattern="[0-9]{1,2}.[0-9]{2}(?:-|–)[0-9]{1,2}.[0-9]{2}.*|kiinni" title="anna muodossa alku-loppu!" required>
                <br>TI<input type="text" :value="ti" pattern="[0-9]{1,2}.[0-9]{2}(?:-|–)[0-9]{1,2}.[0-9]{2}.*|kiinni" title="anna muodossa alku-loppu!" required>
                <br>KE<input type="text" :value="ke" pattern="[0-9]{1,2}.[0-9]{2}(?:-|–)[0-9]{1,2}.[0-9]{2}.*|kiinni" title="anna muodossa alku-loppu!" required>
                <br>TO<input type="text" :value="to" pattern="[0-9]{1,2}.[0-9]{2}(?:-|–)[0-9]{1,2}.[0-9]{2}.*|kiinni" title="anna muodossa alku-loppu!" required>
                <br>PE<input type="text" :value="pe" pattern="[0-9]{1,2}.[0-9]{2}(?:-|–)[0-9]{1,2}.[0-9]{2}.*|kiinni" title="anna muodossa alku-loppu!" required>
                <br>LA<input type="text" :value="la" pattern="[0-9]{1,2}.[0-9]{2}(?:-|–)[0-9]{1,2}.[0-9]{2}.*|kiinni" title="anna muodossa alku-loppu!" required>
                <br>SU<input type="text" :value="su" pattern="[0-9]{1,2}.[0-9]{2}(?:-|–)[0-9]{1,2}.[0-9]{2}.*|kiinni" title="anna muodossa alku-loppu!" required><br>
            </fieldset>
            Hinta aikuinen:
            <input type="number" min="0" max="50" step="0.1" :value="hinta" required>
            Hinta muut:
            <input type="number" min="0" max="50" step="0.1" :value="alehinta" required>
            <div>
                <input type="submit" value="Tallenna muutokset" id="submitButton">
            </div>
            <!--<p v-if="success" class="success-message">Uimahalli lisätty</p>-->
        </form>
    </div>
</template>

<script>
  export default {
    name: 'updateView',
    props: {
      swimhalls: Array,
      hall: Object
    },
    data: function() {
      return {
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
      }
    },
   // methods:

    watch:{
      hall: function() {
        this.nimi = this.hall.nimi;
        this.ratapituus = this.hall.ratapituus;
        this.ratamäärä = this.hall.ratamäärä;
        this.puhelin = this.hall.puhelin;
        this.ma = this.hall.aika[0];
        this.ti = this.hall.aika[1];
        this.ke = this.hall.aika[2];
        this.to = this.hall.aika[3];
        this.pe = this.hall.aika[4];
        this.la = this.hall.aika[5];
        this.su = this.hall.aika[6];
        this.hinta = this.hall.hinta;
        this.alehinta = this.hall.alehinta;
        this.osoite = this.hall.osoite;
        this.kaupunki = this.hall.kaupunki;
      }
    }
  };
</script>

<style scoped>

</style>