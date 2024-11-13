/**
 * These memory methods may not follow what you're used to when it comes to memory management,
 * and are mainly to be used for niche use-cases and experiments.
 *
 * A heap address holds an arbitrary amount of bytes, and is used to index a Uint8Array.
 * Using ArrayBuffers and DataViews is a more robust method of handling memory.
 *
 * @example
 * # Heap
 * const address = kernel.memory.allocate(1024);
 * kernel.memory.write(address, new Uint8Array(1024).fill(1));
 * const value = kernel.memory.read(address)
 *
 * # Stack
 * kernel.memory.push(value)
 * console.log(kernel.memory.peek())
 * kernel.memory.pop()
 *
 */

export class Memory {
  config: Config
  collection: Collection
  heap: Heap
  stack: Stack

  private _memory: {
    config: Config
    collection: Collection
    heap: Heap
    stack: Stack
  }

  constructor() {
    this._memory = {
      config: new Map<string, unknown>(),
      collection: new Set(),
      heap: new Map<Address, Uint8Array>(),
      stack: new Array<StackFrame>()
    }

    this.config = this._memory.config
    this.collection = this._memory.collection
    this.heap = this._memory.heap
    this.stack = this._memory.stack

    this.config.set('bootTime', Date.now())
  }

  // Stack
  push(value: StackFrame) {
    this._memory.stack.push(value)
  }

  pop() {
    return this._memory.stack.pop()
  }

  peek() {
    return this._memory.stack[this._memory.stack.length - 1]
  }

  // Heap
  allocate(size: number) {
    const memory = new Uint8Array(size)
    const address = this._memory.heap.size
    this._memory.heap.set(address, memory)
    return address
  }

  free(address: Address) {
    this._memory.heap.delete(address)
  }

  read(address: Address) {
    return this._memory.heap.get(address)
  }

  write(address: Address, value: Uint8Array) {
    this._memory.heap.set(address, value)
  }

  copy(source: Address, destination: Address) {
    const sourceMemory = this.read(source)
    const destinationMemory = this.read(destination)
    if (sourceMemory && destinationMemory) {
      destinationMemory.set(sourceMemory)
    } else {
      throw new Error('Invalid memory addresses')
    }
  }

  move(source: Address, destination: Address) {
    this.copy(source, destination)
    this.free(source)
  }

  compare(address1: Address, address2: Address) {
    const memory1 = this.read(address1)
    const memory2 = this.read(address2)
    if (memory1 && memory2) {
      return memory1.every((value: number, index: number) => value === memory2[index])
    } else {
      throw new Error('Invalid memory addresses')
    }
  }

  search(value: Uint8Array): number {
    function findPattern(array1: Uint8Array, array2: Uint8Array) {
      for (let i = 0; i <= array1.length - array2.length; i++) {
        let match = true
        for (let j = 0; j < array2.length; j++) {
          if (array1[i + j] !== array2[j]) { match = false; break }
        }

        if (match) return true
      }

      return false
    }

    for (const [address, memory] of this._memory.heap.entries()) {
      if (findPattern(memory, new Uint8Array(value))) return address
    }

    return -1
  }
}

// --- Types ---

export type Address = number
export type Collection<T = unknown> = Set<T>
export type Config<T = unknown> = Map<string, T>
export type Heap<T = Uint8Array> = Map<Address, T>
export type Stack<T = unknown> = Array<StackFrame<T>>
export type StackFrame<T = unknown> = Record<string, T>
