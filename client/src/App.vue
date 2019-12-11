<template>
  <div id="app">
    <div id="nav">
      <a class="navBar" @click="setAuthToFalse">Home</a> |
      <a class="navBar" @click="$bvToast.show('adminLoginToast')">Admin</a>
      <b-toast id="adminLoginToast" title="Kirjaudu ylläpitosivulle" no-auto-hide>
        <form id="toastForm">
          <label>Käyttäjänimi: <input class="toastInputField" type="text" v-model="usr" required></label>
          <label>Salasana: <input class="toastInputField" type="password" v-model="pw" required></label>
          <input type="button" value="Kirjaudu sisään" @click="login" v-on:keyup="login">
        </form>
      </b-toast>
    </div>
    <router-view/>
  </div>
</template>
<script>
  /**
   * App component
   */
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
      /**
       * Fires when user clicks corresponding button. Authenticates user by sending http post request to api
       * that compares user input to credentials(environment variables) given in local .env file
       * User is authenticated if api responds with "ACCEPTED", and vue router renders Admin component(s)
       */
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
      /**
       * Sets user authentication flag to false when moving from admin page
       */
      setAuthToFalse: function () {
        this.$router.replace({path: "/"});

        if(this.$route.path !== "/") {
          this.$router.replace({path: "/"});
        }
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
  min-height: 780px;
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
  color: #000066;
  cursor: pointer;
}
#nav a:hover{
  text-decoration: underline;
}

.toastInputField{
  padding: 6px;
  margin: 0;
}
@import "./assets/style.module.css";

</style>
