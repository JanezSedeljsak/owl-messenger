<template>
<div>
<nav class="w3-sidebar w3-collapse w3-top w3-large w3-padding" style="z-index:3;width:25vw;font-weight:bold;" id="mySidebar"><br>
<div class="row" style="margin-bottom: 10px; width: 100%">
  <button v-tooltip="'Groups'" class="rnd-btn ui green button">
    <i class="users icon"></i>
  </button>
  <button v-tooltip="'Edit profile'" class="ui olive button">
    <i class="id card icon"></i>
  </button>
  <button v-tooltip="'Edit profile'" class="ui teal button">
    <i class="id plus icon"></i>
  </button>
  <button v-on:click="logOut()" v-tooltip="'Edit profile'" class="ui blue button">
    <i class="arrow alternate circle left icon"></i>
  </button>
</div>
<div style="margin-bottom: 1vw; width: 100%" class="ui search">
  <div style="width: 100%" class="ui icon input">
    <input v-on:keydown="search()" class="prompt" type="text" placeholder="Search for people...">
    <i class="search icon"></i>
  </div>
  <div class="results"></div>
</div>
<ul class="w3-ul w3-card-4">
    <li v-on:click="openMsg()" class="person-li w3-bar" v-for="x in 10" v-bind:key="x">
      <img src="./../assets/userlogin.png" class="w3-bar-item w3-circle w3-hide-small" style="width:85px">
      <div class="w3-bar-item">
        <span class="person-spn">Random Preson</span>
      </div>
    </li>
</ul>
</nav>
<div class="container-cstm">
  <div style="left: 0; width: 94vw; height: 90vh">
    <!-- msg place -->
  </div>
  <div style="height: 6vh;" class="footer-send ui right labeled input">
    <input type="text" class="msg-input" placeholder="Type message..">
    <div style="width: 10vw" class="ui inverted teal button">
      <i class="paper plane icon"></i>Send
    </div>
  </div>
</div>
</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
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