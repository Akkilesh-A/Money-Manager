import { z } from "zod";

const signInBody=z.object({
    email:z.string().email().min(8),
    password:z.string().min(8)
})

export {
    signInBody
}