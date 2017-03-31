import {
    Vec3,
    Color,
    Xfo,
    Signal
} from '../../Math';
import {
    TreeItem,
    Lines,
    GeomItem,
    LinesMaterial,
    FatLinesMaterial
} from '../../SceneTree';

class MarkerpenTool {
    constructor(name) {
        this.__name = name;
        this.__treeItem = new TreeItem(name+'MarkerpenTool');
        this.__strokeCount = 0;

        this.__strokes = {};

        // Stroke Signals
        this.strokeStarted = new Signal();
        this.strokeEnded = new Signal();
        this.strokeSegmentAdded = new Signal();
    }

    getTreeItem(){
        return this.__treeItem;
    }

    startStroke(xfo, color, thickness, id) {
        let lineGeom = new Lines('MarkerpenTool_Stroke'+this.__strokeCount);

        let used = 0;
        let vertexCount = 100;
        lineGeom.setNumVertices(vertexCount);
        lineGeom.setNumSegments(vertexCount-1);
        lineGeom.vertices.setValue(used, xfo.tr);

        lineGeom.lineThickness = thickness;
        let material = new FatLinesMaterial('stroke');
        // let material = new LinesMaterial('stroke');
        // lineGeom.lineThickness = 0;
        material.color = color;

        // TODO: Cristyan, add a guid here...
        let replayMode = true;
        if(!id){
            id = 'Stroke'+this.__strokeCount;
            replayMode = false;
        }

        let geomItem = new GeomItem(id, lineGeom, material);
        this.__treeItem.addChild(geomItem);

        this.__strokeCount++;

        this.__strokes[id] = {
            geomItem,
            used,
            vertexCount,
            replayMode
        };

        if(!replayMode){
            this.strokeStarted.emit({
                type: 'strokeStarted',
                data: {
                    id: id,
                    xfo: xfo.toJSON(),
                    color: color.toJSON(),
                    thickness: thickness
                }
            });
        }
        return id;
    }

    endStroke(id) {

    }

    addSegmentToStroke(id, xfo) {
        let stroke = this.__strokes[id];
        let lineGeom = stroke.geomItem.geom;
        stroke.used++;

        let realloc = false;
        if(stroke.used >= lineGeom.getNumSegments()){
            stroke.vertexCount = stroke.vertexCount + 100;
            lineGeom.setNumVertices(stroke.vertexCount);
            lineGeom.setNumSegments(stroke.vertexCount-1);
            realloc = true;
        }

        lineGeom.vertices.setValue(stroke.used, xfo.tr);
        lineGeom.setSegment(stroke.used-1, stroke.used-1, stroke.used);

        if(realloc){
            lineGeom.geomDataTopologyChanged.emit({'indicesChanged':true});
        }
        else{
            lineGeom.geomDataChanged.emit({'indicesChanged':true});
        }
        lineGeom.__strokeCount = stroke.used;

         
        if(!stroke.replayMode){
            this.strokeSegmentAdded.emit({
                type: 'strokeSegmentAdded',
                data: {
                  id: id,
                  xfo: xfo.toJSON()
                }
            });
        }
    }

    // removeStroke(id) {
    //     let geomItem = this.__treeItem.getChildByName(id);
    //     this.__treeItem.removeChildByHandle(geomItem);
    // }

    // removeSegmentFromStroke(id) {
    //     let stroke = this.__strokes[id];
    //     let lineGeom = stroke.geomItem.geom;
    //     stroke.used--;
    //     lineGeom.setSegment(stroke.used-1, 0, 0);
    //     lineGeom.geomDataChanged.emit({'indicesChanged':true});
    // }

    destroy(){
        this.__treeItem.parentItem.removeChildByHandle(this.__treeItem);
        this.__treeItem = null;
    }
};

export {
    MarkerpenTool
};