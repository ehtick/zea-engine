import {
    Vec3,
    Color,
    Xfo,
    Signal
} from '../../Math';
import { VRTool } fromm 'VRTool.js'

class VRMarkerpenTool extends VRTool {
    constructor(vrStage, vrHead, vrControllers) {
        // super('VRMarkerpenTool');
        this.__vrStage = vrStage;
        this.__vrHead = vrHead;
        this.__vrControllers = vrControllers;
        this.__activeController = null;

        this.__tipOffsetXfo = new Xfo();
        this.__tipOffsetXfo.tr.set(0.0,-0.01, -0.03);
        this.__color = new Color(1.0, 0.2, 0.2);

        this.strokeStarted = new Signal();
        this.strokeEnded = new Signal();
        this.strokeSegmentAdded = new Signal();

        this.__pressedButtons = 0;
        for(let vrController of this.__vrControllers) {
            vrController.setHandleColor(new Color(0, 1, 0));

            vrController.buttonPressed.connect(() => {
                if(!this.__active)
                    return;
                this.__pressedButtons++;
                this.startAction();
            }, this);

            vrController.buttonReleased.connect(() => {
                if(!this.__active)
                    return;
                this.__pressedButtons--;
                this.endAction();
            }, this);
        }
    }

    startAction() {
        if(this.__vrControllers[0].isButtonPressed()){
            this.__activeController = this.__vrControllers[0];
        }
        else if(this.__vrControllers[1].isButtonPressed()){
            this.__activeController = this.__vrControllers[1];
        }
        this.__stageXfo = this.__vrStage.getXfo();

        let xfo = this.__stageXfo.multiply(this.__activeController.getTipXfo().multiply(this.__tipOffsetXfo));
        let sc = this.__vrStage.getXfo().sc;
        let lineThickness = 0.0075 * sc.x;

        this.strokeStarted.emit({
            type: 'strokeStarted',
            data: {
                xfo: xfo,
                color: this.__color,
                thickness: lineThickness
            }
        });
    }

    endAction() {

    }

    evalTool() {
        if(this.__pressedButtons == 1) {
            let xfo = this.__stageXfo.multiply(this.__activeController.getTipXfo().multiply(this.__tipOffsetXfo));
            // this.addSegmentToStroke(this.__currStrokeID, xfo);

            this.strokeSegmentAdded.emit({
                type: 'strokeSegmentAdded',
                data: {
                  xfo: xfo
                }
            });
        }
    }
};

export {
    VRMarkerpenTool
};