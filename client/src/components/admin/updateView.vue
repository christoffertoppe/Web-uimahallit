<template>
    <div id="update-view">

        <h2>Muokkaa uimahallia</h2>
        <form @submit.prevent="updateSwimhall">
            ID:
            <input type="text" size="3" v-model="id" required disabled/>
            <div>
                Nimi:
                <input type="text" pattern=".{10,}" v-model="nimi" required/>
            </div>
            <div>
                Ratapituus:
                <input type="text" name="ratapituus" v-model="ratapituus" id="eiUpdate" required>
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
                <input type="submit" value="Tallenna muutokset" id="submitButton">
            </div>
        </form>
        <div>
            Kommentit:
            <ol>
                <li v-for="(kommentti, index) in kommentit" v-bind:key="index">
                    {{kommentti}}
                    <button class="deletebuttons" @click="deleteComment(id, index, nimi)">Poista</button>
                </li>
            </ol>
        </div>
    </div>
</template>

<script>
  export default {
    /**
     * Component handles the updating of the swimming hall data. It also allows to delete comments of the chosen swimming hall.
     * It retrieves the data of the update form through hall object of the Admin which retrieved the data from showAllView.
     */
    name: 'updateView',
    props: {
      hall: Object,
    },
    /**
     * Set default data for the add form
     */
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
        mock: 0
      };
    },
    methods: {
      /**
       * Takes the form data when form is submitted. Sends this update data to api using a http put request.
       * After the send method empties the form.
       */
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
          const options = {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          };

          fetch(url, options)
          .then(res => res.json())
          .then(data => (console.log(data)))
          .catch(function(error) {
            console.error(error);
          });
          this.$emit('update:swimhall');

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
              this.kommentit = ''
        }
      },
      /**
       * Deletes the chosen comment of the swimming hall that was being updated. Sends the id, commentId and name to api using a http delete request.
       * Retrieves the swimming hall info from the database without the deleted comment back to the update form.
       *
       * @param {int} id - The id of the swimming hall in the database for the to-be-deleted comment = swimming hall number
       * @param {int} commentId - The index number of the kommentit array for the to-be-deleted comment = index of the kommentit array
       * @param {String} name - The name of the swimming hall for the to-be-deleted comments
       */
      deleteComment(id, commentId, name) {
        if (confirm('Haluatko poistaa ' + name + 'sta kommentin numero ' + (commentId + 1) + '?')) {
          let url = 'http://localhost:8080/api/comment';
          const data = {
            id: id,
            comment: commentId,
            name: name
          };
          const options = {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          };

          fetch(url, options)
          .then(res => res.json())
          .then(data => {
            this.id = data[0]._id,
            this.nimi = data[0].nimi,
            this.ratapituus = data[0].ratapituus,
            this.ratamäärä = data[0].ratamäärä,
            this.puhelin = data[0].puhelin,
            this.ma = data[0].aika[0],
            this.ti = data[0].aika[1],
            this.ke = data[0].aika[2],
            this.to = data[0].aika[3],
            this.pe = data[0].aika[4],
            this.la = data[0].aika[5],
            this.su = data[0].aika[6],
            this.hinta = data[0].hinta,
            this.alehinta = data[0].alehinta,
            this.osoite = data[0].osoite,
            this.kaupunki = data[0].kaupunki,
            this.url = data[0].url,
            this.kommentit = data[0].kommentit
          })
          .catch(function(error) {
            console.log(error);
          });
          console.log('Kommentti numero ' + (commentId + 1) + ' hallista numero ' + id + ' poistettu!');
        }
      },
    },
    /**
     * Watcher brings information of the selected swimming hall to the update form when hall object from Admin changes
     * i.e. when user selects another swimming hall to update in showAllView.
     */
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