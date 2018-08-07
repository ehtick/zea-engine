import { Vec3 } from '../../Math/Vec3';
import { GLPass, PassType } from '../GLPass.js';
import { GLRenderer } from '../GLRenderer.js';

import {
    AudioItem,
    GeomItem
} from '../../SceneTree';

const audioCtx = new AudioContext();

class GLAudioItemsPass extends GLPass {
    constructor() {
        super();
        this.__audioItems = [];
    }

    
    init(gl, collector, passIndex) {
        super.init(gl, collector, passIndex);

        collector.registerSceneItemFilter((treeItem, rargs)=>{
            if (treeItem instanceof AudioItem) {
                treeItem.loaded.connect(()=>{
                    this.addAudioItem(treeItem, treeItem.getAudioSource(), treeItem);
                })
                return true;
            }
            if (treeItem instanceof GeomItem) {
                const material = treeItem.getMaterial();
                if(material) {
                    const baseColorParam = material.getParameter('BaseColor');
                    if(baseColorParam && baseColorParam.getImage && baseColorParam.getImage()) {
                        const image = baseColorParam.getImage();
                        image.loaded.connect(()=>{
                            if(image.getAudioSource) {
                                const audioSource = image.getAudioSource();
                                if (audioSource instanceof HTMLMediaElement || audioSource instanceof AudioBufferSourceNode)
                                    this.addAudioItem(treeItem, audioSource, image);
                            }
                        })
                    }
                }
                // Let other filters handle this item.
                return false;
            }
        });
    }


    addAudioItem(treeItem, audioSource, parameterOwner) {

        if(audioSource.addedToCollector)
            return;

        let source;
        if (audioSource instanceof HTMLMediaElement)
            source = audioCtx.createMediaElementSource(audioSource);
        else if (audioSource instanceof AudioBufferSourceNode)
            source = audioSource;
        else
            source = audioCtx.createMediaStreamSource(audioSource);
        
        const connectVLParamToAudioNodeParam = (vlParam, param) => {
            // param.setTargetAtTime(vlParam.getValue(), audioCtx.currentTime, 0.2);
            param.value = vlParam.getValue();
            vlParam.valueChanged.connect(() => {
                // param.setTargetAtTime(vlParam.getValue(), audioCtx.currentTime);
                param.value = vlParam.getValue();
            });
        }

        const gainNode = audioCtx.createGain();
        connectVLParamToAudioNodeParam(parameterOwner.getParameter('Gain'), gainNode.gain);

        source.connect(gainNode);
        const panner = audioCtx.createPanner();
        panner.panningModel = 'HRTF';
        panner.distanceModel = 'inverse';
        source.connect(panner);
        panner.connect(audioCtx.destination);

        source.loop = true;

        const connectVLParamToAudioNode = (paramName) => {
            const vlParam = parameterOwner.getParameter(paramName)
            panner[paramName] = vlParam.getValue();
            vlParam.valueChanged.connect(() => {
                panner[paramName] = vlParam.getValue();
            });
        }

        // connectVLParamToAudioNode('refDistance');
        // connectVLParamToAudioNode('maxDistance');
        // connectVLParamToAudioNode('rolloffFactor');
        connectVLParamToAudioNode('coneInnerAngle');
        connectVLParamToAudioNode('coneOuterAngle');
        connectVLParamToAudioNode('coneOuterGain');


        const updatePannerNodePosition = () => {
            let xfo;
            if(treeItem instanceof GeomItem)
                xfo = treeItem.getGeomXfo();
            else
                xfo = treeItem.getGlobalXfo();
            if (panner.positionX) {
                // panner.positionX.setTargetAtTime(xfo.tr.x, audioCtx.currentTime);
                // panner.positionY.setTargetAtTime(xfo.tr.y, audioCtx.currentTime);
                // panner.positionZ.setTargetAtTime(xfo.tr.z, audioCtx.currentTime);
                panner.positionX.value = xfo.tr.x;
                panner.positionY.value = xfo.tr.y;
                panner.positionZ.value = xfo.tr.z;
            } else {
                panner.setPosition(xfo.tr.x, xfo.tr.y, xfo.tr.z);
            }

            const dir = xfo.ori.getZaxis();
            if (panner.orientationX) {
                // panner.orientationX.setTargetAtTime(dir.x, audioCtx.currentTime);
                // panner.orientationY.setTargetAtTime(dir.y, audioCtx.currentTime);
                // panner.orientationZ.setTargetAtTime(dir.z, audioCtx.currentTime);
                panner.orientationX.value = dir.x;
                panner.orientationY.value = dir.y;
                panner.orientationZ.value = dir.z;
            } else {
                panner.setOrientation(dir.x, dir.y, dir.z);
            }

            // TODO: 
            // setVelocity()
        }
        updatePannerNodePosition();
        treeItem.globalXfoChanged.connect((changeType) => {
            updatePannerNodePosition();
        });


        audioSource.addedToCollector = true;
        this.__audioItems.push({ treeItem, audioSource, parameterOwner });
    }

    __updateListenerPosition(viewXfo) {
        if(!audioCtx)
            return;
        const listener = audioCtx.listener;
        if(listener.positionX) {
          listener.positionX.value = viewXfo.tr.x;
          listener.positionY.value = viewXfo.tr.y;
          listener.positionZ.value = viewXfo.tr.z;
          // listener.positionX.setValueAtTime(viewXfo.tr.x, audioCtx.currentTime);
          // listener.positionY.setValueAtTime(viewXfo.tr.y, audioCtx.currentTime);
          // listener.positionZ.setValueAtTime(viewXfo.tr.z, audioCtx.currentTime);
        } else {
            listener.setPosition(viewXfo.tr.x, viewXfo.tr.y, viewXfo.tr.z);
        }

        const up = viewXfo.ori.getYaxis();
        const fw = viewXfo.ori.getZaxis().negate();
        if(listener.upX) {
          // listener.upX.setValueAtTime(up.x, audioCtx.currentTime);
          // listener.upY.setValueAtTime(up.y, audioCtx.currentTime);
          // listener.upZ.setValueAtTime(up.z, audioCtx.currentTime);
          // listener.forwardX.setValueAtTime(fw.x, audioCtx.currentTime);
          // listener.forwardY.setValueAtTime(fw.y, audioCtx.currentTime);
          // listener.forwardZ.setValueAtTime(fw.z, audioCtx.currentTime);
          listener.upX.value = up.x;
          listener.upY.value = up.y;
          listener.upZ.value = up.z;
          listener.forwardX.value = fw.x;
          listener.forwardY.value = fw.y;
          listener.forwardZ.value = fw.z;
        } else {
            listener.setOrientation(fw.x, fw.y, fw.z, up.x, up.y, up.z);
        }
    }


    draw(renderstate) {
        if(this.__audioItems.length ==0)
            return;
        this.__updateListenerPosition(renderstate.viewXfo)
    }
    

};


GLRenderer.registerPass(GLAudioItemsPass, PassType.OVERLAY);

export {
    GLAudioItemsPass,
    audioCtx
};
// export default GLAudioItemsPass;