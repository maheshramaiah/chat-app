class Storage {
    save(key, value) {
        window.sessionStorage.setItem(key, JSON.stringify(value));
    }

    get(key) {
        const value = window.sessionStorage.getItem(key);

        return JSON.parse(value);
    }
}

export default new Storage();