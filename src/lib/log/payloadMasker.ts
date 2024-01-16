import { GenericObj } from "@root/types";

const MASK_LIST: GenericObj<(...args: any[]) => void> = {};

export const maskBody = (body: GenericObj) => {
  const newBody: GenericObj = {};
  Object.keys(body).forEach((key) => {
    newBody[key] = body[key];
    if (typeof body[key] === "object" && !Array.isArray(body[key])) {
      newBody[key] = maskBody(body[key]);
    }
    if (key.toUpperCase() in MASK_LIST) {
      newBody[key] = MASK_LIST[key.toUpperCase()](body[key]);
    }
  });

  return newBody;
};
