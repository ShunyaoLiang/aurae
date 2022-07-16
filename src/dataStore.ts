let dataStore: dataStore = {
    users: [],
    sessions: [],
  }
  dataStore.users.push({
    uId: 1000,
    email: 'Amy@gmail.com',
    password: 'password',
    username: 'Amy',
    mood: [5,4,5],
    comment: 'Hello, I am Amy'
  },
  {
    uId: 1001,
    email: 'Deon@gmail.com',
    password: 'password',
    username: 'Deon',
    mood: [1,1,1],
    comment: 'Hi guys, my name is Deon'
  },
  {
    uId: 1002,
    email: 'Emily@gmail.com',
    password: 'password',
    username: 'Emily',
    mood: [4,4,3],
    comment: 'I am probably coding right now '
  },
  {
    uId: 1003,
    email: 'Ava@gmail.com',
    password: 'password',
    username: 'Ava',
    mood: [5,2,5],
    comment: 'Keep smiling' // lol idk
  },
  )
  dataStore.sessions.push({
    uId: 1000,
    token: 1000
  },
  {
    uId: 1001,
    token: 1001
  })

  interface data {
    users: users[];
    sessions: sessions[];
  }
  interface dataStore {
    users: users[];
    sessions: sessions[];
  }
  interface users {
    uId: number;
    email: string;
    password: string;
    username: string;
    mood: number[];
    comment: string;
  }
  interface sessions {
    uId: number;
    token: number;
  }
  
  
  function getData () {
      return dataStore;
  }
  
  function setdata (data: data) {
      dataStore = data;
  }
  
  export { setdata, getData };