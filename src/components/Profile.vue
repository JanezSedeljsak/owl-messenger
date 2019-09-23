<template>
  <form class="ui form">
    <h1 class="ui dividing header">User information</h1>
    <div class="field">
      <label>Name</label>
      <div class="two fields">
        <div class="field">
          <input type="text" name="shipping[first-name]" placeholder="First Name" />
        </div>
        <div class="field">
          <input type="text" name="shipping[last-name]" placeholder="Last Name" />
        </div>
      </div>
    </div>
    <div class="field">
      <label>Authorization</label>
      <div class="fields">
        <div class="twelve wide field">
          <input type="text" name="shipping[address]" placeholder="Email" />
        </div>
        <div class="four wide field">
          <input type="password" name="shipping[address-2]" placeholder="Password" />
        </div>
      </div>
    </div>
    <div class="field">
      <label>Actions</label>
      <div class="fields">
        <div class="ui buttons">
          <button class="ui positive button">Update</button>
          <div class="or"></div>
          <button class="ui button">Back</button>
        </div>
      </div>
    </div>
  </form>
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