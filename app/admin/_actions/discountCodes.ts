"use server";

import db from "@/db/db";
import { DiscountCodeType } from "@prisma/client";
import { z } from "zod";

const addSchema = z
    .object({
        code: z.string().min(1),
        discountAmount: z.coerce.number().int().min(1),
        discountType: z.nativeEnum(DiscountCodeType),
        allProducts: z.coerce.boolean(),
        productIds: z.array(z.string()).optional(),
        expiresAt: z.preprocess(
            (value) => (value === "" ? undefined : value),
            z.coerce.date().min(new Date()).optional()
        ),
        limit: z.preprocess(
            (value) => (value === "" ? undefined : value),
            z.coerce.number().int().min(1).optional()
        ),
    })
    .refine(
        (data) =>
            data.discountAmount <= 100 ||
            data.discountType !== DiscountCodeType.PERCANTAGE,
        {
            message: "Discount amount must be less than or equal to 100",
            path: ["discountAmount"],
        }
    )
    .refine((data) => !data.allProducts || data.productIds == null, {
        message: "Cannot select products when all products is selected",
        path: ["productIds"],
    })
    .refine((data) => data.allProducts || data.productIds != null, {
        message: "Must select products when all products is not selected",
        path: ["productIds"],
    });

export async function addDiscountCode(prevState: unknown, formData: FormData) {
    const productIds = formData.getAll("productIds");
    const results = addSchema.safeParse({
        ...Object.fromEntries(formData.entries()),
        productIds: productIds.length < 0 ? productIds : undefined,
    });

    if (results.success === false) return results.error.formErrors.fieldErrors;

    const data = result.data;

    db.discountCode.create({});

    return {};
}
