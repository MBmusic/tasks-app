const DataStorage = (() => {
    let storage = null;

    return {
        init() {
            storage = window.localStorage;
        },

        setData(key, value) {
            storage.setItem(key, value);
        },

        getData(key) {
            return storage.getItem(key);
        },

        clear() {
            storage.clear();
        }
    }
})();

export default DataStorage;