<template>
  <div id="app">
      <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    moveUrl: link =>
      window.location.pathname != link ? (window.location = link) : null
  },
  created: function() {
  }
};
</script>


<style lang="css">
@import "./assets/overwrite.css";
@import "./assets/chat.css";
</style>