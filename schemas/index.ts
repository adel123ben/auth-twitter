import * as z from "zod";

export const RegisterSckemas = z.object({
    name: z.string().min(2, {
        message: "your name is too short!"
    }).max(200, {
        message: "your name is too long!"
    }),
    email: z.string().email({
        message: "invalid email adresse!"
    }),
    password: z.string().min(6, {
        message: "your password need to be mor then (6)"
    })
})


export const LoginSckemas = z.object({
    email: z.string().email({
        message: "invalid email adresse!"
    }),
    
    password: z.string().min(1, {
        message: "password required!"
    })
})