import { CDDConfiguration } from "../types/CDDConfiguration";

export function storeConfig(
  fromConfig: CDDConfiguration,
  target: CDDConfiguration
): void {
  for (const field in fromConfig) {
    const configItem: unknown = (
      fromConfig as unknown as Record<string, unknown>
    )[field] as string;
    (target as unknown as Record<string, unknown>)[field] = configItem;
  }
}
