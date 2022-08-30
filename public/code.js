(function () {
  const app = document.querySelector(".app");
  const socket = io();

  var uname;
  var username;
  var room_id;

  app
    .querySelector(".join-screen #join-user")
    .addEventListener("click", function () {
      const ele = document.getElementById("chat-screen");
      const id_box = document.getElementById("id_box");
      const current_username = document.getElementById("current_username");
      ele.scrollTop = ele.scrollHeight;
      username = app.querySelector(".join-screen #username").value;
      room_id = app.querySelector("#room_id").value;
      uname = username;
      if (username.length == 0 || room_id.length == 0) {
        console.log("return");
        return;
      }
      socket.emit("newuser", { username, room_id });
      id_box.innerText = room_id;
      current_username.innerText = username;
      socket.emit("online_users", room_id);
      app.querySelector(".join-screen").classList.remove("active");
      app.querySelector(".chat-screen").classList.add("active");
    });

  app
    .querySelector(".chat-screen #send-message")
    .addEventListener("click", function () {
      let message = app.querySelector(".chat-screen #message-input").value;
      if (message.length == 0) {
        return;
      }
      renderMessage("my", {
        username: uname,
        text: message,
      });
      socket.emit("chat", {
        username: uname,
        text: message,
        id: room_id,
      });
      app.querySelector(".chat-screen #message-input").value = "";
      const ele = document.getElementById("chat-screen");
      ele.scrollTop = ele.scrollHeight;
    });

  app
    .querySelector(".chat-screen #exit-chat")
    .addEventListener("click", function () {
      socket.emit("exituser", { uname, room_id });
      window.location.href = window.location.href;
    });

  socket.on("update", function (update) {
    renderMessage("update", update);
  });

  socket.on("chat", function (message) {
    renderMessage("other", message);
    app.querySelector(".chat-screen #message-input").value = "";
    const ele = document.getElementById("chat-screen");
    ele.scrollTop = ele.scrollHeight;
  });

  function renderMessage(type, message) {
    let messageContainer = app.querySelector(".chat-screen .messages");
    if (type == "my") {
      let el = document.createElement("div");
      el.setAttribute("class", "message my-message");
      el.innerHTML = `
			<div class="flex justify-end my-2 animatecss-slideInRight  duration-200">
        <div class=" bg-[#23404e]  p-4 rounded-2xl rounded-br-none  max-w-md   ">
            <div class="name  text-teal-500">You</div>
            <span class="text-[#dddedf] font-Nunito break-words">${message.text}</span>
          </div>
      </div>
			`;
      messageContainer.appendChild(el);
    } else if (type == "other") {
      let el = document.createElement("div");
      el.setAttribute("class", "message other-message");
      el.innerHTML = `
			<div class="flex justify-start my-2 animatecss-slideInLeft  duration-200">
          <div class=" bg-[#019393] p-4 rounded-2xl rounded-bl-sm  max-w-md   ">
                  <div class="name  text-gray-900">${message.username}</div>
                  <span class="text-[#dcdcdc] font-Nunito break-words">${message.text}</span>
              </div>
      </div>
			`;
      messageContainer.appendChild(el);
    } else if (type == "update") {
      let el = document.createElement("div");
      el.setAttribute("class", "update");
      el.innerHTML = `
				<div>
					<div class="text-red-500 text-center">${message}</div>
				</div>
			`;
      messageContainer.appendChild(el);
    }
    // scroll chat to end
    app.querySelector(".chat-screen #message-input").value = "";
    const ele = document.getElementById("chat-screen");
    ele.scrollTop = ele.scrollHeight;
  }
  socket.on("recieve_users", function (users) {
    const div = document.getElementById("online_user_div");
    div.innerHTML = "";
    users.forEach((e) => {
      div.innerHTML += `   <div class="flex space-x-3 rounded-2xl  border border-green-300 items-center p-1 px-2 " id="">
          <p class="h-5 w-5 rounded-full bg-green-500 "></p>
          <span class="font-Nunito text-slate-200 pt-[2px]">${e}</span>
        </div>`;
    });
  });
})();

$("#click1").click(function () {
  $(".u7").hide();
});
$("#click").click(function () {
  $(".u7").show();
});

$(".loader").fadeTo(1500, 1).fadeOut(200);

$("#message-input").keypress(function (event) {
  if (event.keyCode === 13) {
    $("#send-message").click();
  }
});

let bgHead = document.getElementById("chat-screen");
let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let btn3 = document.getElementById("btn3");
let btn4 = document.getElementById("btn4");
let btn5 = document.getElementById("btn5");

btn1.addEventListener("click", function () {
  bgHead.style.backgroundColor = "#03045e";
});

btn2.addEventListener("click", function () {
  bgHead.style.backgroundColor = "#240046";
});

btn3.addEventListener("click", function () {
  bgHead.style.backgroundColor = "black";
});

btn4.addEventListener("click", function () {
  bgHead.style.backgroundColor = "#1c0061";
});

btn5.addEventListener("click", function () {
  bgHead.style.backgroundColor = "#2f2235";
});
btn6.addEventListener("click", function () {
  bgHead.style.backgroundColor = "#373d20";
});
btn7.addEventListener("click", function () {
  bgHead.style.backgroundColor = "#5F093D";
});
btn8.addEventListener("click", function () {
  bgHead.style.backgroundColor = "#5E376D";
});
btn9.addEventListener("click", function () {
  bgHead.style.backgroundColor = "#0D659D";
});
// bgHead.addEventListener('click', function() {
//     bgHead.style.backgroundColor = "#FFF";
// });