import SettingHome from "./SettingHome/SettingHome";
import Profile from "./Profile/Profile";
import { ComponentType } from "react";

export declare type SettingContentComponentsType = {
  [key: string]: ComponentType;
}

/* must match with innerHTML in <li> */
export const SettingContentComponents: SettingContentComponentsType = {
  SettingHome: SettingHome,
  Profile: Profile,
}

const variable = 'settingHome';

console.log(SettingContentComponents[variable]);
