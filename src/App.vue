<template>
  <div id="app">
      <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      msgCount: 0
    };
  },
  methods: {
    moveUrl: link =>
      window.location.pathname != link ? (window.location = link) : null
  },
  created: function() {
    fetch("http://localhost:3000/api/auth/get-username", {
      method: "POST",
      body: JSON.stringify({ tokenString: sessionStorage.getItem("szr_auth") }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(response => {
        let user = Object.values(response.result[0]).map(x =>
          x.substr(0, 1).toUpperCase() + x.substr(1, x.length - 1).toLowerCase()
        ).join(" ");
        this.username = `${user}`;
      });
    fetch("http://localhost:3000/api/get/message-count")
      .then(res => res.json())
      .then(response => {
        this.msgCount = response.result;
      });
  },
  head: {
    link: [
      {
        r: "icon",
        h:
          "https://cdn0.iconfinder.com/data/icons/new-seo-bussiness-set16-1/512/Algorithm-01-512.png",
        sz: "128x128",
        t: "images/x-icon"
      }
    ]
  }
};
</script>


<style lang="css">
@import "./assets/overwrite.css";
</style>