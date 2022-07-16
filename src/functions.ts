import e from "express";
import { getData, setdata } from "./dataStore";

interface returnData {
	uId: number;
	username: string;
	mood: number[];
	comment: string
}
interface profileData {
	username: string;
	mood: number[];
	comment: string
}


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
	const index = data.users.findIndex(e => e.uId === uId);
	data.users[index].mood.push(mood);
	setdata(data);
	return;
}
// returns an array of objects of all the users
function homePageData(uId: number): returnData[] {
	let data = getData();
	const index = data.users.some(e => e.uId === uId)
	let returnData: returnData[] = [];
	for (let i of data.users) {
		if (i.uId !== uId) {
			// username, latest mood, random comment (kinda like insta bio)
			returnData.push({
				uId: i.uId,
				username: i.username,
				mood: i.mood,
				comment: i.comment
			})
		}
	}
	return returnData;
}

function Profiledata(token: number, uId: number): profileData {
	let data = getData();
	let profileData: profileData[] = [];
	const index = data.users.findIndex(e => e.uId === uId);
	profileData.push({
		username: data.users[index].username,
		mood: data.users[index].mood,// full mood array, last index is latest
		comment: data.users[index].comment
	})
	return profileData[0];
}

function reachOutNotif(token: number) {
	let data = getData();
	for (let i of data.users) {
		let index = i.mood.length - 1
		if (i.mood[index] === 1) {
			return 'Consider reaching out to Deon :)'
		}
	}
	return;
}

function moodSelect (token: number ) {
	let data = getData();
	const index = data.users.findIndex(e => e.uId === token);
	if (!data.users[index].moodSelected) {
		data.users[index].moodSelected = true;
		return false;
	}
	return true;
}

export { userLogin, userLogout, setMood, homePageData, Profiledata, reachOutNotif, moodSelect };