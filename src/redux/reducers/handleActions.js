import { calculateNewValue } from "@testing-library/user-event/dist/utils";

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
        console.log(data);
        return {
            ...otherEntries,
            [field]: data.length ? [...data, ...this.state[field]] : this.state[field],
        };
    };
    updateItem(updateField, callback, initialState, otherEntries = {},) {
        // Inside otherEntries including in the initial state
        if (Object.entries(otherEntries).length) {
            return {
                ...initialState,
                [updateField]: initialState[updateField].map(item => {
                    return callback(item);
                }),
                ...otherEntries
            };
        }
        return {
            ...initialState,
            [updateField]: initialState[updateField].map(item => {
                return callback(item);
            })
        };
    };
}
