<template>
  <div id="app">
    <div id="nav">
      <router-link @click="setAuthToFalse" to="/">Home</router-link> |
      <a id="adminDropdown" @click="$bvToast.show('adminLoginToast')">Admin</a>
      <b-toast id="adminLoginToast" title="Kirjaudu ylläpitosivulle" no-auto-hide>
        <form id="toastForm">
          <label>Käyttäjänimi: <input class="toastInputField" type="text" v-model="usr" required></label>
          <label>Salasana: <input class="toastInputField" type="password" v-model="pw" required></label>
          <input type="button" value="Kirjaudu sisään" @click="login">
        </form>
      </b-toast>
    </div>
    <router-view/>
  </div>
</template>
<script>
  export default {
    name: 'app',
    data: function () {
      return {
        usr: "",
        pw: "",
        authenticated: false
      };
    },
    methods:{
      login: function () {

        const data = {
          usr: this.usr,
          pw: this.pw
        };
        const options = {
          method: "POST",
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify(data)
        };

        fetch('http://localhost:8080/api/auth',  options)
        .then(res => res.json())
        .then(res => {
          console.log(res.status);

          if(res.status === "ACCEPTED"){
            this.authenticated = true;
            this.$router.replace({path:"/admin"});
          }else {
            // EXPLANATION
            this.authenticated = false;
          }
        })
        .catch(function(error) {
          console.error(error);
        });

        this.usr = "";
        this.pw = "";
        this.$bvToast.hide();
      },
      setAuthToFalse: function () {
        this.authenticated = false;
      }
    }
  }
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

label{
  margin: 0;
  padding: 0;
}

form{
  display: flex;
  flex-direction: column;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  /*color: #2c3e50;*/
  color: #42b983
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#adminDropdown{
  cursor: pointer;
}
#adminDropdown:hover{
  text-decoration: underline;
}
.toastInputField{
  padding: 6px;
  margin: 0;
}
</style>
