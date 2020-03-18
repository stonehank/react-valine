var localStorageMock = (function() {
  var store = {ownerCode:'test-ownercode'};
  return {
    getItem: function(key) {
      if(!store[key])return null
      return JSON.stringify(store[key]);
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });
