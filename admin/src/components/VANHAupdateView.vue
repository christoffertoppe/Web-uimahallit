<template>
    <div id="update-view">

        <h2>Muokkaa uimahallia</h2>
        <form id="updateForm">
            ID:
            <input type="text" size="3" v-model="id" required disabled/>
            <div>
                Nimi:
                <input type="text" pattern=".{10,}" v-model="nimi" required/>
            </div>
            <div>
                Ratapituus:
                <input type="text" name="ratapituus" v-model="ratapituus" id="ei" required>
                <!--label><input type="radio" name="ratapituus" :value="ratapituus">17</label>
                <label><input type="radio" name="ratapituus" :value="ratapituus">25</label>
                <label><input type="radio" name="ratapituus" :value="ratapituus">50</label>-->
            </div>
            <div>
                Ratamäärä:
                <input type="number" min="0" max="99" v-model="ratamäärä" required>
            </div>
            <div>
                Puhelin:
                <input type="text" pattern="[0-9]{8,}" v-model="puhelin" required>
            </div>
            <div>
                Osoite:
                <input type="text" size="40" v-model="osoite" required>
            </div>
            <div>
                Kaupunki:
                <input type="text" v-model="kaupunki" required>
            </div>
            <fieldset>
                <legend>Aukioloajat:</legend>
                MA<input type="text" v-model="ma" pattern="[0-9]{1,2}.[0-9]{2}(?:-|–)[0-9]{1,2}.[0-9]{2}.*|kiinni"
                         title="anna muodossa alku-loppu!" required>
                <br>TI<input type="text" v-model="ti" pattern="[0-9]{1,2}.[0-9]{2}(?:-|–)[0-9]{1,2}.[0-9]{2}.*|kiinni"
                             title="anna muodossa alku-loppu!" required>
                <br>KE<input type="text" v-model="ke" pattern="[0-9]{1,2}.[0-9]{2}(?:-|–)[0-9]{1,2}.[0-9]{2}.*|kiinni"
                             title="anna muodossa alku-loppu!" required>
                <br>TO<input type="text" v-model="to" pattern="[0-9]{1,2}.[0-9]{2}(?:-|–)[0-9]{1,2}.[0-9]{2}.*|kiinni"
                             title="anna muodossa alku-loppu!" required>
                <br>PE<input type="text" v-model="pe" pattern="[0-9]{1,2}.[0-9]{2}(?:-|–)[0-9]{1,2}.[0-9]{2}.*|kiinni"
                             title="anna muodossa alku-loppu!" required>
                <br>LA<input type="text" v-model="la" pattern="[0-9]{1,2}.[0-9]{2}(?:-|–)[0-9]{1,2}.[0-9]{2}.*|kiinni"
                             title="anna muodossa alku-loppu!" required>
                <br>SU<input type="text" v-model="su" pattern="[0-9]{1,2}.[0-9]{2}(?:-|–)[0-9]{1,2}.[0-9]{2}.*|kiinni"
                             title="anna muodossa alku-loppu!" required><br>
            </fieldset>
            Hinta aikuinen:
            <input type="number" min="0" max="50" step="0.1" v-model="hinta" required>
            Hinta muut:
            <input type="number" min="0" max="50" step="0.1" v-model="alehinta" required>
            <div>
                Nettisivu:
                <input type="text" v-model="url" size="50" required>
            </div>
            <div>
                Kommentit:
                <ol>
                    <li v-for="(kommentti, index) in kommentit" v-bind:key="index">
                        {{kommentti}}
                        <button class="deletebuttons" @click="deleteComment(id, index)">Poista</button>
                    </li>
                </ol>
            </div>
            <div>
                <button type="submit" form="updateForm" @submit.prevent="updateSwimhall">Tallenna muutokset</button>
            </div>
            <p v-if="success" class="success-message">Uimahallia muokattu!</p>
        </form>
    </div>
</template>

<script>
  export default {
    name: 'updateView',
    props: {
      hall: Object,
    },
    data: function() {
      return {
        id: '',
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
        kommentit: '',
      };
    },
    methods: {
      updateSwimhall() {
        if (confirm('Haluatko päivittää tiedot? Tarkista että ne ovat oikein!')) {
          let url = 'http://localhost:8080/api/update';
          const data = {
            _id: parseInt(this.id),
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
            kommentit: this.kommentit,
          };
          console.log(data);
          const options = {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          };

          fetch(url, options)
          /*.then(res => res.json())
        .then(data => (console.log(data)))*/.catch(function(error) {
            console.error(error);
          });

          this.id = '',
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
              this.kommentit = '',

              this.success = true;
        }
      },
      deleteComment(id, commentId) {
        if (confirm('Haluatko poistaa hallin numero ' + id + ' kommentin numero ' + (commentId + 1) + '?')) {
          let url = 'http://localhost:8080/api/comment';
          const data = {
            id: id,
            comment: commentId,
          };
          const options = {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          };

          fetch(url, options)
          /*.then(res => res.json())
          .then(data => (console.log(data)))*/
          /*.then(this.updateComments())*/.catch(function(error) {
            console.log(error);
          });
          console.log('Kommentti numero ' + (commentId + 1) + ' hallista numero ' + id + ' poistettu!');
        }
      },
    },

    watch: {
      hall: function() {
        this.id = this.hall._id;
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
        this.url = this.hall.url;
        this.kommentit = this.hall.kommentit;
      },
    },
  };
</script>

<style scoped>
    li {
        text-align: left;
    }
    .deletebuttons {
    }

</style>