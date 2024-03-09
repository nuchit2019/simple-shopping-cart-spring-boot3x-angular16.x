package com.javanawat.shoppingcard.shopping;

import com.javanawat.shoppingcard.entity.OrderDetail;
import com.javanawat.shoppingcard.entity.Product;

import java.util.List;

public interface ShoppingCartService {
    OrderDetail addProduct(Product product,String userName);
    List<OrderDetail> getOrderDetail(String userName);
    void removeProduct(Long orderId);
    void emptyCartByUser(String userName);
    void checkoutOrderdetail(List<OrderDetail> orderDetails);
}
