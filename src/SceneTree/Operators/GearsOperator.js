import {
    Vec3,
    Quat
} from '../../Math';
import {
    XfoOperatorOutput,
    Operator
} from './Operator.js';
import {
    ValueSetMode,
    StructParameter,
    Parameter,
    NumberParameter,
    Vec3Parameter,
    ListParameter,
    KinematicGroupParameter
} from '../Parameters';
import {
    sgFactory
} from '../SGFactory.js';


class GearParameter extends StructParameter {
    constructor(name) {
        super(name);

        this.__ratioParam = this._addMember(new NumberParameter('Ratio', 1.0));
        this.__offsetParam =  this._addMember(new NumberParameter('Offset', 0.0));
        this.__axisParam = this._addMember(new Vec3Parameter('Axis', new Vec3(1,0,0)));
        this.__output = new XfoOperatorOutput();
    }

    getOutput(){
        return this.__output;
    }

    getRatio() {
        return this.__ratioParam.getValue();
    }
    getOffset() {
        return this.__offsetParam.getValue();
    }
    getAxis() {
        return this.__axisParam.getValue();
    }

    //////////////////////////////////////////
    // Persistence

    toJSON(context) {
        const j = super.toJSON(context);
        if(j){
            j.output = this.__output.toJSON(context);
        }
        return j;
    }

    fromJSON(j, context) {
        super.fromJSON(j, context);
        if(j.output){
            this.__output.fromJSON(j.output, context);
        }
    }
}

class GearsOperator extends Operator {
    constructor(name) {
        super(name);

        this.__revolutionsParam = this.addParameter(new NumberParameter('Revolutions', 0.0, [0, 1]));
        const rpmParam = this.addParameter(new NumberParameter('RPM', 0.0)); // revolutions per minute
        this.__timeoutId;
        rpmParam.valueChanged.connect(() => {
            let rpm = rpmParam.getValue();
            if (rpm > 0.0) {
                if (!this.__timeoutId) {
                    const timerCallback = () => {
                        rpm = rpmParam.getValue();
                        const revolutions = this.__revolutionsParam.getValue();
                        this.__revolutionsParam.setValue(revolutions + (rpm * (1 / (50 * 60))));
                        this.__timeoutId = setTimeout(timerCallback, 20); // Sample at 50fps.
                    };
                    timerCallback();
                }
            } else {
                clearTimeout(this.__timeoutId);
                this.__timeoutId = undefined;
            }
        });
        this.__gearsParam = this.addParameter(new ListParameter('Gears', GearParameter));
        this.__gearsParam.elementAdded.connect((value, index) => {
            this.addOutput(value.getOutput());
        })
        this.__gearsParam.elementRemoved.connect((value, index) => {
            this.removeOutput(index);
        })

        this.__gears = [];
    }

    evaluate() {

        const revolutions = this.__revolutionsParam.getValue();
        const gears = this.__gearsParam.getValue();
        const len = gears.length;
        for(let gear of gears) {
            const output = gear.getOutput();

            const rot = (revolutions * gear.getRatio()) + gear.getOffset();

            const quat = new Quat();
            quat.setFromAxisAndAngle(gear.getAxis(), rot * Math.PI * 2.0);
            // const initialxfo = output.getInitialValue().clone();
            const xfo = output.getValue();
            xfo.ori = quat.multiply(output.getInitialValue().ori);
            output.setValue(xfo);
        }
    }



    destroy(){
        // clearTimeout(this.__timeoutId);
        super.destroy();
    };
};


sgFactory.registerClass('GearsOperator', GearsOperator);

export {
    GearsOperator
};