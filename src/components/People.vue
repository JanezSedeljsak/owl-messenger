<template>
  <div style="padding: 2vw">
    <div class="ui secondary pointing menu">
      <a v-on:click="moveUrl('/')" class="item">Base</a>
      <a v-on:click="moveUrl('/home')" class="item">Home</a>
      <a v-on:click="moveUrl('/chats')" class="item">Chats</a>
      <a v-on:click="moveUrl('/your-chats')" class="item">Your Chats</a>
      <a v-on:click="moveUrl('/people')" class="item">Members</a>
      <div class="right menu">
        <a
          v-on:click="moveUrl('/profile')"
          style="color: #559; font-weight: bold"
          class="item"
        >Profile</a>
        <a v-on:click="moveUrl('/login')" class="item">Logout</a>
      </div>
    </div>
    <h1 class="ui dividing header">Other users</h1>
    <div clss="row">
      <div style="float: left" class="ui category search">
        <div class="ui icon input">
          <input class="prompt" v-model="filterValue" type="text" placeholder="Search people..." />
          <i class="search icon"></i>
        </div>
        <div class="results"></div>
      </div>
    </div>
    <br />
    <br />
    <div style="clear:both" class="ui middle aligned divided list">
      <div
        v-for="(p, $index) in people.filter(x => (x.name + ' ' + x.surname).includes(filterValue))"
        v-bind:key="$index"
        class="item"
      >
        <img class="list-img ui avatar image" src="./../assets/userlogin.png" />
        <div class="content">
          <a class="header">{{ p.name + " " + p.surname | capFirst }}</a>
        </div>
        <button style="float: right" class="ui primary button">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      people: [],
      filterValue: ""
    };
  },
  created: function() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      fetch("http://localhost:3000/api/get/get-people", {
        method: "POST",
        body: JSON.stringify({ tokenString: sessionStorage.getItem("_tAuth") }),
        headers: { "Content-Type": "application/json" }
      })
        .then(res => res.json())
        .then(response => {
          this.people = response.result;
        });
    },
    search() {
      alert("mjau");
    },
    openMsg() {
      console.log("neki");
    }
  }
};
</script>