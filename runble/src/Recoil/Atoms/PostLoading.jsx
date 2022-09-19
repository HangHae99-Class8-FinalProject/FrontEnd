import { atom } from "recoil";

export const postLoading = atom({
  key: "postLoading",
  default: {
    isLoading: false
  }
});
