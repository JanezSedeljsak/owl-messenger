<template>
  <div>
    <div clss="row">
      <div style="float: right" class="field">
        <div class="fields">
          <button class="ui red button">Back</button>
        </div>
      </div>
      <div style="float: left" class="ui category search">
        <div class="ui icon input">
          <input class="prompt" type="text" placeholder="Search animals..." />
          <i class="search icon"></i>
        </div>
        <div class="results"></div>
      </div>
    </div>
    <br><br>
    <div style="clear:both" class="ui relaxed divided list">
      <div class="item">
        <i class="large github middle aligned icon"></i>
        <div class="content">
          <a class="header">Semantic-Org/Semantic-UI</a>
          <div class="description">Updated 10 mins ago</div>
        </div>
      </div>
      <div class="item">
        <i class="large github middle aligned icon"></i>
        <div class="content">
          <a class="header">Semantic-Org/Semantic-UI-Docs</a>
          <div class="description">Updated 22 mins ago</div>
        </div>
      </div>
      <div class="item">
        <i class="large github middle aligned icon"></i>
        <div class="content">
          <a class="header">Semantic-Org/Semantic-UI-Meteor</a>
          <div class="description">Updated 34 mins ago</div>
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
    }
  }
};
</script>