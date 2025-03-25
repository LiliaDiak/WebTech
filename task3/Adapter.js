
class OldPaymentSystem {
    processPaymentLegacy(amount) {
        console.log(`[Legacy] Обробка платежу на ${amount} грн`);
    }
}

class NewPaymentSystem {
    processPayment(amount) {}
}

class PaymentAdapter extends NewPaymentSystem {
    constructor(oldSystem) {
        super();
        this.oldSystem = oldSystem;
    }

    processPayment(amount) {
        this.oldSystem.processPaymentLegacy(amount);
    }
}