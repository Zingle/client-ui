import io from 'socket.io-client';

class SocketUtility {
    constructor() {
        this.callbacks = {};
        this.config = window.SOCKET_SERVER;
        this.url = SocketUtility.getInitialURL(window.SOCKET_SERVER);
        this.connection = SocketUtility.getConnection(this.url);

        this.on('connect_error', this.restart);
        this.on('reconnect_error', this.restart);
    }

    static getConnection(url) {
        return io(url, {
            query: `token=${window.USER_TOKEN}`,
            reconnectionAttempts: 10,
            reconnectionDelay: 5000,
            // Max delay will be 2 minutes
            reconnectionDelayMax: 1000 * 60 * 2,
            timeout: 5000,
        });
    }

    static getInitialURL(data) {
        if (typeof data === 'string') {
            return data;
        } else if (Array.isArray(data) && data.length) {
            return SocketUtility.getRandomURLFromList(data);
        } else {
            throw new Error('SOCKET_SERVER variable must be a string or an array with strings');
        }
    }

    static getRandomURLFromList(list) {
        if (!list.length) return '';
        if (list.length === 1) return list[0];

        return list[Math.floor(Math.random() * list.length)];
    }

    fireCallbacks = (evt, data) => {
        this.callbacks[evt].forEach(callback => {
            if (typeof callback === 'function') {
                callback(data);
            }
        });
    }

    on = (evt, callback) => {
        if (!Object.prototype.hasOwnProperty.call(this.callbacks, evt)) {
            this.callbacks[evt] = [callback];
            this.bindEvent(evt);
        } else {
            this.callbacks[evt].push(callback);
        }
    }

    open = () => {
        this.connection.open();
    }

    emit = (evt, data) => {
        try {
            this.connection.emit(evt, data);
        } catch (err) {
            console.log(`%cException in socket emit: ${event}`, 'color: #F00; font-weight: bold; text-decoration: underline;');
            console.log(err.toString());
        }
    }

    bindEvent = evt => {
        this.connection.on(evt, data => {
            this.fireCallbacks(evt, data);
        });
    }

    rebindEvents = () => {
        Object.keys(this.callbacks).forEach(evt => {
            this.bindEvent(evt);
        });
    }

    restart = () => {
        if (typeof this.config === 'string') {
            // We can bail here, becuase there are no other URLs we have
            // access to. The client should keep attempting to reconnect as normal.
            return;
        } else if (Array.isArray(this.config) && this.config.length) {
            // If the config length is more than 1, we want to get the next random item
            // from the array. If not, just return the single item;
            if (this.config.length > 1) {
                let idx = Math.floor(Math.random() * this.config.length);
                let tries = this.config.length * 10;
                // Keep trying for a new index until this.url and the value at said
                // index don't match. Keep track of tries so that we don't get into an infinite loop
                // in the rare case that the config array has repeat values only.
                while (this.config[idx] === this.url && tries > 0) {
                    tries -= 1;
                    idx = Math.floor(Math.random() * this.config.length);
                }

                this.connection.close();
                this.url = this.config[idx];
                this.connection = SocketUtility.getConnection(this.url);
                // We need to rebind the event listeners, since we have just made a new connection.
                this.rebindEvents();
            } else {
                return;
            }
        } else {
            throw new Error('SOCKET_SERVER variable must be a string or an array with strings');
        }
    }
}

const instance = new SocketUtility();

export default instance;