<template>
  <div style="padding: 2vw">
    <div id="_nav" class="ui secondary pointing menu">
      <img src="./../assets/wide-logo.png" style="width: 7em; height: 3em" />
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
    <h1 class="ui dividing header">Your Chats</h1>
    <div clss="row">
      <div style="float: right" class="field">
        <div style="float: left" class="fields">
          <button v-on:click="moveUrl('/chat-create')" class="ui teal button">
            <i class="icon add"></i>Create new group
          </button>
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
      <div
        v-for="(group, $index) in groups.filter(x => x.name.includes(filterValue))"
        v-bind:key="$index"
        class="item"
      >
        <img v-if="!group.img" class="list-img ui avatar image" src="./../assets/group.png" />
        <img v-else class="list-img ui avatar image" v-bind:src="group.img" />
        <div class="content">
          <a class="header">{{ group.name | capFirst }}</a>
        </div>
        <button style="float: right" v-on:click="moveUrl(`/people/${group.id}/${group.name}`)" class="ui primary button">Members</button>
        <button style="float: right" v-on:click="moveUrl(`/chat-edit/${group.id}`)" class="ui secondary button">Edit</button>
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
      fetch("http://localhost:3000/api/get/get-your-chats", {
        method: "POST",
        body: JSON.stringify({ tokenString: sessionStorage.getItem("_tAuth") }),
        headers: { "Content-Type": "application/json" }
      })
        .then(res => res.json())
        .then(response => {
          console.log(response);
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