import { type CDDConfiguration } from "../types/CDDConfiguration";

export class StoreConfigService {
  storeConfig(fromConfig: CDDConfiguration, target: CDDConfiguration): void {
    for (const field in fromConfig) {
      const configItem: unknown = (
        fromConfig as unknown as Record<string, unknown>
      )[field] as string;
      (target as unknown as Record<string, unknown>)[field] = configItem;
    }
  }
}
