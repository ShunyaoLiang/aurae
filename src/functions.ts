import e from "express";
import { getData, setdata } from "./dataStore";


function userLogin (username: string, password: string) {
	let data = getData();
	if(data.users.some(e => e.username === username)) {
		return { error: 'Incorrect username or password' }
	}
	const index = data.users.findIndex(e => e.username === username);
	if (data.users[index].password !== password) {
		return { error: 'Incorrect username or password'}
	}
	const id = data.users[index].uId;
	data.sessions.push({
		uId: id,
		token: id
	})
	setdata(data);
	return { 
		uId: id,
		token: id
	}
}

function userLogout (token: number) {
	let data = getData();
	if(data.sessions.some(e => e.token === token)) {
		return { error: 'Invalid token' }
	}
	data.sessions.filter(function (deleteToken)
	{
		return deleteToken.token !== token
	});
}

function setMood (uId: number, mood: number) {
	let data = getData();
	const index = data.users.find(e => e.uId === uId);
	data.users[index].mood.push(mood);
	setdata(data);
	return;
}
// returns an array of objects of all the users
function homePageData(uId: number) {
	let data = getData();
	const index = data.users.some(e => e.uId === uId)
	let returnData = [];
	for (let i of data.users) {
		if (i.uId !== uId) {
			// username, latest mood, random comment (kinda like insta bio)
			returnData.push({
				username: i.username,
				moodOfTheDay: i.mood[2],
				comment: i.comment
			})
		}
	}
	return returnData;
}

function Profiledata(token: number, uId: number) {
	let data = getData();
	let profileData = [];
	const index = data.users.findIndex(e => e.uId === uId);
	profileData.push({
		username: data.users[index].username,
		mood: data.users[index].mood,// full mood array, last index is latest
		comment: data.users[index].comment
	})
	return Profiledata;
}

function reachOutNotif(token: number, uId: number) {
	let data = getData();
	for (let i of data.users) {
		let index = i.mood.length - 1
		if (i.mood[index] === 1) {
			return 'Consider reaching out to Deon :)'
		}
	}
	return;
}

export { userLogin, userLogout, setMood, homePageData, Profiledata, reachOutNotif };