export type Slot = number;
export type Network = "Mainnet" | "Preview" | "Preprod" | "Custom";
export type UnixTime = number;
export type SlotConfig = {
  zeroTime: UnixTime;
  zeroSlot: Slot;
  slotLength: number; // number of milliseconds.
};


export const SLOT_CONFIG_NETWORK: Record<
  Network,
  SlotConfig
> = {
  Mainnet: { zeroTime: 1596059091000, zeroSlot: 4492800, slotLength: 1000 }, // Starting at Shelley era
  Preview: { zeroTime: 1666656000000, zeroSlot: 0, slotLength: 1000 }, // Starting at Shelley era
  Preprod: {
    zeroTime: 1654041600000 + 1728000000,
    zeroSlot: 86400,
    slotLength: 1000,
  }, // Starting at Shelley era
  /** Customizable slot config (Initialized with 0 values). */
  Custom: { zeroTime: 0, zeroSlot: 0, slotLength: 0 },
};

export function slotToBeginUnixTime(
  slot: Slot,
  slotConfig: SlotConfig,
): UnixTime {
  const msAfterBegin = (slot - slotConfig.zeroSlot) * slotConfig.slotLength;
  return slotConfig.zeroTime + msAfterBegin;
}

export function unixTimeToEnclosingSlot(
  unixTime: UnixTime,
  slotConfig: SlotConfig,
): Slot {
  const timePassed = unixTime - slotConfig.zeroTime;
  const slotsPassed = Math.floor(timePassed / slotConfig.slotLength);
  return slotsPassed + slotConfig.zeroSlot;
}
