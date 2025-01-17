import { EventEmitter } from './EventEmitter'

describe('EventEmitter', () => {
  it('fails when trying to register a callback but no callback was passed.', () => {
    const eventEmitter = new EventEmitter()

    expect(() => {
      eventEmitter.on('fake')
    }).toThrow()
  })

  it("doesn't allow duplication.", () => {
    const eventEmitter = new EventEmitter()

    const cb = () => {}

    expect(() => {
      eventEmitter.on('fake', cb)
      eventEmitter.on('fake', cb)
    }).toThrow()
  })

  it('calls the listener at least once.', () => {
    const eventEmitter = new EventEmitter()

    const mockFn = jest.fn()

    const event = {
      detail: 'foo',
    }

    eventEmitter.on('fake', mockFn)
    eventEmitter.emit('fake', event)

    expect(mockFn).toHaveBeenCalledWith(event)
  })

  it('calls the listener more than once.', () => {
    const eventEmitter = new EventEmitter()

    const mockFn = jest.fn()

    const event = {
      detail: 'foo',
    }

    eventEmitter.on('fake', mockFn)
    eventEmitter.emit('fake', event)
    eventEmitter.emit('fake', event)

    expect(mockFn).toHaveBeenCalledTimes(2)
  })

  it('calls the listener only once.', () => {
    const eventEmitter = new EventEmitter()

    const mockFn = jest.fn()

    const event = {
      detail: 'foo',
    }

    eventEmitter.once('fake', mockFn)
    eventEmitter.emit('fake', event)
    eventEmitter.emit('fake', event)

    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('stops calling the listener.', () => {
    const eventEmitter = new EventEmitter()

    const mockFn = jest.fn()

    const event = {
      detail: 'foo',
    }

    eventEmitter.on('fake', mockFn)
    eventEmitter.emit('fake', event)
    eventEmitter.off('fake', mockFn)
    eventEmitter.emit('fake', event)

    expect(mockFn).toHaveBeenCalledTimes(1)
  })
})
