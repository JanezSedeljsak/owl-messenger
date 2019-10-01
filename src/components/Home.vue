<template>
  <div>
    <nav
      class="w3-sidebar w3-collapse w3-top w3-large w3-padding"
      style="z-index:3;width:25vw;font-weight:bold;"
      id="mySidebar"
    >
      <br />
      <div class="row" style="margin-bottom: 10px; width: 100%">
        <img src="./../assets/wide-logo.png" style="width: 90%" />
      </div>
      <div class="row" style="text-align:center; margin-bottom: 10px; width: 100%">
        <button
          v-on:click="moveUrl('/chats')"
          v-tooltip="'Search Chats'"
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
        <button v-on:click="logOut()" v-tooltip="'Log out'" class="rnd-btn ui blue button">
          <i class="arrow alternate circle left icon"></i>
        </button>
      </div>
      <div style="margin-bottom: 1vw; width: 100%" class="ui search">
        <div style="width: 100%" class="ui icon input">
          <input v-model="chatFilter" class="prompt" type="text" placeholder="Search chats..." />
          <i class="search icon"></i>
        </div>
        <div class="results"></div>
      </div>
      <ul class="w3-ul w3-card-4">
        <li
          v-on:click="openMsg(group.id, group.name)"
          class="person-li w3-bar"
          v-for="(group, $index) in groups"
          v-bind:key="$index"
          v-tooltip="`Open \'${group.name.toUpperCase() || 'Random Chat' }\' chat`"
        >
          <div v-if="group.name.includes(chatFilter)">
            <img
              src="./../assets/userlogin.png"
              class="w3-bar-item w3-circle w3-hide-small"
              style="width:85px"
            />
            <div class="w3-bar-item">
              <span class="person-spn">{{ group.name | capFirst }}</span>
            </div>
          </div>
        </li>
      </ul>
    </nav>
    <div v-if="chat.length" class="container-cstm">
      <div class="wrapper t-chat" style="overflow-y: scroll; left: 0; width: 94vw; height: 100%">
        <h1 class="chat-title text-center">{{ chatName }}</h1>
        <div
          v-bind:class="{sent: msg.user_id == userId, recived: msg.user_id != userId}"
          class="speechbubble"
          v-for="(msg, $index) in chat"
          v-bind:key="$index"
        >
          <p v-if="msg.content">
            {{ msg.content }}
            <span class="username">
              {{ msg.name + " " + msg.surname | capFirst }}
              <br />
              {{ msg.msg_time | dateFromNow }}
              <span v-if="msg.user_id == userId">
                |&nbsp;
                <i
                  v-tooltip="'delete chat'"
                  class="rmv-btn id red remove icon"
                  v-on:click="deleteChat(msg.id)"
                ></i>
                |&nbsp;
                <i
                  v-tooltip="'edit chat'"
                  class="rmv-btn id orange edit icon"
                  v-on:click="editChat(msg.content, msg.id)"
                ></i>
              </span>
            </span>
          </p>
        </div>
      </div>
      <div style="z-index: 3" class="footer-send ui right labeled input">
        <input type="text" v-model="msgInput" class="msg-input" placeholder="Type message.." />
        <div v-on:click="sendChat()" style="width: 10vw" class="ui teal button">
          <i class="paper plane icon"></i>
          {{ ConfirmButton }}
        </div>
      </div>
    </div>
    <div v-else class="container-cstm">
      <h1 style="font-size: 3vw !important" class="chat-title text-center">>>Pick to chat</h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      groups: [],
      chat: [],
      userId: null,
      chatName: null,
      chatFilter: "",
      msgInput: "",
      pickedChat: null,
      ConfirmButton: "Send",
      editMsg: null
    };
  },
  created: function() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      fetch("http://localhost:3000/api/get/get-chat-groups", {
        method: "POST",
        body: JSON.stringify({ tokenString: sessionStorage.getItem("_tAuth") }),
        headers: { "Content-Type": "application/json" }
      })
        .then(res => res.json())
        .then(response => {
          this.groups = response.result.groups;
          this.userId = response.result.id;
        });
    },
    sendChat() {
      let msg = this.msgInput;
      if (this.ConfirmButton != "Update") {
        this.msgInput = "";
        fetch("http://localhost:3000/api/get/send-message", {
          method: "POST",
          body: JSON.stringify({
            tokenString: sessionStorage.getItem("_tAuth"),
            data: {
              content: msg,
              group: this.pickedChat
            }
          }),
          headers: { "Content-Type": "application/json" }
        })
          .then(res => res.json())
          .then(response => {
            this.openMsg(this.pickedChat, this.chatName);
          });
      } else {
        fetch("http://localhost:3000/api/get/update-chat", {
          method: "POST",
          body: JSON.stringify({
            tokenString: sessionStorage.getItem("_tAuth"),
            data: {
              content: msg,
              msgId: this.editMsg
            }
          }),
          headers: { "Content-Type": "application/json" }
        })
          .then(res => res.json())
          .then(response => {
            this.openMsg(this.pickedChat, this.chatName);
          });
      }
    },
    deleteChat(chatId) {
      this.ConfirmButton = "Send";
      fetch("http://localhost:3000/api/get/delete-chat", {
        method: "POST",
        body: JSON.stringify({ id: chatId }),
        headers: { "Content-Type": "application/json" }
      })
        .then(res => res.json())
        .then(response => {
          this.openMsg(this.pickedChat, this.chatName);
        });
    },
    editChat(content, id) {
      this.msgInput = content;
      this.editMsg = id;
      this.ConfirmButton = this.ConfirmButton != "Update" ? "Update" : "Send";
    },
    getMessages(id) {
      const self_id = id;
      fetch("http://localhost:3000/api/get/get-messages", {
        method: "POST",
        body: JSON.stringify({
          tokenString: sessionStorage.getItem("_tAuth"),
          id: id
        }),
        headers: { "Content-Type": "application/json" }
      })
        .then(res => res.json())
        .then(response => {
          this.chat = response.result;
          console.log(this.chat);
        });

        // hacky way of refreshing chats //but it works kinda so yea
        if(self_id == this.pickedChat && !!this.chatName) {
            setTimeout(() => (self_id == this.pickedChat && !!this.chatName) ? this.getMessages(self_id) : null, 5000);
        }
      
    },
    openMsg(id, cName = "Random Chat") {
      this.ConfirmButton = "Send";
      this.chatName = cName;
      this.pickedChat = id;
      this.getMessages(id);
    },
    logOut() {
      window.location = "/login";
    }
  }
};
</script>