import {
    Vec3
} from '../../Math';
import {
    Operator
} from './Operator.js';
import {
    Parameter
} from '../Parameters/Parameter.js';
import {
    NumberParameter
} from '../Parameters/NumberParameter.js';

class ExplodePartsOperator extends Operator {
    constructor(ownerItem) {
        super(ownerItem);

        this.addParameter(new NumberParameter('Explode', 0.0, [0,1]));
        this.addParameter(new NumberParameter('Dist', 1.0));
        this.addParameter(new Parameter('Cascading', true, 'Boolean'));
        this.addParameter(new Parameter('Dir', new Vec3(1, 0, 0), 'Vec3'));
        this.__parts = [];
        this.__stages = 2;
    }


    connectParts(partGroups) {
        // e.g. [['.a/b/c'], [./foo]]
        this.__partGroups = partGroups;
        this.__stages = partGroups.length;
        this.__parts = [];
        for(let i=0; i<partGroups.length; i++) {
            let partGroup = partGroups[i];
            if(!partGroup){
                continue;
            }
            // if(typeof partGroup == 'string') {
            //     partGroup = [partGroup];
            // }
            for(let path of partGroup) {
                let treeItem = this.__ownerItem.resolvePath(path);
                if(treeItem) {
                    this.__parts.push({
                        stage: i,
                        initialXfo: treeItem.getGlobalXfo().clone()
                    });
                    this.__outputs.push(treeItem.getParameter('globalXfo'));
                }
            }
        }
    }
    evaluate(){

        let explode = this.getParameter('Explode').getValue();
        let cascading = this.getParameter('Cascading').getValue();
        let explodeDist = this.getParameter('Dist').getValue();
        let explodeDir = this.getParameter('Dir').getValue();

        for(let i=0; i<this.__parts.length; i++) {
            let part = this.__parts[i];
            let dist;
            if(cascading) {
                let edge0 = part.stage / (this.__stages+1);
                let edge1 = (part.stage + 2) / (this.__stages+1);
                dist = explodeDist * Math.smoothStep(edge0, edge1, explode);
            }
            else {
                dist = explodeDist * Math.smoothStep(0.0, 1.0, explode) * (1.0 - (part.stage / (this.__stages+1)));
            }

            let globalXfo = this.__outputs[i].getValue();
            globalXfo.tr = part.initialXfo.tr.add(explodeDir.scale(dist));
            this.__outputs[i].setValue(globalXfo);
        }
    }
};

export {
    ExplodePartsOperator
};
//export default AssetItem;