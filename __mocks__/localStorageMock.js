var localStorageMock = (function() {
  var store = {ownerCode:'test-ownercode'};
  return {
    getItem: function(key) {
      if(!store[key])return null
      try{
        return JSON.parse(store[key])
      }catch(_){
        return store[key]
      }
    },
    setItem: function(key, value) {
      store[key] = JSON.stringify(value)
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });
