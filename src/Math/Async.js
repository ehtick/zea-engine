import { Signal } from '../Math/Signal';

class Async {
    constructor() {
        this.__asyncCount = 0;
        this.ready = new Signal(true);

        this.incAsyncCount = function(count=1) {
            this.__asyncCount+=count;
        }.bind(this);

        this.decAsyncCount = function() {
            if (this.__asyncCount > 0){
                this.__asyncCount--;
                if (this.__asyncCount == 0) {
                    this.__asyncsCompleted();
                }
            }
        }.bind(this);

        this.__asyncsCompleted = function(){
            this.ready.emit();
        }.bind(this)
    }

    get count(){
        return this.__asyncCount;
    }

};

export {
    Async
};
// export default Async;

