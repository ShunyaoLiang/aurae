let dataStore = {
    users: [],
      sessions: [],
      aurae: [],
  }
  
  function getData () {
      return dataStore;
  }
  
  function setdata (data) {
      dataStore = data;
  }
  
  export { setdata, getData }