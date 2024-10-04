import { z } from "zod";

const signInBody=z.object({
    email:z.string().email().min(8),
    password:z.string().min(8)
})

const signUpBody=z.object({
    name:z.string().min(3),
    email:z.string().email().min(8),
    password:z.string().min(8),
    phoneNumber:z.string().min(10).max(10)
})

export {
    signInBody,
    signUpBody
}