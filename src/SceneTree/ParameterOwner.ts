/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable guard-for-in */
/* eslint-disable valid-jsdoc */
import { EventEmitter } from '../Utilities/EventEmitter'
import { Registry } from '../Registry'
import { BinReader } from './BinReader'

import { ParameterAddedEvent } from '../Utilities/Events/ParameterAddedEvent'
import { ParameterRemovedEvent } from '../Utilities/Events/ParameterRemovedEvent'
import { Parameter } from './Parameters/Parameter'
import { CloneContext } from './CloneContext'
import { AssetLoadContext } from './AssetLoadContext'

/**
 * Class that allows other classes to be parameterized by `Parameter` type of objects.
 * Not only hosting parameters, but their events.
 *
 * @extends {EventEmitter}
 */
class ParameterOwner extends EventEmitter {
  protected paramEventListenerIDs: Record<string, number> = {}
  protected paramMapping: Record<string, number> = {}
  params: Parameter<any>[] = []
  deprecatedParamMapping: Record<string, any> = {}

  /**
   * Creates an instance of ParameterOwner by initializing parameter hosting mappings and events.
   *
   * Every Object has a unique identifier which is based on a counter that is incremented.
   */
  constructor() {
    super()
  }

  /**
   * Returns the number of parameters current object has.
   *
   * @return - Amount of parameters in current object.
   */
  getNumParameters(): number {
    return this.params.length
  }

  /**
   * Returns all the parameters of the object.
   *
   * @return - Parameter List
   */
  getParameters(): Parameter<any>[] {
    return this.params
  }

  /**
   * Returns the index of a parameter in parameter list.
   *
   * @param paramName - Name of the parameter.
   * @return - Position in the array
   */
  getParameterIndex(paramName: string): number {
    return this.paramMapping[paramName]
  }

  /**
   * Returns `Parameter` object in a given index
   *
   * @param index - Position of the parameter in the array
   * @return - Parameter object value
   */
  getParameterByIndex(index: number): Parameter<any> {
    return this.params[index]
  }

  /**
   * Validates if the specified parameter exists in the object.
   *
   * @param paramName - The parameter name.
   * @return - The return value.
   */
  hasParameter(paramName: string): boolean {
    return paramName in this.paramMapping
  }

  /**
   * Add a mapping from one name to a new parameter.
   * This is used to handle migrating parameters to new names.
   *
   * @param key - The parameter name.
   * @param paramName - The parameter name.
   * @return - The return value.
   */
  addParameterDeprecationMapping(key: string, paramName: string): void {
    this.deprecatedParamMapping[key] = paramName
  }

  /**
   * Returns `Parameter` object using the given name
   *
   * @param paramName - The parameter name.
   * @return - Parameter object value
   */
  getParameter(paramName: string): Parameter<any> | null {
    let index = this.paramMapping[paramName]
    if (index == undefined) {
      const newParamName = this.deprecatedParamMapping[paramName]
      if (!newParamName) {
        // TODO: Should this method not return null?
        return null
        // throw Error(`No Parameter with that name exists: ${paramName} `)
      } else {
        console.warn(`Parameter name ${paramName} is now deprecated. Please use ${newParamName} instead.`)
        index = this.paramMapping[newParamName]
      }
    }
    return this.params[index]
  }

  /**
   * This method can be overridden in derived classes
   * to perform general updates (see GLPass or BaseItem).
   * @param event - The event object emitted by the parameter.
   * @private
   */
  protected parameterValueChanged(event: Record<string, unknown>): void {
    this.emit('parameterValueChanged', event)
  }

  /**
   * Adds `Parameter` object to the owner's parameter list.
   *
   * @emits `parameterAdded` with the name of the param.
   * @param param - The parameter to add.
   * @return - With `owner` and `valueChanged` event set.
   */
  addParameter(param: Parameter<any>): Parameter<any> {
    return this.insertParameter(param, this.params.length)
  }

  /**
   * Adds `Parameter` object to the owner's parameter list using the index.
   * It replaces the event in the specified index.
   *
   *
   * @emits `parameterAdded` with the name of the param.
   * @param param - The parameter to insert.
   * @param index - The index value.
   * @return - With `owner` and `valueChanged` event set.
   */
  insertParameter(param: Parameter<any>, index: number): Parameter<any> {
    const name = param.getName()
    if (this.paramMapping[name] != undefined) {
      console.warn('Replacing Parameter:' + name)
      this.removeParameter(name)
    }
    param.setOwner(this)
    this.paramEventListenerIDs[name] = param.on('valueChanged', (event) => {
      // Note: spread operators cause errors on iOS 11.
      const newEvent: Record<string, unknown> = { param }
      for (const key in event) newEvent[key] = event[key]
      this.parameterValueChanged(newEvent)
    })
    this.params.splice(index, 0, param)
    for (let i = index; i < this.params.length; i++) {
      this.paramMapping[this.params[i].getName()] = i
    }
    const event = new ParameterAddedEvent(name)
    this.emit('parameterAdded', event)
    return param
  }

  /**
   * Removes `Parameter` from owner, by using parameter's name.
   * @emits `parameterRemoved` with the name of the param.
   * @param name - The parameter name.
   */
  removeParameter(name: string): void {
    if (this.paramMapping[name] == undefined) {
      throw new Error('Unable to remove Parameter:' + name)
    }
    const index = this.paramMapping[name]
    const param = this.params[this.paramMapping[name]]
    param.off('valueChanged', this.paramEventListenerIDs[name])
    this.params.splice(index, 1)
    delete this.paramMapping[name]
    for (let i = index; i < this.params.length; i++) {
      this.paramMapping[this.params[i].getName()] = i
    }
    const event = new ParameterRemovedEvent(name)
    this.emit('parameterRemoved', event)
  }

  /**
   * Replaces old `Parameter` by passing a new one with the same name.
   *
   * @param param - The parameter to replace.
   * @return - `Parameter` with `valueChanged` event set.
   */
  replaceParameter(param: Parameter<any>): Parameter<any> {
    const name = param.getName()
    if (this.paramMapping[name] == undefined) {
      throw new Error('Unable to replace Parameter:' + name)
    }
    const index = this.paramMapping[name]
    this.removeParameter(name)
    this.insertParameter(param, index)
    return param
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @param context - The context value.
   * @return - Returns the json object.
   */
  toJSON(context?: Record<string, unknown>): Record<string, unknown> {
    const json: Record<string, unknown> = {
      type: this.getClassName(),
    }
    const paramsJSON: Record<string, unknown> = {}
    let savedParams = 0
    for (const param of this.params) {
      if (param.isDrivenByOperator()) continue
      const paramJSON = param.toJSON(context)
      if (paramJSON) {
        paramsJSON[param.getName()] = paramJSON
        savedParams++
      }
    }
    if (savedParams > 0) json.params = paramsJSON
    return json
  }

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @param json - The json object this item must decode.
   * @param context - The context value.
   */
  fromJSON(json: Record<string, any>, context?: Record<string, any>): void {
    if (json.params) {
      for (const key in json.params) {
        const pj = json.params[key]
        const param = this.getParameter(key)
        if (!param) console.warn('Param not found:' + key)
        else {
          if (pj.paramPath) {
            context?.resolvePath(
              pj.paramPath,
              (param: Parameter<any>) => {
                this.replaceParameter(param)
              },
              (): void => {
                console.warn('Unable to resolve shared parameter:' + pj.paramPath)
              }
            )
          } else {
            param.fromJSON(pj, context)
          }
        }
      }
    }
  }

  /**
   * Uses passed in BinReader object(containing an Int32 array with all the parameters) to reconstruct all parameters state.
   *
   * In each iteration of the array, propType and propName are extracted and
   * used to build the right `Parameter` class. Then all of them are added to the object.
   *
   * @emits `parameterAdded` with the name of the param.
   * @param reader - The reader value.
   * @param context - The context value.
   */
  readBinary(reader: BinReader, context: AssetLoadContext): void {
    // TODO: make this work
    if (context?.versions['zea-engine'].compare([0, 0, 3]) >= 0) {
      const numProps = reader.loadUInt32()
      for (let i = 0; i < numProps; i++) {
        const propType = reader.loadStr()
        const propName = reader.loadStr()
        let param = this.getParameter(propName)
        if (!param) {
          param = Registry.constructClass(propType) as Parameter<any>
          if (!param) {
            console.error('Unable to construct prop:' + propName + ' of type:' + propType)
            continue
          }
          param.setName(propName)
          this.addParameter(param)
        }
        param.readBinary(reader, context)
      }
    }
  }

  /**
   * Converts object's JSON value and converts it to a string.
   * @param context
   * @return - String of object's parameter list state.
   */
  toString(context: Record<string, any>): string {
    return JSON.stringify(this.toJSON(), null, 2)
  }

  // ////////////////////////////////////////
  // Clone and Destroy

  /**
   * Copies Parameters from another `ParameterOwner` to current object.
   *
   * @param src - The ParameterOwner copy from.
   * @param context - The context value
   */
  copyFrom(src: ParameterOwner, context?: CloneContext): void {
    // Note: Loop over the parameters in reverse order,
    // this is because often, parameter dependencies
    // are bottom to top (bottom params dependent on higher params).
    // This means that as a parameter is set with a new value
    // it will dirty the params below it.
    let i = src.getNumParameters()
    while (i--) {
      const srcParam = src.getParameterByIndex(i)
      const param = this.getParameter(srcParam.getName())
      if (param) {
        // Note: we are not cloning the values.
        param.copyFrom(srcParam)
      } else {
        this.addParameter(srcParam.clone())
      }
    }
  }
}

export { ParameterOwner }
