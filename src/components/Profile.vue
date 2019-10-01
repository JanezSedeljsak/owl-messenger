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
            <div class="field">
              <a class="ui teal tag label">Email:&nbsp;{{ form.email }}</a>
            </div>
          </div>
        </div>
      </div>
      <div class="field">
        <label>Profile image</label>
        <div class="fields">
          <div class="twelve wide field ui right labeled left icon input">
            <input v-model="form.profile_img" type="text" placeholder="Upload Image..." />
            <a v-on:click="uploadImage()" class="ui blue tag label">Add Image</a>
          </div>
        </div>
        <label>Image Preview</label>
        <img v-bind:src="form.profile_img" style="width: 20vw; height: 20vw; border: 2px solid black"/>
      </div>
            <div class="field">
        <label>Actions</label>
        <div class="fields">
          <div class="ui buttons">
            <button v-on:click="updateProfile()" class="ui positive button">Update</button>
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
      form: { name: "", surname: "", email: "", profile_img: "" }
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
    uploadImage() {
        var form = this.form;
        let fileInput = document.createElement('input'); 
        fileInput.setAttribute("type", "file");
        fileInput.setAttribute("accept", "image/*");  
        fileInput.click();
        
        fileInput.onchange = function() {
            var reader = new FileReader();
            reader.onload = function() {
                form.profile_img = reader.result;
            }
            reader.readAsDataURL(fileInput.files[0]);
        }
    },
    updateProfile() {
      fetch("http://localhost:3000/api/get/update-profile-data", {
        method: "POST",
        body: JSON.stringify({
          tokenString: sessionStorage.getItem("_tAuth"),
          form: this.form
        }),
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