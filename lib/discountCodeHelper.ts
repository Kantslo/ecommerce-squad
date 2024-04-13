import { Prisma } from "@prisma/client";

import db from "@/db/db";

export function usableDiscountCodeWhere(productId: string) {
    return {
        isActive: true,
        AND: [
            {
                OR: [
                    { allProducts: true },
                    { products: { some: { id: productId } } },
                ],
            },
            {
                OR: [
                    { limit: null },
                    { limit: { gt: db.discountCode.fields.uses } },
                ],
            },
            {
                OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
            },
        ],
    } satisfies Prisma.DiscountCodeWhereInput;
}
