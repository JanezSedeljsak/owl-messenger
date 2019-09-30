<template>
  <div style="padding: 2vw">
    <h1 class="ui dividing header">Groups</h1>
    <div clss="row">
      <div style="float: right" class="field">
        <div style="float: left" class="fields">
          <button v-on:click="moveUrl('/your-groups')" class="ui grey button">Your Groups</button>
        </div>
        <div style="float: left" class="fields">
          <button v-on:click="moveUrl('/home')" class="ui red button">Back</button>
        </div>
      </div>
      <div style="float: left" class="ui category search">
        <div class="ui icon input">
          <input class="prompt" v-model="filterValue" type="text" placeholder="Search groups..." />
          <i class="search icon"></i>
        </div>
        <div class="results"></div>
      </div>
    </div>
    <br />
    <br />
    <div style="clear:both" class="ui middle aligned divided list">
      <div v-for="(group, $index) in groups.filter(x => x.name.includes(filterValue))" v-bind:key="$index" class="item">
        <img class="list-img ui avatar image" src="./../assets/group.png" />
        <div class="content">
          <a class="header">{{ group.name | capFirst }}</a>
        </div>
        <button style="float: right" class="ui primary button">Join</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        groups: [],
        filterValue: ""
    };
  },
  created: function() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      fetch("http://localhost:3000/api/get/get-groups", {
        method: "POST",
        body: JSON.stringify({ tokenString: sessionStorage.getItem("_tAuth") }),
        headers: { "Content-Type": "application/json" }
      })
        .then(res => res.json())
        .then(response => {
          this.groups = response.result;
          console.log(response);
        });
    },
    moveUrl: link =>
      window.location.pathname != link ? (window.location = link) : null,
    search() {
      alert("mjau");
    },
    openMsg() {
      console.log("neki");
    }
  }
};
</script>