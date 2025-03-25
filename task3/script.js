
function createPaymentProcessor(factory) {
    const payment = factory.createPayment();
    const validator = factory.createValidator();
    return { payment, validator };
}
const creditCardProcessor = createPaymentProcessor(new CreditCardFactory());
const payPalProcessor = createPaymentProcessor(new PayPalFactory());
const order = new OrderPayment(new RegularDiscount());
order.calculateTotal(1000);
order.setDiscountStrategy(new PremiumDiscount());
order.calculateTotal(1000);
const oldPayment = new OldPaymentSystem();
const adaptedPayment = new PaymentAdapter(oldPayment);
const amount = 500;
if (creditCardProcessor.validator.validate(amount)) {
    creditCardProcessor.payment.pay(order.calculateTotal(amount));
}

if (payPalProcessor.validator.validate(amount)) {
    payPalProcessor.payment.pay(amount);
}

adaptedPayment.processPayment(amount);