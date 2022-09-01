import { atom } from "recoil";

export const runData = atom({
  key: "runData",
  default: {
    path: [],
    distance: "",
    time: "",
    speed: ""
  }
});
