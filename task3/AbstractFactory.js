
class PaymentMethod {
    pay(amount) {}
}

class PaymentValidator {
    validate(amount) {}
}

class CreditCardPayment extends PaymentMethod {
    pay(amount) {
        console.log(`Оплачено ${amount} грн кредитною карткою`);
    }
}

class CreditCardValidator extends PaymentValidator {
    validate(amount) {
        return amount > 0 && amount <= 5000;
    }
}

class PayPalPayment extends PaymentMethod {
    pay(amount) {
        console.log(`Оплачено ${amount} грн через PayPal`);
    }
}

class PayPalValidator extends PaymentValidator {
    validate(amount) {
        return amount > 0 && amount <= 10000; 
    }
}

class PaymentFactory {
    createPayment() {}
    createValidator() {}
}

class CreditCardFactory extends PaymentFactory {
    createPayment() {
        return new CreditCardPayment();
    }
    createValidator() {
        return new CreditCardValidator();
    }
}

class PayPalFactory extends PaymentFactory {
    createPayment() {
        return new PayPalPayment();
    }
    createValidator() {
        return new PayPalValidator();
    }
}