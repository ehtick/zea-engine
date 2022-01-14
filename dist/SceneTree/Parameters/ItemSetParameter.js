/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Parameter } from './Parameter';
import { BaseEvent } from '../../Utilities/BaseEvent';
class ItemEvent extends BaseEvent {
    constructor(item, index) {
        super();
        this.index = index;
        this.item = item;
    }
}
/** Class representing an item set parameter.
 * @extends Parameter
 * @private
 */
class ItemSetParameter extends Parameter {
    /**
     * Create an item set parameter.
     * @param name - The name of the item set parameter.
     * @param filterFn - The filterFn value.
     */
    constructor(name = '', filterFn) {
        super(name, new Set(), 'TreeItem');
        this.filterFn = filterFn; // Note: the filter Fn indicates that users will edit the set.
    }
    /**
     * The setFilterFn method.
     * @param filterFn - The filterFn value.
     */
    setFilterFn(filterFn) {
        this.filterFn = filterFn;
    }
    /**
     * The getFilterFn method.
     * @return - The return value.
     */
    getFilterFn() {
        return this.filterFn;
    }
    /**
     * The getItem method.
     * @param index - The index param.
     * @return - The return value.
     */
    getItem(index) {
        // if (!this.__items) return undefined
        return Array.from(this.__value)[index];
    }
    /**
     * The addItem method.
     * @param item - The item value.
     * @param emitValueChanged - The emit value.
     * @return - The return value.
     */
    addItem(item, emitValueChanged = true) {
        if (this.filterFn && !this.filterFn(item)) {
            console.warn('ItemSet __filterFn rejecting item:', item.getPath());
            return;
        }
        this.__value.add(item);
        const index = Array.from(this.__value).indexOf(item);
        this.emit('itemAdded', new ItemEvent(item, index));
        if (emitValueChanged)
            this.emit('valueChanged');
        return index;
    }
    /**
     * Adds items to the parameter value
     *
     * @param items - list of items to add to the parameter
     * @param emitValueChanged
     * @memberof ItemSetParameter
     */
    addItems(items, emitValueChanged = true) {
        items.forEach((item) => this.addItem(item, false));
        if (emitValueChanged)
            this.emit('valueChanged');
    }
    /**
     * The removeItem method.
     * @param index - The index value.
     * @param emitValueChanged - The emit param.
     * @return - The return value.
     */
    removeItem(index, emitValueChanged = true) {
        const item = Array.from(this.__value)[index];
        this.__value.delete(item);
        this.emit('itemRemoved', new ItemEvent(item, index));
        if (emitValueChanged)
            this.emit('valueChanged');
        return item;
    }
    /**
     * The setItems method.
     * @param items - The item param.
     * @param emit - The emit param.
     */
    setItems(items, emit = true) {
        const values = Array.from(this.__value);
        for (let i = values.length - 1; i >= 0; i--) {
            const item = values[i];
            if (!items.has(item)) {
                this.removeItem(i, false);
            }
        }
        for (const item of items) {
            if (!this.__value.has(item)) {
                this.addItem(item, false);
            }
        }
        if (emit)
            this.emit('valueChanged');
    }
    /**
     * The clearItems method.
     * @param emit - The emit value.
     */
    clearItems(emitValueChanged = true) {
        this.__value.clear();
        if (emitValueChanged)
            this.emit('valueChanged');
    }
    /**
     * The getNumItems method.
     * @return - The return value.
     */
    getNumItems() {
        return this.__value.size; // might be faster
    }
    // ////////////////////////////////////////
    // Persistence
    /**
     * The toJSON method encodes this type as a json object for persistence.
     * @param context - The context value.
     * @return - The return value.
     */
    toJSON(context) {
        if (!this.__value)
            this.__value = new Set();
        const items = [];
        if (context) {
            for (const item of this.__value) {
                // TODO: Make relative path...
                items.push(item.getPath());
            }
        }
        return {
            value: items,
        };
    }
    /**
     * The fromJSON method decodes a json object for this type.
     * @param j - The json object this item must decode.
     * @param context - The context value.
     */
    fromJSON(j, context) {
        if (context) {
            for (const itemPath in j.value) {
                const item = context.resolvePath(itemPath);
                this.__value.add(item);
            }
        }
    }
    // ////////////////////////////////////////
    // Clone
    /**
     * The clone method constructs a item set new parameter, copies its values
     * from this parameter and returns it.
     *
     * @return - Returns a new item set parameter.
     */
    clone() {
        const clonedParam = new ItemSetParameter(this.name, this.filterFn);
        return clonedParam;
    }
}
export { ItemSetParameter, ItemEvent };
//# sourceMappingURL=ItemSetParameter.js.map