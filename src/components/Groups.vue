<template>
  <div style="padding: 2vw">
    <div class="ui secondary pointing menu">
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
    <h1 class="ui dividing header">Chats</h1>
    <div clss="row">
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
        v-for="(group, $index) in groupsNot.filter(x => x.name.includes(filterValue))"
        v-bind:key="$index"
        class="item"
      >
        <img class="list-img ui avatar image" src="./../assets/group.png" />
        <div class="content">
          <a class="header">{{ group.name | capFirst }}</a>
        </div>

        <button style="float: right" class="ui primary button" v-on:click="joinGroup(group.id)">&nbsp;&nbsp;Join&nbsp;&nbsp;</button>
        <button
          style="float: right"
          class="ui secondary button"
          v-on:click="moveUrl(`/people/${group.id}`)"
        >Members</button>
      </div>
      <div
        v-for="(group, $index) in groupsIn.filter(x => x.name.includes(filterValue))"
        v-bind:key="$index"
        class="item"
      >
        <img class="list-img ui avatar image" src="./../assets/group.png" />
        <div class="content">
          <a class="header">{{ group.name | capFirst }}</a>
        </div>
        <button
          style="float: right"
          class="ui primary button"
          v-on:click="leaveGroup(group.id)"
        >Leave</button>
        <button
          style="float: right"
          class="ui secondary button"
          v-on:click="moveUrl(`/people/${group.id}`)"
        >Members</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      groupsIn: [],
      groupsNot: [],
      filterValue: "",
      userId: ""
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
          console.log(response);
          this.groupsIn = response.result.groups.in;
          this.groupsNot = response.result.groups.not_in;
          this.userId = response.result.id;
        });
    },
    leaveGroup(groupId) {
      console.log(groupId, "71");
      fetch("http://localhost:3000/api/get/leave-group", {
        method: "POST",
        body: JSON.stringify({
          tokenString: sessionStorage.getItem("_tAuth"),
          id: groupId
        }),
        headers: { "Content-Type": "application/json" }
      })
        .then(res => res.json())
        .then(response => {
          console.log(response);
          this.fetchData();
        });
    },
    joinGroup(groupId) {
      console.log(groupId, "71");
      fetch("http://localhost:3000/api/get/join-group", {
        method: "POST",
        body: JSON.stringify({
          tokenString: sessionStorage.getItem("_tAuth"),
          id: groupId
        }),
        headers: { "Content-Type": "application/json" }
      })
        .then(res => res.json())
        .then(response => {
          console.log(response);
          this.fetchData();
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