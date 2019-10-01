<template>
  <div style="padding: 2vw">
    <div class="ui secondary pointing menu">
      <a v-on:click="moveUrl('/')" class="item">Base</a>
      <a v-on:click="moveUrl('/home')" class="item">Home</a>
      <a v-on:click="moveUrl('/chats')" class="item">Chats</a>
      <a v-on:click="moveUrl('/your-chats')" class="item">Your Chats</a>
      <a v-on:click="moveUrl('/chats')" class="item">Members</a>
      <div class="right menu">
        <a
          v-on:click="moveUrl('/profile')"
          style="color: #559; font-weight: bold"
          class="item"
        >Janez Sedeljsak</a>
        <a v-on:click="moveUrl('/login')" class="item">Logout</a>
      </div>
    </div>
    <form class="ui form">
      <h1 class="ui dividing header">User information</h1>
      <div class="field">
        <label>Name</label>
        <div class="two fields">
          <div class="field">
            <input type="text" v-model="form.name" placeholder="First Name" />
          </div>
          <div class="field">
            <input type="text" v-model="form.surname" placeholder="Last Name" />
          </div>
        </div>
      </div>
      <div class="field">
        <label>Authorization</label>
        <div class="fields">
          <div class="twelve wide field">
            <input type="text" v-model="form.email" placeholder="Email" />
          </div>
          <div class="four wide field">
            <input type="password" placeholder="Password" />
          </div>
        </div>
      </div>
      <div class="field">
        <label>Actions</label>
        <div class="fields">
          <div class="ui buttons">
            <button class="ui positive button">Update</button>
            <div class="or"></div>
            <button v-on:click="moveUrl('/home')" class="ui button">Cancel</button>
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
      form: null
    };
  },
  created: function() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      fetch("http://localhost:3000/api/get/get-profile-data", {
        method: "POST",
        body: JSON.stringify({ tokenString: sessionStorage.getItem("_tAuth") }),
        headers: { "Content-Type": "application/json" }
      })
        .then(res => res.json())
        .then(response => {
          this.form = response.result[0];
        });
    },
    updateProfile() {
      fetch("http://localhost:3000/api/get/update-profile-data", {
        method: "POST",
        body: JSON.stringify({ form: this.form }),
        headers: { "Content-Type": "application/json" }
      })
        .then(res => res.json())
        .then(response => {
          console.log(response);
        });
    }
  }
};
</script>