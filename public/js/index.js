const socket = io()

const chatBox = document.getElementById("chatBox");
const log = document.getElementById("messageLogs");
let currentUser;

(async function() {
  const { value: userName } = await Swal.fire({
    title: "Enter your name",
    input: "text",
    inputLabel: "Your name",
    inputValue: "",
    showCancelButton: false,
    allowOutsideClick: false,
    inputValidator: (value) => {
      if (!value) {
        return "You need to write something!";
      }
    },
  });
  currentUser = userName;
  socket.emit("authenticate", currentUser);
  Swal.fire(`Your name is ${currentUser}`);
})();

chatBox.addEventListener("keyup", ({ key }) => {
  let message = chatBox.value.trim()
  if (key == "Enter" && message.length) {
    socket.emit("message", { message, user: currentUser });
    chatBox.value = "";
  }
});

socket.on("messageLogs", data => {
  if(!data.length) return
  let messages = data.reduce((acc, msg) => {
    let me = msg.user === currentUser ? "currentUser" : "user";
    return (acc + 
      `<div class="message">
        <span class=${me}>
          ${msg.user} dice:
        </span>
        <span class="message-content">
          ${msg.message}
        </span>
      </div>`);
  }, "");
  log.innerHTML = messages;
});

socket.on("userConnected", (userName) => {
  Swal.fire({
    icon: "info",
    title: "User Connected",
    text: `${userName} has connected.`,
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
  });
});

socket.on("userDisconnected", (userName) => {
  Swal.fire({
    icon: "info",
    title: "User Disconnected",
    text: `${userName} has disconnected.`,
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
  });
});
