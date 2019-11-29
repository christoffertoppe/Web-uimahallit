<template>
    <div id="app">
        <h1>Admin</h1>
        Poista kommentti numero:
        <input><br><br>
        Poista ilmoitus numero:
        <input>
        <div>
            <comment-view id="commentView"/>
        </div>
      <div>
        <notification-view id="notificationView"/>
      </div>
    </div>

</template>

<script>
  import commentView from '@/components/commentView';
  import notificationView from '@/components/notificationView';

  export default {
    name: 'app',
    components: {
      commentView,
      notificationView
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
