import { calculateNewValue } from "@testing-library/user-event/dist/utils";

export default class ActionHandler {
    constructor(state, action) {
        this.state = state;
        this.action = action;
    }
    getListItem(field, data, otherEntries) {
        return {
            ...otherEntries,
            [field]: data,
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
            ...otherEntries,
            [field]: data.length ? [...data, ...otherEntries[field]] : otherEntries[field],
        };
    };
    removeItem(updateField, callback, otherEntries) {
        return {
            ...otherEntries,
            [updateField]: otherEntries[updateField].map(item => {
                return callback(item);
            }).filter(item => item)
        }
    }
    updateItem(updateField, callback, otherEntries = {}) {
        // Inside otherEntries including in the initial state
        return {
            ...otherEntries,
            [updateField]: otherEntries[updateField].map(item => {
                return callback(item);
            }),
        };
    };
}
