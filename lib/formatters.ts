import { DiscountCodeType } from "@prisma/client";

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
    minimumFractionDigits: 0,
});

export function formatCurrency(amount: number) {
    return CURRENCY_FORMATTER.format(amount);
}

const NUMBER_FORMATTER = new Intl.NumberFormat("es-US");

export function formatNumber(number: number) {
    return NUMBER_FORMATTER.format(number);
}

const PERCENT_FORMATTER = new Intl.NumberFormat("en-US", { style: "percent" });

export function formatDiscountCode({
    discountAmount,
    discountType,
}: {
    discountAmount: number;
    discountType: DiscountCodeType;
}) {
    switch (discountType) {
        case "PERCANTAGE":
            return PERCENT_FORMATTER.format(discountAmount / 100);
        case "FIXED":
            return formatCurrency(discountAmount);
        default:
            throw new Error(
                `Invalid discount code type ${discountType satisfies never}`
            );
    }
}

const DATA_TIME_FORMATTER = Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
});

export function formatDateTime(date: Date) {
    return DATA_TIME_FORMATTER.format(date);
}
