
import {
    Parameter,
    NumberParameter
} from '../../SceneTree/Parameters';
import {
    StateEvent
} from '../StateEvent.js';


class TimedWait extends StateEvent  {
    constructor(state) {
        super(state)
        this.__waitTimeParam = this.addParameter(new NumberParameter('WaitTime', 1));
    }

    activate() {
        const timerCallback = () => {
            delete this.__timeoutId;
            this.__onEvent();
        };
        this.__timeoutId = window.setTimeout(timerCallback, this.__waitTimeParam.getValue()*1000); // Sample at 50fps.
    }

    deactivate() {
        if(this.__timeoutId){
            window.clearTimeout(this.__timeoutId);
        }
    }

};


export {
    TimedWait
};
