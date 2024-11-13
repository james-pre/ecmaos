/**
 * A device is a component that provides a specific functionality to the system interacting with hardware or emulated devices.
 * Devices can represent physical hardware or virtual components, offering a standardized interface for system interactions.
 */

// --- Default Devices ---
import * as AudioDevice from '@ecmaos/device-audio'
import * as BatteryDevice from '@ecmaos/device-battery'
import * as BluetoothDevice from '@ecmaos/device-bluetooth'
import * as GamepadDevice from '@ecmaos/device-gamepad'
import * as GeoDevice from '@ecmaos/device-geo'
import * as GPUDevice from '@ecmaos/device-gpu'
import * as HIDDevice from '@ecmaos/device-hid'
import * as MIDIDevice from '@ecmaos/device-midi'
import * as PresentationDevice from '@ecmaos/device-presentation'
import * as SensorsDevice from '@ecmaos/device-sensors'
import * as SerialDevice from '@ecmaos/device-serial'
import * as USBDevice from '@ecmaos/device-usb'
import * as WebGLDevice from '@ecmaos/device-webgl'

export const DefaultDevices: Record<string, KernelDevice> = {
  audio: AudioDevice,
  battery: BatteryDevice,
  bluetooth: BluetoothDevice,
  gamepad: GamepadDevice,
  geo: GeoDevice,
  gpu: GPUDevice,
  hid: HIDDevice,
  midi: MIDIDevice,
  presentation: PresentationDevice,
  sensors: SensorsDevice,
  serial: SerialDevice,
  usb: USBDevice,
  webgl: WebGLDevice
}

// --- Types ---

import { DeviceDriver } from '@zenfs/core'
import { Kernel } from '#kernel.ts'
import { Terminal } from '#terminal.js'
import { Shell } from '#shell.js'

/**
 * Interface representing a kernel device.
 * This essentially "wraps" one or many zenfs devices
 * and provides metadata and a CLI interface for it.
 */
export interface KernelDevice {
  /** 
   * Package metadata for the device
   */
  pkg: {
    /** Name of the device */
    name: string
    /** Version of the device */
    version: string
    /** Optional description of the device */
    description?: string
    /** Optional author of the device */
    author?: string
    /** Optional homepage URL for the device */
    homepage?: string
  }

  /**
   * Optional CLI handler for the device
   * @param options - CLI options passed to the device
   * @returns Promise resolving to exit code
   */
  cli?(options: KernelDeviceCLIOptions): Promise<number>

  /**
   * Get device drivers supported by this device
   * This allows the device to declare one or many individual devices in /dev
   * @param kernel - Kernel instance
   * @returns Promise resolving to array of device drivers
   */
  getDrivers(kernel: Kernel): Promise<DeviceDriver[]>
}

/**
 * Options passed to device CLI handlers
 */
export interface KernelDeviceCLIOptions {
  /** Process ID of the CLI instance */
  pid: number
  /** Command line arguments */
  args: string[]
  /** Kernel instance */
  kernel: Kernel
  /** Shell instance */
  shell: Shell
  /** Terminal instance */
  terminal: Terminal
}

/**
 * Interface for storing device-specific data
 */
export interface KernelDeviceData {
  /** Key-value store for device data */
  [key: string]: unknown
}
