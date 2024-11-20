/**
 * A device is a component that provides a specific functionality to the system interacting with hardware or emulated devices.
 * Devices can represent physical hardware or virtual components, offering a standardized interface for system interactions.
 * 
 * Eventually, devices will be able to be registered dynamically at runtime.
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

import type { KernelDevice } from '@ecmaos/types'

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
