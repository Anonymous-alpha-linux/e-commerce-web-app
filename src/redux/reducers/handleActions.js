export default class ActionHandler {
    constructor(state, action) {
        this.state = state;
        this.action = action;
    }

    getListItem(field, data, otherEntries) {
        return {
            ...this.state,
            [field]: data,
            ...otherEntries
        };
    }
    filterListItem(field, data, otherEntries) {
        return {
            ...this.state,
            [field]: data,
            filter: this.action.filter,
            page: 0,
            ...otherEntries
        };
    }
    loadMoreItems(field, data, otherEntries) {
        return {
            ...this.state,
            [field]: data.length ? this.state[field].concat(data) : this.state[field],
            page: data.length ? this.state.page + 1 : this.state.page,
            ...otherEntries
        }
    }
    unshiftItem(field, data, otherEntries) {
        return {
            ...this.state,
            [field]: data.length ? [...data, ...this.state[field]] : this.state[field],
            ...otherEntries
        };
    };
    updateItem(field, data, prediction, otherEntries) {
        return {
            ...this.state,
            [field]: this.state[field].map(item => {
                if (prediction(item)) {
                    return {
                        ...item,
                        ...data.data
                    };
                }
                return item;
            }),
            ...otherEntries
        };
    }
}