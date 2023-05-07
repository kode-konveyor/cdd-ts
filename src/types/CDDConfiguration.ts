export interface CDDConfiguration {
  jsDir: string;
  moduleResolution: "ES" | "esbuild";
  watch: boolean;
  distFiles: string;
  contracts: string;
  debug: boolean;
  numberofTests?: string;
}
