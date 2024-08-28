import { atom } from "recoil";

export const userIdState = atom({
    key: "userIdState",
    default: null,
});

export const callIdState = atom ({
    key: "callIdState",
    default: null,
});
