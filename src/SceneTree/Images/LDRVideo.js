import { Vec4, Color } from '../../Math';
import { Async, Signal } from '../../Utilities';
import { loadBinfile } from '../Utils.js';
import { sgFactory } from '../SGFactory.js';
import { resourceLoader } from '../ResourceLoader.js';
import { SystemDesc } from '../../BrowserDetection.js';

import { BooleanParameter, NumberParameter } from '../Parameters';

import { FileImage } from './FileImage.js';

/** Class representing a LDR video.
 * @extends FileImage
 */
class LDRVideo extends FileImage {
  /**
   * Create a LDR video.
   * @param {any} name - The name value.
   * @param {any} filePath - The filePath value.
   * @param {any} params - The params value.
   */
  constructor(name, filePath, params) {
    super(name, filePath, params);
    this.format = 'RGB';
    this.type = 'UNSIGNED_BYTE';

    this.addParameter(new BooleanParameter('Mute', false));
    this.addParameter(new BooleanParameter('Loop', true));
    this.addParameter(new NumberParameter('Gain', 2.0)).setRange([0, 5]);
    this.addParameter(new BooleanParameter('SpatializeAudio', true));
    this.addParameter(new NumberParameter('refDistance', 2));
    this.addParameter(new NumberParameter('maxDistance', 10000));
    this.addParameter(new NumberParameter('rolloffFactor', 1));
    this.addParameter(new NumberParameter('coneInnerAngle', 360));
    this.addParameter(new NumberParameter('coneOuterAngle', 0));
    this.addParameter(new NumberParameter('coneOuterGain', 1));
  }

  /**
   * The __loadData method.
   * @param {any} fileDesc - The fileDesc param.
   * @private
   */
  __loadData(fileDesc) {
    const ext = this.getParameter('FilePath').getExt();
    resourceLoader.addWork(fileDesc.id, 1);

    const videoElem = document.createElement('video');
    // TODO - confirm its necessary to add to DOM
    videoElem.style.display = 'none';
    videoElem.preload = 'auto';
    videoElem.crossOrigin = 'anonymous';
    // videoElem.crossorigin = true;

    this.getAudioSource = () => {
      return videoElem;
    };

    document.body.appendChild(videoElem);
    videoElem.addEventListener(
      'loadedmetadata',
      () => {
        // videoElem.play();

        const muteParam = this.getParameter('Mute');
        videoElem.muted = muteParam.getValue();
        muteParam.valueChanged.connect(() => {
          videoElem.muted = muteParam.getValue();
        });

        const loopParam = this.getParameter('Loop');
        videoElem.loop = loopParam.getValue();
        loopParam.valueChanged.connect(() => {
          videoElem.loop = loopParam.getValue();
        });

        this.width = videoElem.videoHeight;
        this.height = videoElem.videoWidth;
        this.__data = videoElem;
        this.__loaded = true;
        resourceLoader.addWorkDone(fileDesc.id, 1);
        this.loaded.emit(videoElem);

        let prevFrame = 0;
        const frameRate = 29.97;
        const timerCallback = () => {
          if (videoElem.paused || videoElem.ended) {
            return;
          }
          // Check to see if the video has progressed to the next frame.
          // If so, then we emit and update, which will cause a redraw.
          const currentFrame = Math.floor(videoElem.currentTime * frameRate);
          if (prevFrame != currentFrame) {
            this.updated.emit();
            prevFrame = currentFrame;
          }
          setTimeout(timerCallback, 20); // Sample at 50fps.
        };
        timerCallback();
      },
      false
    );
    videoElem.src = fileDesc.url;
    // videoElem.load();
    const promise = videoElem.play();
    if (promise !== undefined) {
      promise
        .then(_ => {
          console.log('Autoplay started!');
          // Autoplay started!
        })
        .catch(error => {
          console.log('Autoplay was prevented.');
          // Autoplay was prevented.
          // Show a "Play" button so that user can start playback.
        });
    }
  }
}

FileImage.registerLoader('mp4|ogg', LDRVideo);
sgFactory.registerClass('LDRVideo', LDRVideo);

export { LDRVideo };
