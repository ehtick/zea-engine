import { BinReader } from '../SceneTree/BinReader'

export interface IBinaryReader {
  /**
   * The readBinary method.
   *
   * @param reader - The reader value.
   * @param context - The context value.
   */
  readBinary(reader: BinReader, context?: Record<string, unknown>): void
}