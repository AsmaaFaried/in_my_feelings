import React, { useState, useEffect } from "react"
import Chatfeed from "./Chatfeed"
import MessagesArea from "./MessagesArea"
import RoomWebSocket from "./RoomWebSocket"
import Search from "./Search"

import "./css/Chat.css"

function RoomShow({
	cableApp,
	updateApp,
	getRoomData,
	messages,
	handleMessageUpdate,
	roomData,
	currentUser,
	users,
}) {
	const [newMessage, setNewMessage] = useState("")
	const [getData, setGetData] = useState(null)
	const [search, setSearch] = useState("")
	const chatroomId = window.location.href.match(/\d+$/)[0]

	useEffect(() => {
		fetch(`/chatrooms/${chatroomId}`)
			.then((resp) => resp.json())
			.then((res) => {
				setGetData(res.data.attributes.users.data)
				handleMessageUpdate(res.data.attributes.messages)
			})
	}, [])
	const handleRoom = async (id)=>{
		let res = await fetch(`http://localhost:3000/getroom`,{
			body:JSON.stringify({
				id
			})
		})

	}


	function displayUsers(data) {
		return data
			.map((x) => x.attributes)
			.filter((user) =>
				user.username.toLowerCase().includes(search.toLowerCase())
			)
			.map((user) => {
				return (
					<div
						style={{ overflowY: "scroll", scrollBehavior: "smooth" }}
						key={user.id}
					>
						<img
							style={{ height: "auto", width: "30px", float: "left" }}
							src="https://yorktonrentals.com/wp-content/uploads/2017/06/usericon.png"
							alt="avatar"
						/>
						<h6
							style={{
								color: "white",
								listStyle: "none",
								float: "left",
							}}
						>
							<a onClick={()=>handleRoom(user.id)} >{user.username}</a>
							
						</h6>
					</div>
				)
			})
	}

	function handleMessageInput(event) {
		setNewMessage(event.target.value)
	}
	const message = {
		message_body: newMessage,
		user_id: currentUser.data.attributes.id,
		chatroom_id: chatroomId,
	}
	function submitMessage(e) {
		// debugger;
		e.preventDefault()
		setNewMessage("")
		fetch("/messages", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(message),
		})
			.then((resp) => resp.json())
			.then(() => {
				let messageDiv = document.getElementById("messages")
				messageDiv.scrollTop = messageDiv.scrollHeight
			})
	}
	function whichUser(message) {
		const user = roomData.users.find((x) => parseInt(x.id) === message.user_id)
		return user
	}

	function displayMessages(messages) {
		return messages.map((msg) => {
			const user = whichUser(msg)
			// console.log(user)
			return msg.message_body !== null ? (
				<Chatfeed
					key={msg.id}
					room={roomData}
					user={user}
					onDeleteMessage={handleDeleteClick}
					onUpdateMessage={handleUpdateMessage}
					currentUser={currentUser}
					allUsers={users}
					message={msg}
				/>
			) : (
				<div></div>
			)
		})
	}
	function handleUpdateMessage(updatedMessageObj) {
		const updatedMessages = messages.map((message) => {
			if (message.id === updatedMessageObj.id) {
				return updatedMessageObj
			} else {
				return message
			}
		})
		handleMessageUpdate(updatedMessages)
	}

	function handleDeleteClick(id) {
		fetch(`/messages/${id}`, {
			method: "DELETE",
		})

		const updatedMessages = messages.filter((message) => message.id !== id)
		handleMessageUpdate(updatedMessages)
	}

	return (
		<div className="chat-container">
			<div className="users">
			
				<h3 style={{ float: "left" ,marginLeft: "113px",}}>Room  {roomData.chatroom.room_name}</h3><br></br>
				{/* <h4 style={{ float: "left" ,marginLeft: "98px"}}>Chatroom Members</h4> */}
				{/* removed break tags */}
				<Search search={search} setSearch={setSearch}></Search>
				{getData !== null ? displayUsers(getData) : null}
			</div>
			<div id="messages" className="message-feed">
				<div>
					{messages !== null && messages.length > 0 ? (
						displayMessages(messages)
					) : (
						<h3 style={{ color: "blue", marginTop: "50px" }}>
							This room has no message yet
						</h3>
					)}
				</div>
				{/* removed break tags */}
				<MessagesArea
					submitMessage={submitMessage}
					newMessage={newMessage}
					onMessageInput={handleMessageInput}
				/>
			</div>
			<RoomWebSocket
				cableApp={cableApp}
				updateApp={updateApp}
				getRoomData={getRoomData}
				roomData={roomData}
			/>
		</div>
	)
}

export default RoomShow
