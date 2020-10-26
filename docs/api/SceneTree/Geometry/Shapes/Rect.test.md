<a name="Tests for `Rect` Class"></a>

### Tests for Rect Class

Use this code to guide yourself on how to implement this class.
```javascript
import { Rect } from './Rect'

describe('Rect', () => {
  it('tests default parameters', () => {
    const rect = new Rect()

    expect(rect.getParameter('X').getValue()).toBe(1.0)
    expect(rect.getParameter('Y').getValue()).toBe(1.0)
  })

  it('sets rectangle size', () => {
    const rect = new Rect()
    rect.getParameter('X').setValue(3)
    rect.getParameter('Y').setValue(4)

    expect(rect.getParameter('X').getValue()).toBe(3)
    expect(rect.getParameter('Y').getValue()).toBe(4)
  })

  it('saves to JSON (serialization).', () => {
    const rect = new Rect(3, 4)
    const outputJSON = rect.toJSON()

    const expectedOutput = {
      params: {
        X: {
          value: 3,
        },
        Y: {
          value: 4,
        },
      },
      type: 'Rect',
      vertexAttributes: {},
    }

    expect(outputJSON).toEqual(expectedOutput)
  })

  it('restores from JSON (serialization).', () => {
    const rect = new Rect()
    const expectedOutput = {
      params: { X: { value: 3 }, Y: { value: 4 } },
      type: 'Rect',
      numVertices: 4,
      vertexAttributes: {},
    }
    rect.fromJSON(expectedOutput)

    expect(rect.toJSON()).toEqual(new Rect(3, 4).toJSON())
  })
})

```