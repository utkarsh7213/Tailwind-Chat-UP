(function(){

	const app = document.querySelector(".app");
	const socket = io();

	let uname;

	app.querySelector(".join-screen #join-user").addEventListener("click",function(){
		let username = app.querySelector(".join-screen #username").value;
		if(username.length == 0){
			return;
		}
		socket.emit("newuser",username);
		uname = username;

		app.querySelector(".join-screen").classList.remove("active");
		app.querySelector(".chat-screen").classList.add("active");
	});

	app.querySelector(".chat-screen #send-message").addEventListener("click",function(){
		let message = app.querySelector(".chat-screen #message-input").value;
		if(message.length  == 0){
			return;
		}
		renderMessage("my",{
			username:uname,
			text:message
		});
		socket.emit("chat",{
			username:uname,
			text:message
		});
		app.querySelector(".chat-screen #message-input").value = "";
		const ele=document.getElementById('chat-screen')
	    ele.scrollTo(0,document.body.scrollHeight)

	});

	app.querySelector(".chat-screen #exit-chat").addEventListener("click",function(){
		socket.emit("exituser",uname);
		window.location.href = window.location.href;
	});

	socket.on("update",function(update){
		renderMessage("update",update);
	});
	
	socket.on("chat",function(message){
		renderMessage("other",message);
	});

	function renderMessage(type,message){
		let messageContainer = app.querySelector(".chat-screen .messages");
		if(type == "my"){
			let el = document.createElement("div");
			el.setAttribute("class","message my-message");
			el.innerHTML = `
			<div class="flex justify-end my-2">
			<div class=" border-[#26408b] border-2 p-4 rounded-2xl rounded-br-none  max-w-md   ">
					<div class="name  text-teal-500">You</div>
					<span class="text-[#1b263b] font-Nunito break-words">${message.text}</span>
				</div>
		</div>
			`;
			messageContainer.appendChild(el);
		} else if(type == "other"){
			let el = document.createElement("div");
			el.setAttribute("class","message other-message");
			el.innerHTML = `
			<div class="flex justify-start my-2">
                    <div class=" border-[#26408b] border-2 p-4 rounded-2xl rounded-bl-sm  max-w-md   ">
                            <div class="name  text-[#b388eb]">${message.username}</div>
                            <span class="text-[#1b263b] font-Nunito break-words">${message.text}</span>
                        </div>
                </div>
			`;
			messageContainer.appendChild(el);
		} else if(type == "update"){
			let el = document.createElement("div");
			el.setAttribute("class","update");
			el.innerHTML = `
				<div>
					<div class="text-red-500">${message}</div>
				</div>
			`;
			messageContainer.appendChild(el);
		}
		// scroll chat to end
		messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
	}

})();

const func=()=>{
    
	console.log(messageContainer);
}