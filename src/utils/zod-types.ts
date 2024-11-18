import zod from 'zod'

export const userSchema = zod.object({
    email: zod.string().transform((val, ctx) => {
        const contains = val.indexOf('@')
        if(contains == -1){
            ctx.addIssue({
                code: zod.ZodIssueCode.custom,
                message: "Enter a proper e-mail."
            })
            return zod.NEVER
        }
        return val
    }),
    confirmPassword: zod.string().min(6),
    password: zod.string().min(6),
    firstName: zod.string().min(3),
    lastName: zod.string().min(3)
})
.refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path:["confirmPassword"]
})

export const LoginSchema = zod.object({
    email: zod.string().transform((val, ctx) => {
        const index = val.indexOf('@')
        if(index == -1){
            ctx.addIssue({
                code: zod.ZodIssueCode.custom,
                message: "Enter a valid email"
            })
            return zod.NEVER
        }
        return val
    }),
    password: zod.string().min(6)
})

export type LoginType = zod.infer<typeof LoginSchema>
export type UserType = zod.infer<typeof userSchema>

