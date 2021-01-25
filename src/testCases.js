import { features } from "./constants";

export const selectAllFeatures = features.map((feature) => {
  return { name: feature, disabled: false, checked: true };
});
