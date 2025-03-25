
class OrderPayment {
    constructor(discountStrategy) {
        this.discountStrategy = discountStrategy;
    }

    setDiscountStrategy(discountStrategy) {
        this.discountStrategy = discountStrategy;
    }

    calculateTotal(amount) {
        const discount = this.discountStrategy.calculateDiscount(amount);
        const total = amount - discount;
        console.log(`Сума: ${amount}, Знижка: ${discount}, До сплати: ${total}`);
        return total;
    }
}
class DiscountStrategy {
    calculateDiscount(amount) {}
}


class RegularDiscount extends DiscountStrategy {
    calculateDiscount(amount) {
        return amount * 0.1; 
    }
}

class PremiumDiscount extends DiscountStrategy {
    calculateDiscount(amount) {
        return amount * 0.25;
    }
}

class NoDiscount extends DiscountStrategy {
    calculateDiscount(amount) {
        return 0; 
    }
}