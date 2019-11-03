<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created: function() {},
  mounted() {
    if (localStorage.getItem("theme_color")) {
      document.body.style.backgroundColor = localStorage.getItem("theme_color");
    }
  }
};
</script>


<style lang="css">
@import "./assets/overwrite.css";
</style>