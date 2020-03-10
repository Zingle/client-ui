class Registry {
    constructor(initialReducer) {
        this.reducers = initialReducer;
        this.onReducerRegister = null;
    }

    getReducers = () => {
        return { ...this.reducers };
    }

    registerReducer = newReducerBranch => {
        this.reducers = {
            ...this.reducers,
            ...newReducerBranch
        };

        if (typeof this.onReducerRegister === 'function') {
            this.onReducerRegister(this.getReducers());
        }
    }

    setReducerRegistryListener = func => {
        if (typeof this.onReducerRegister === 'function') {
            throw new Error('Can only set reducer register function once');
        }

        this.onReducerRegister = func;
    }
}

export default Registry;