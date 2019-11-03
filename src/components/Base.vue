<template>
  <div style="padding: 2vw">
    <div id="_nav" class="ui secondary pointing menu">
      <img src="./../assets/wide-logo.png" style="width: 7em; height: 3em" />
      <a v-on:click="moveUrl('/home')" class="item">Home</a>
      <div class="right menu">
        <a v-on:click="moveUrl('/login')" class="item">Login</a>
        <a v-on:click="moveUrl('/register')" class="item">Register</a>
      </div>
    </div>
    <h1 style="font-size: 5vw" id="tit" class="text-effect"></h1>
    <div style="padding: 5vw">
      <img src="./../assets/wide-logo.png" style="margin-left: 30%; width: 40%" />
    </div>
    <div style="float:right" class="picker" acp-color="#EFE9E7"></div>
  </div>
</template>

<script>
const TextTypingAnimation = require("text-typing-animation");
const AColorPicker = require("a-color-picker");
export default {
  data() {
    return {};
  },
  created: function() {},
  mounted() {
    var textTypingAnimation = new TextTypingAnimation(
      document.getElementById("tit")
    );
    textTypingAnimation
      .go({
        text: "Have fun using...." + "  ",
        duration: 5000
      })
      .go({
        text: "OWL Messenger!!" + "  ",
        duration: 5000,
        delay: 200
      });
    AColorPicker.from(".picker").on("change", (picker, color) => {
      localStorage.setItem("theme_color", color);
      document.body.style.backgroundColor = color;
    });
  },
  methods: {
    moveUrl: link => {
      window.event.preventDefault();
      window.location.pathname != link ? (window.location = link) : null;
    }
  }
};
</script>

<style lang="css">
@import "./../assets/base.css";
</style>