import { signIn, signUp,getData, updateProfile, getUserTags, deleteUserTag, addUserTags } from "./adultControllers.js";

const adultControllers={
    signIn,
    signUp,
    getData,
    updateProfile,
    getUserTags,
    addUserTags,
    deleteUserTag
}

export {
    adultControllers
}