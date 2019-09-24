<template>
  <div>
    <div clss="row">
      <div style="float: right" class="field">
        <div class="fields">
          <button v-on:click="moveUrl('/home')" class="ui red button">Back</button>
        </div>
      </div>
      <div style="float: left" class="ui category search">
        <div class="ui icon input">
          <input class="prompt" type="text" placeholder="Search groups..." />
          <i class="search icon"></i>
        </div>
        <div class="results"></div>
      </div>
    </div>
    <br><br>
    <div style="clear:both" class="ui middle aligned divided list">
      <div v-for="x in 10" v-bind:key="x" class="item">
        <img class="ui avatar image" src="./../assets/userlogin.png">
        <div class="content">
          <a class="header">Random group</a>
        </div>
        <button style="float: right" class="ui primary button">Edit</button>
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
    moveUrl: link =>
      window.location.pathname != link ? (window.location = link) : null
    ,
    search() {
      alert("mjau");
    },
    openMsg() {
      console.log("neki");
    }
  }
};
</script>