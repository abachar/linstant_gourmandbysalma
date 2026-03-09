import type { Component } from "solid-js";

export const PaymentMethodValue: Component<{ value: string }> = ({ value }) => {
	if (value === "Bank") return "Bancaire";
	if (value === "Cash") return "Espèces";
	return value;
};
