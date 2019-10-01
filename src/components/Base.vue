<template>
  <div style="padding: 2vw">
    <div class="ui secondary pointing menu">
      <a class="item">Home</a>
      <div class="right menu">
        <a class="item">Login</a>
        <a class="item">Register</a>
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
    return {
      hover: new Array(3).map(() => false)
    };
  }
};
</script>

<style lang="css">
@import "./../assets/base.css";
</style>