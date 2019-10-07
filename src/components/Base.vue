<template>
  <div style="padding: 2vw">
    <div class="ui secondary pointing menu">
      <img src="./../assets/wide-logo.png" style="width: 7em; height: 3em" />
      <a v-on:click="moveUrl('/home')" class="item">Home</a>
      <div class="right menu">
        <a v-on:click="moveUrl('/login')" class="item">Login</a>
        <a v-on:click="moveUrl('/register')" class="item">Register</a>
      </div>
    </div>
    <h1 class="text-effect" style="color: #555">Welcome to</h1>
    <div class="text-effect">
      <span>O</span>
      <span>W</span>
      <span>L</span>
      <span>-</span>
      <span>M</span>
      <span>E</span>
      <span>S</span>
      <span>S</span>
      <span>E</span>
      <span>N</span>
      <span>G</span>
      <span>E</span>
      <span>R</span>
    </div>
    <div style="padding: 5vw">
      <img src="./../assets/wide-logo.png" style="margin-left: 30%; width: 40%" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created: function() {},
  methods: {
    moveUrl: link => {
      window.event.preventDefault();
      window.location.pathname != link ? (window.location = link) : null;
    }
  }
};
</script>

<style lang="css">
@import "./../assets/base.css";
</style>