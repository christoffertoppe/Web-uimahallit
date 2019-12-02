<template>
    <div id="app">
        <h1>Admin</h1>
        Poista kommentti numero:
        <input><br><br>
        Poista ilmoitus numero:
        <input><br><br>

            <comment-view id="commentView"/>
            <add-view :swimhalls="swimhalls"  @add:swimhall="addSwimhall"></add-view>
        <notification-view id="notificationView"/>
    </div>

</template>

<script>
  import commentView from '@/components/commentView';
  import notificationView from '@/components/notificationView';
  import addView from './components/addView';

  export default {
    name: 'app',
    components: {
      commentView,
      notificationView,
      addView
    },
    data() {
      return {
        swimhalls: [],
      }
    },
    mounted() {
      this.getSwimHalls()
    },

    methods: {
      async getSwimHalls() {
        try {
          const response = await fetch('http://localhost:8080/api/location/all')
          const data = await response.json()
          console.log("hakee....")
          this.swimhalls = data
        } catch (error) {
          console.error(error);
        }
      },

      async addSwimhall(swimhall) {
        try {
          const response = await fetch('http://localhost:8080/api/add', {
            method: 'POST',
            body: JSON.stringify(swimhall),
            headers: {'Content-type': 'application/json; charset=UTF-8'},
          })
          const data = await response.json()
          this.swimhalls = [...this.swimhalls, data];
          console.log("Uimahalli lisätty!");
        } catch (error) {
          console.error(error);
        }
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
        margin-top: 60px;
    }
  #notificationView {
    position: absolute;
    right: 20px;
  }
  #commentView {
    position: absolute;
    left: 20px;
  }
</style>
