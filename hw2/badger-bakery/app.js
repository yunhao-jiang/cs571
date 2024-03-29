const SALES_TAX = {
	AL:	0.040,
	AK:	0.000,
	AZ:	0.056,
	AR:	0.065,
	CA:	0.073,
	CO:	0.029,
	CT:	0.064,
	DE:	0.000,
	DC:	0.060,
	FL:	0.060,
	GA:	0.040,
	HI:	0.040,
	ID:	0.060,
	IL:	0.063,
	IN:	0.070,
	IA:	0.060,
	KS:	0.065,
	KY:	0.060,
	LA:	0.045,
	ME:	0.055,
	MD:	0.060,
	MA:	0.063,
	MI:	0.060,
	MN:	0.069,
	MS:	0.070,
	MO:	0.042,
	MT:	0.000,
	NE:	0.055,
	NV:	0.069,
	NH:	0.000,
	NJ:	0.066,
	NM:	0.051,
	NY:	0.040,
	NC:	0.048,
	ND:	0.050,
	OH:	0.058,
	OK:	0.045,
	OR:	0.000,
	PA:	0.060,
	RI:	0.070,
	SC:	0.060,
	SD:	0.045,
	TN:	0.070,
	TX:	0.063,
	UT:	0.061,
	VT:	0.060,
	VA:	0.053,
	WA:	0.065,
	WV:	0.060,
	WI:	0.050,
	WY:	0.040,
}

function roundMoney(num) {
	return Math.round(num * 100) / 100;
}

function calculateSubtotal() {
	const bagelQuantity = parseInt(document.getElementById("bagelQuantity").value);
	const bagelPrice = 1.50;
	const donutQuantity = parseInt(document.getElementById("donutQuantity").value);
	const donutPrice = 1.00;
	const muffinQuantity = parseInt(document.getElementById("muffinQuantity").value);
	const muffinPrice = 2.00;
	const pieQuantity = parseInt(document.getElementById("pieQuantity").value);
	const piePrice = 4.50;
	const cakeQuantity = parseInt(document.getElementById("cakeQuantity").value);
	const cakePrice = 7.00;

	return bagelPrice * bagelQuantity + donutPrice * donutQuantity + muffinPrice * muffinQuantity + piePrice * pieQuantity + cakePrice * cakeQuantity
}

function calculateSalesTax() {
	// don't forget to use the SALES_TAX object and roundMoney function!
	const userState = document.getElementById("stateTax").value;
	const stateTax = SALES_TAX[userState]

	return roundMoney(calculateSubtotal()*stateTax)
	// don't forget to return the tax you calculate!
}

document.getElementById("btnSubtotal").addEventListener("click", () => {
	alert("Your subtotal is: $" + calculateSubtotal());
});

document.getElementById("btnSalesTax").addEventListener("click", () => {
	alert("Your sales tax is: $" + calculateSalesTax());
});

document.getElementById("btnCheckout").addEventListener("click", () => {
	alert("Your total is: $" + (calculateSubtotal() + calculateSalesTax()));
});

// add an event listener for the checkout button!
