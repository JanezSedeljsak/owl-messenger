<template>
  <div>
    <div v-if="!gifPicker">
      <div class="ui secondary pointing menu">
        <img src="./../assets/wide-logo.png" style="width: 15vh; height: 6vh" />
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
      <nav
        class="w3-sidebar w3-collapse w3-top w3-large w3-padding"
        style="height: 93vh; top: 7vh;width:25vw;font-weight:bold;"
        id="mySidebar"
      >
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
            v-for="(group, $index) in groups.filter(group => group.name.includes(chatFilter))"
            v-bind:key="$index"
            v-tooltip="`Open \'${group.name.toUpperCase() || 'Random Chat' }\' chat`"
          >
            <img
              v-if="!group.img"
              src="./../assets/userlogin.png"
              class="w3-bar-item w3-circle w3-hide-small"
              style="width:85px"
            />
            <img
              v-else
              v-bind:src="group.img"
              class="w3-bar-item w3-circle w3-hide-small"
              style="width:85px"
            />
            <div class="w3-bar-item">
              <span class="person-spn">{{ group.name | capFirst }}</span>
            </div>
          </li>
        </ul>
      </nav>
      <div v-if="chat.length" class="container-cstm">
        <div
          id="chatSpace"
          class="wrapper t-chat"
          style="overflow-y: scroll; left: 0; width: 94vw; height: 100%"
        >
          <h1 class="chat-title text-center">{{ chatName }}</h1>
          <div
            v-bind:class="{sent: msg.user_id == userId, recived: msg.user_id != userId}"
            class="speechbubble"
            v-for="(msg, $index) in chat"
            v-bind:key="$index"
          >
            <div v-if="msg.content && msg.content.includes('owl-!')">
              <div>
                <div v-if="msg.content.includes('video')">
                  <p>{{ msg.content.split('|')[0] }}</p>
                  <iframe
                    width="560"
                    height="315"
                    v-bind:src="msg.content.split('|')[2].replace('watch?v=', 'embed/')"
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
                <div v-else-if="msg.content.includes('image')">
                  <p>{{ msg.content.split('|')[0] }}</p>
                  <img v-bind:src="msg.content.split('|')[2]" alt="/" width="560" />
                </div>
                <div v-else-if="msg.content.includes('gif')">
                  <p>{{ msg.content.split('|')[0] }}</p>
                  <img v-bind:src="msg.content.split('|')[2]" alt="/" width="560" />
                </div>
              </div>
              <br />
              <div class="username user-i">
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
              </div>
            </div>
            <p v-else-if="msg.content && !msg.content.includes('owl-!')">
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
          <input
            v-on:keydown="keyDownSend()"
            type="text"
            v-model="msgInput"
            class="msg-input"
            placeholder="Type message.."
          />
          <div v-on:click="openGifPicker()" style="width: 5vw" class="ui teal button">
            <i class="plus icon"></i>
          </div>
          <div
            v-on:click="sendChat()"
            style="margin-right:0; width: 10vw"
            class="ui primary button"
          >
            <i class="paper plane icon"></i>
            {{ ConfirmButton }}
          </div>
        </div>
      </div>
      <div v-else class="container-cstm">
        <h1 style="font-size: 3vw !important" class="chat-title text-center">>>Pick to chat</h1>
      </div>
    </div>
    <div v-else style="margin-left: 5%; width: 90%" class="ui active modal">
      <div class="header">
        Gif Picker
        <span v-on:click="closePicker()" style="float: right">
          <i class="delete icon"></i>
        </span>
      </div>
      <div class="content">
        <img
          class="ui medium rounded image"
          style="float:left; margin: 10px; width: 23%; height: 15vw"
          v-for="(gif, $key) in gifs"
          v-bind:src="gif"
          v-bind:key="$key"
          v-on:click="pickGif($key)"
        />
      </div>
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
      editMsg: null,
      gifPicker: null,
      gifs: [
        "https://techcrunch.com/wp-content/uploads/2015/08/safe_image.gif",
        "https://rappart.com/wp-content/uploads/2017/02/me-gif-d.gif",
        "https://compote.slate.com/images/697b023b-64a5-49a0-8059-27b963453fb1.gif",
        "https://mir-s3-cdn-cf.behance.net/project_modules/disp/f037c454933123.596f84ed7bc86.gif",
        "https://mondrian.mashable.com/wp-content%252Fuploads%252F2013%252F07%252FSpongeBob.gif%252Ffull-fit-in__1200x2000.gif?signature=ons8b0zQRTNhhelfTjbxvTIF1m0=&source=http%3A%2F%2Fmashable.com",
        "https://images.squarespace-cdn.com/content/v1/520fa633e4b02294cd0abdc1/1508676515079-NYU8RH94QL81GHHMUWSO/ke17ZwdGBToddI8pDm48kGDpvalPb1SqHoCn1hwN0Y57gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmjTeiQ8v2Gi6jnuD7IilWB1aFTl2rN_NJyVfSxiuM_6AwcSnARVzH7DJZbr4wQ8RL/PrideGiraffe.gif",
        "https://images.squarespace-cdn.com/content/v1/5512bbfbe4b0febe53ba78b7/1551964134080-A0L2QX4T80NTPH9X8U9M/ke17ZwdGBToddI8pDm48kFQQgP34qnCpeHaeAOzTt7pZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIvwpK0aFuhG0GtLLHqvbV4raqY38tdDiF-KTEvoUH9G4/LMG-Hurricanes-Gif-for-website.gif?format=2500w",
        "https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/panda_GIF.gif"
      ]
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
          console.log(response);
          this.groups = response.result.groups;
          this.userId = response.result.id;
          console.log(this.userId, "user_id bojda");
        });
    },
    keyDownSend() {
      window.event.keyCode != 13 ? null : this.sendChat();
    },
    openGifPicker() {
      this.gifPicker = true;
    },
    pickGif(key) {
      var str = this.msgInput;
      this.msgInput = str.includes("|owl-")
        ? str.substr(0, str.indexOf("|owl-"))
        : str;
      this.msgInput += `|owl-!gif|${this.gifs[key]}`;
      this.gifPicker = null;
    },
    closePicker() {
      this.gifPicker = null;
    },
    sendChat() {
      let msg = this.msgInput;
      if (!msg) return;
      this.msgInput = "";
      if (this.ConfirmButton != "Update") {
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
      if (self_id == this.pickedChat && !!this.chatName) {
        setTimeout(
          () =>
            self_id == this.pickedChat && !!this.chatName
              ? this.getMessages(self_id)
              : null,
          5000
        );
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

<style lang="css">
@import "./../assets/chat.css";
</style>