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
    <form class="ui form">
      <h1 class="ui dividing header">Chat Edit</h1>
      <div class="field">
        <label>Locked data</label>
        <div class="two fields">
          <div class="field">
            <input type="text" v-model="form.name" placeholder="Chat Name" />
          </div>
          <div class="field">
            <a class="ui teal tag label">Date Created:&nbsp;{{ form.created_date | dateFormat }}</a>
          </div>
        </div>
      </div>
      <div class="field">
        <label>Actions</label>
        <div class="fields">
          <div class="ui buttons">
            <button class="ui positive button">Update</button>
            <div class="or"></div>
            <button v-on:click="moveUrl('/home')" class="ui button">Back</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: { name: "" }
    };
  },
  created: function() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      console.log("ok");
      fetch("http://localhost:3000/api/get/get-group-by-id", {
        method: "POST",
        body: JSON.stringify({ id: this.$route.params.id }),
        headers: { "Content-Type": "application/json" }
      })
        .then(res => res.json())
        .then(response => {
          console.log(response);
          this.form = response.result[0];
        });
    }
  }
};
</script>