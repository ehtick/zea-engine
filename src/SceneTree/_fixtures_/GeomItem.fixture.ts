export default {
  fromJSON: {
    name: 'Item',
    params: {
      BoundingBox: {
        value: {
          p0: {
            x: 2.650390625,
            y: 6.6201171875,
            z: -1.400390625,
          },
          p1: {
            x: 5.3896484375,
            y: 9.3798828125,
            z: 1.400390625,
          },
        },
      },
      GeomMat: {
        value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 4, 8, 0, 1],
      },
      GeomOffsetXfo: {
        value: {
          ori: {
            w: 1,
            x: 0,
            y: 0,
            z: 0,
          },
          tr: {
            x: 2,
            y: 4,
            z: 0,
          },
        },
      },
      Geometry: {
        value: {
          params: {
            Loops: {
              range: [3, 200],
              step: 1,
              value: 12,
            },
            Radius: {
              value: 1.4,
            },
            Sides: {
              range: [3, 200],
              step: 1,
              value: 13,
            },
          },
          type: 'Sphere',
          vertexAttributes: {},
        },
      },
      GlobalXfo: {
        value: {
          ori: {
            w: 1,
            x: 0,
            y: 0,
            z: 0,
          },
          tr: {
            x: 2,
            y: 4,
            z: 0,
          },
        },
      },
      LocalXfo: {
        value: {
          ori: {
            w: 1,
            x: 0,
            y: 0,
            z: 0,
          },
          tr: {
            x: 2,
            y: 4,
            z: 0,
          },
        },
      },
      Material: {
        value: {
          name: 'myMaterial',
          params: {
            BaseColor: {
              value: {
                a: 1,
                b: 0.3607843220233917,
                g: 0.7137255072593689,
                r: 0.3490196168422699,
              },
            },
            Opacity: {
              range: [0, 1],
              value: 1,
            },
          },
          shader: 'SimpleSurfaceShader',
          type: 'Material',
        },
      },
      Visible: {
        value: true,
      },
    },
    type: 'GeomItem',
  },
}
