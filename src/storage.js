

// KVSのユーティリティクラス

export class Datum {
    constructor(...args) {
        const kv = arguments.length >= 2;
        this.key = kv ? arguments[0] : Object.keys(arguments[0])[0];
        this.value = kv ? arguments[1] : arguments[0][this.key];
    }

    toMap() {
        const ret = {};
        ret[this.key] = this.value;
        return ret;
    }
}

// localStorage / syncStorage(chrome) のラッパー

export class Storage {
    constructor(sync) {
        this.internal = sync ? chrome.storage.sync : chrome.storage.local;
    }
    get(key, callback) {
        this.internal.get(key, (kv)  => {
            callback(new Datum(kv));
        });
    }
    set(datum, callback) {
        this.internal.set(datum.toMap(), callback);
    }
}
