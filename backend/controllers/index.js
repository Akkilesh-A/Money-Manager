import { signIn, signUp,getUserProfile, updateProfile, getUserTags, deleteUserTag, addUserTags } from "./adultControllers.js";

const adultControllers={
    signIn,
    signUp,
    getUserProfile,
    updateProfile,
    getUserTags,
    addUserTags,
    deleteUserTag
}

export {
    adultControllers
}