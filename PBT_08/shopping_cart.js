function createCart() {
    let items = [];
    let currentDiscountCode = null;

    return {
        addItem(product, quantity = 1) {
            if (quantity <= 0) return;

            const existingItem = items.find(item => item.id === product.id);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                items.push({
                    ...product,
                    quantity: quantity
                });
            }
        },
        
        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },
        
        updateQuantity(productId, newQuantity) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
                return;
            }
            const item = items.find(item => item.id === productId);
            if (item) {
                item.quantity = newQuantity;
            }
        },
        
        getTotal() {
            const subTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            switch (currentDiscountCode) {
                case "SALE10":
                    return subTotal * 0.9; 
                case "SALE20":
                    return subTotal * 0.8; 
                case "FREESHIP":
                    return Math.max(0, subTotal - 30000); 
                default:
                    return subTotal;
            }
        },
        
        applyDiscount(code) {
            const validCodes = ["SALE10", "SALE20", "FREESHIP"];
            if (validCodes.includes(code)) {
                currentDiscountCode = code;
                console.log(`\n[Hệ thống]: Áp dụng thành công mã giảm giá "${code}".`);
            } else {
                console.log(`\n[Hệ thống]: Mã giảm giá "${code}" không hợp lệ.`);
            }
        },
        
        printCart() {
            console.log("┌" + "─".repeat(60) + "┐");
            console.log(`│ # │ ${"Sản phẩm".padEnd(18)} │ ${"SL".padEnd(2)} │ ${"Đơn giá".padEnd(12)} │ ${"Tổng".padEnd(13)} │`);
            console.log("├" + "─".repeat(60) + "┤");

            items.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                const formattedPrice = item.price.toLocaleString("vi-VN");
                const formattedTotal = itemTotal.toLocaleString("vi-VN");
                
                console.log(
                    `│ ${String(index + 1).padEnd(1)} │ ` +
                    `${item.name.padEnd(18)} │ ` +
                    `${String(item.quantity).padStart(2)} │ ` +
                    `${formattedPrice.padStart(12)} │ ` +
                    `${formattedTotal.padStart(13)} │`
                );
            });

            console.log("├" + "─".repeat(60) + "┤");
            
            if (currentDiscountCode) {
                console.log(`│ Mã giảm giá đã áp dụng: ${currentDiscountCode.padEnd(35)} │`);
            }
            
            const totalText = `Tổng cộng: ${this.getTotal().toLocaleString("vi-VN")}đ`;
            console.log(`│ ${totalText.padStart(58)} │`);
            console.log("└" + "─".repeat(60) + "┘");
        },
        
        getItemCount() {
            return items.reduce((total, item) => total + item.quantity, 0);
        },
        
        clearCart() {
            items = [];
            currentDiscountCode = null;
            console.log("\n[Hệ thống]: Giỏ hàng đã được làm trống.");
        }
    };
}


const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); 

console.log("\n=== GIỎ HÀNG BAN ĐẦU ===");
cart.printCart();

cart.applyDiscount("SALE10");

console.log("\n=== GIỎ HÀNG SAU KHI GIẢM GIÁ ===");
cart.printCart();

console.log("\nTổng số lượng sản phẩm trong giỏ:", cart.getItemCount()); 

cart.removeItem(3); 
console.log("Số lượng sản phẩm trong giỏ sau khi xóa AirPods:", cart.getItemCount());
console.log("\n=== GIỎ HÀNG CUỐI CÙNG ===");
cart.printCart();