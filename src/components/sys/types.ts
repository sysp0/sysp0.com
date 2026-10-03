import sysMe from "../../../content/sys-me.json";

export type SysMe = typeof sysMe;
export type Layer = SysMe["layers"][number] & {
  badge?: string;
  architecture?: Architecture;
};
export type Architecture = {
  title: string;
  stages: { name: string; items: string[] }[];
  crossCutting: string[];
};
