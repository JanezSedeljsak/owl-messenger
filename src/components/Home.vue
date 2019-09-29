<template>
  <div>
    <nav
      class="w3-sidebar w3-collapse w3-top w3-large w3-padding"
      style="z-index:3;width:25vw;font-weight:bold;"
      id="mySidebar"
    >
      <br />
      <div class="row" style="margin-bottom: 10px; width: 100%">
        <img src="./../assets/logo.png" style="width: 80%" />
      </div>
      <div class="row" style="text-align:center; margin-bottom: 10px; width: 100%">
        <button
          v-on:click="moveUrl('/groups')"
          v-tooltip="'Groups'"
          class="rnd-btn ui green button"
        >
          <i class="users icon"></i>
        </button>
        <button
          v-on:click="moveUrl('/profile')"
          v-tooltip="'Edit profile'"
          class="rnd-btn ui olive button"
        >
          <i class="id card icon"></i>
        </button>
        <button
          v-on:click="moveUrl('/people')"
          v-tooltip="'Edit profile'"
          class="rnd-btn ui teal button"
        >
          <i class="id plus icon"></i>
        </button>
        <button v-on:click="logOut()" v-tooltip="'Edit profile'" class="rnd-btn ui blue button">
          <i class="arrow alternate circle left icon"></i>
        </button>
      </div>
      <div style="margin-bottom: 1vw; width: 100%" class="ui search">
        <div style="width: 100%" class="ui icon input">
          <input
            v-on:keydown="search()"
            class="prompt"
            type="text"
            placeholder="Search for people..."
          />
          <i class="search icon"></i>
        </div>
        <div class="results"></div>
      </div>
      <ul class="w3-ul w3-card-4">
        <li
          v-on:click="openMsg()"
          class="person-li w3-bar"
          v-for="human in people"
          v-bind:key="human"
        >
          <img
            src="./../assets/userlogin.png"
            class="w3-bar-item w3-circle w3-hide-small"
            style="width:85px"
          />
          <div class="w3-bar-item">
            <span class="person-spn">{{human.name + " " + human.surname | capFirst}}</span>
          </div>
        </li>
      </ul>
    </nav>
    <div class="container-cstm">
      <div class="wrapper t-chat" style="overflow-y: scroll; left: 0; width: 94vw; height: 100%">
        <h1 class="chat-title text-center">Luka Lah</h1>
        <div class="speechbubble sent" v-bind:key="x">
          <p>
            A si vedu da si ubistvu ful vlek gey ti!
            <span
              class="username"
            >You</span>
          </p>
        </div>
        <div class="speechbubble recived" v-bind:key="x">
          <p>
            Grrrrr
            <span
              class="username"
            >Luka Lah</span>
          </p>
        </div>
      </div>
      <div style="z-index: 3" class="footer-send ui right labeled input">
        <input type="text" class="msg-input" placeholder="Type message.." />
        <div style="width: 10vw" class="ui teal button">
          <i class="paper plane icon"></i>Send
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      people: []
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
          console.log(this.people);
        });
    },
    search() {
      alert("mjau");
    },
    openMsg() {
      console.log("neki");
    },
    logOut() {
      window.location = "/login";
    }
  }
};
</script>