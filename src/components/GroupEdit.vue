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
    <form class="ui form">
      <h1 class="ui dividing header">Chat Edit</h1>
      <div class="field">
        <label>Locked data</label>
        <div class="two fields">
          <div class="field">
            <input type="text" v-model="form.name" placeholder="Chat Name" />
          </div>
          <div class="field">
            <a class="ui teal tag label">Date Created:&nbsp;{{ form.created_time | dateFormat }}</a>
          </div>
        </div>
      </div>
      <div class="field">
        <label>Chat Image</label>
        <div class="fields">
          <div class="twelve wide field ui right labeled left icon input">
            <input v-model="form.img" type="text" placeholder="Upload Image..." />
            <a v-on:click="uploadImage()" class="ui blue tag label">Add Image</a>
          </div>
        </div>
        <label>Image Preview</label>
        <img v-bind:src="form.img" style="width: 20vw; height: 20vw; border: 2px solid black" />
      </div>
      <div class="field">
        <label>Actions</label>
        <div class="fields">
          <div class="ui buttons">
            <button v-on:click="mainAction()" class="ui positive button">{{ MainBtn }}</button>
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
      form: { name: "", created_date: new Date(), img: "" },
      MainBtn: "Update"
    };
  },
  created: function() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      if (!this.$route.params.id) {
        this.MainBtn = "Create";
        return;
      }
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
    },
    mainAction() {
      if (this.MainBtn == "Create") this.createChat();
      else this.updateChat();
    },
    uploadImage() {
        var self = this;
        var fileInput = document.createElement('input'); 
        fileInput.setAttribute("type", "file");
        fileInput.setAttribute("accept", "image/*");  
        fileInput.click();
        
        fileInput.onchange = function() {
            var reader = new FileReader();
            reader.onload = function() {
                self.form.img = reader.result;
                console.log(self.form);
            }
            reader.readAsDataURL(fileInput.files[0]);
        }
    },
    updateChat() {
      fetch("http://localhost:3000/api/get/update-group", {
        method: "POST",
        body: JSON.stringify({
          id: this.$route.params.id,
          name: this.form.name,
          img: this.form.img
        }),
        headers: { "Content-Type": "application/json" }
      })
        .then(res => res.json())
        .then(response => {
          console.log(response);
          this.fetchData();
        });
    },
    createChat() {
      window.event.preventDefault();
      console.log("mjau");
      fetch("http://localhost:3000/api/get/create-group", {
        method: "POST",
        body: JSON.stringify({
          tokenString: sessionStorage.getItem("_tAuth"),
          name: this.form.name,
          img: this.form.img
        }),
        headers: { "Content-Type": "application/json" }
      })
        .then(res => res.json())
        .then(response => {
          this.form = { name: "", created_date: new Date(), img: "" }
          this.$swal("New chat group was creaed!");
        });
    }
  }
};
</script>