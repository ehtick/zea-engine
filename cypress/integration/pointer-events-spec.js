import { createTouchEvents, cyFocusCanvas } from './utils'

describe('pointer-events', () => {
  beforeEach(() => {
    cy.visit('testing-e2e/pointer-events.html')
  })

  it('Mouse Move - Camera Manipulator', () => {
    cyFocusCanvas()
    cy.get('canvas').trigger('mousedown', 100, 230).trigger('mousemove', 250, 230).trigger('mouseup', 250, 230)

    cy.get('canvas').percySnapshot(`MouseMoveCameraManipulator`)
  })

  it('Mouse Enter - Geometry', () => {
    cyFocusCanvas()

    cy.get('canvas').trigger('mousemove', 100, 230).trigger('mousemove', 250, 230)

    cy.get('canvas').percySnapshot(`MouseEnterGeometry`)
  })

  it('Mouse Leave - Geometry', () => {
    cyFocusCanvas()

    cy.get('canvas').trigger('mousemove', 250, 230).trigger('mousemove', 100, 230)

    cy.get('canvas').percySnapshot(`MouseLeaveGeometry`)
  })

  // Note: the following tests constantly fail.
  // I think it may be simply not reliable to test. We also manually test these functions constantly,
  // so I don't think there is much chance of missing a regression here.
  // it('Wheel Zoom In - Camera Manipulator', () => {
  //   cyFocusCanvas()

  //   cy.get('canvas').trigger('wheel', {
  //     deltaX: -0,
  //     deltaY: -1,
  //     deltaZ: 0,
  //   })

  //   cy.get('@postMessage').its('lastCall.args.0').should('equal', `done-moving-camera`)
  //   cy.get('canvas').percySnapshot(`WheelZoomInCameraManipulator`)
  // })

  // it('Wheel Zoom Out - Camera Manipulator', () => {
  //   cyFocusCanvas()

  //   cy.get('canvas').trigger('wheel', {
  //     deltaX: -0,
  //     deltaY: 1,
  //     deltaZ: 0,
  //   })

  //   cy.get('@postMessage').its('lastCall.args.0').should('equal', `done-moving-camera`)
  //   cy.get('canvas').percySnapshot(`WheelZoomOutCameraManipulator`)
  // })

  it('Double Click - Geometry', () => {
    cy.get('canvas').dblclick(800, 300)

    cy.get('canvas').percySnapshot(`DoubleClickGeometry`)
  })

  it('Touch Move - Camera manipulator', () => {
    const eTouchStart = createTouchEvents([600, 600])
    const eTouch = createTouchEvents([550, 600])

    cy.get('canvas')
      .trigger('touchstart', eTouchStart)
      .trigger('touchmove', eTouch)
      .trigger('touchend', eTouch)
      .percySnapshot(`TouchMoveCameraManipulator`)
  })

  it('Double Tap - Geometry', () => {
    const eTouch = createTouchEvents([800, 300])
    cy.get('canvas')
      .trigger('touchstart', eTouch)
      .trigger('touchend', eTouch)
      .trigger('touchstart', eTouch)
      .trigger('touchend', eTouch)

    cy.get('canvas').percySnapshot(`DoubleTapGeometry`)
  })

  it('Touch Zoom In - Camera manipulator', () => {
    const eTouchStart = createTouchEvents([600, 600, 650, 600])
    const eTouch = createTouchEvents([500, 600, 700, 600])

    cy.get('canvas')
      .trigger('touchstart', eTouchStart)
      .trigger('touchmove', eTouch)
      .trigger('touchend', eTouch)
      .percySnapshot(`TouchZoomInCameraManipulator`)
  })

  it('Touch Zoom Out - Camera manipulator', () => {
    const eTouchStart = createTouchEvents([500, 600, 700, 600])
    const eTouch = createTouchEvents([600, 600, 650, 600])

    cy.get('canvas')
      .trigger('touchstart', eTouchStart)
      .trigger('touchmove', eTouch)
      .trigger('touchend', eTouch)
      .percySnapshot(`TouchZoomOutCameraManipulator`)
  })
})

describe('pointer-events-debugGeomShader', () => {
  it('Capture snapshots', () => {
    cy.visit('testing-e2e/pointer-events.html?debugGeomShader')
    cy.get('canvas').percySnapshot('pointer-events')
  })
})
