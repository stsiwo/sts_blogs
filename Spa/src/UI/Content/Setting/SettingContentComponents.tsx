import SettingHome from "./SettingHome/SettingHome";
import Profile from "./Profile/Profile";
import { ComponentType } from "react";
import BlogManagement from "./BlogManagement/BlogManagement";

export declare type SettingContentComponentsType = {
  label: string
  component: ComponentType
}

/* must match with innerHTML in <li> */
export const SettingContentComponents: SettingContentComponentsType[] = [ 
  {
    label: 'Home',
    component: SettingHome,
  },
  {
    label: 'Profile',
    component: Profile,
  },
  {
    label: 'Blogs',
    component: BlogManagement,
  },
]
