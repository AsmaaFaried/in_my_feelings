import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { FaRegSadTear, FaRegSadCry } from "react-icons/fa"
import { ImConfused } from "react-icons/im"
import { BiHappyHeartEyes } from "react-icons/bi"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
import "./App.css"
function Home() {
	const [currentUser, setCurrentUser] = useState(null)
	const [allUsers, setAllUsers] = useState([])
	useEffect(() => {
		fetch("/me").then((response) => {
			if (response.ok) {
				response.json().then((user) => setCurrentUser(user))
			}
		})

		fetch("/users")
			.then((r) => r.json())
			.then((users) => {
				setAllUsers(users)
			})
	}, [])

	


	return (
		
		<Container
			style={{ marginTop: "5%", borderStyle: "solid", borderColor: "grey" }}
		>

			
			<h1 style={{color:"black"}}
				
			>
				All Users
			</h1>
			<br />
			<ul className="app-list">
				{console.log("users :",allUsers)}
				{console.log("current user :",currentUser)}
				{/* {
					allUsers.map((u)=>{
						return(
							console.log("users :",u)

						)
					})
				} */}

{/* 
// <li>
// 					{" "}
// 					<NavLink exact to="/moods/1" className="app-items">
// 						<BiHappyHeartEyes /> Happy
// 					</NavLink>{" "}
// 				</li>
// 				<li>
// 					{" "}
// 					<NavLink exact to="/moods/2" className="app-items">
// 						<FaRegSadCry /> Sad
// 					</NavLink>
// 				</li>
// 				<li>
// 					{" "}
// 					<NavLink exact to="/moods/3" className="app-items">
// 						<FaRegSadTear /> Stressed
// 					</NavLink>
// 				</li>
// 				<li>
// 					{" "}
// 					<NavLink exact to="/moods/4" className="app-items">
// 						<ImConfused /> i feel it all
// 					</NavLink>{" "}
// 				</li> */}
			</ul>
		</Container>
	)
}

export default Home





// <li>
// 					{" "}
// 					<NavLink exact to="/moods/1" className="app-items">
// 						<BiHappyHeartEyes /> Happy
// 					</NavLink>{" "}
// 				</li>
// 				<li>
// 					{" "}
// 					<NavLink exact to="/moods/2" className="app-items">
// 						<FaRegSadCry /> Sad
// 					</NavLink>
// 				</li>
// 				<li>
// 					{" "}
// 					<NavLink exact to="/moods/3" className="app-items">
// 						<FaRegSadTear /> Stressed
// 					</NavLink>
// 				</li>
// 				<li>
// 					{" "}
// 					<NavLink exact to="/moods/4" className="app-items">
// 						<ImConfused /> i feel it all
// 					</NavLink>{" "}
// 				</li>
