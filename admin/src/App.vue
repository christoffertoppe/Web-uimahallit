<template>
    <div id="app">
        <h1>Admin</h1>
        Poista kommentti numero:
        <input><br><br>
        Poista ilmoitus numero:
        <input><br><br>

        <div>
            <comment-view id="commentView"/>
        </div>
        <div>
            <add-view :swimhalls="swimhalls" />
        </div>
      <div>
        <notification-view id="notificationView"/>
      </div>
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
      }
    },
  };
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
