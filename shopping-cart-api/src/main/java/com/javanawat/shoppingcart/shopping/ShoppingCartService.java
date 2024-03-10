package com.javanawat.shoppingcart.shopping;

import com.javanawat.shoppingcart.entity.OrderDetail;
import com.javanawat.shoppingcart.entity.Product;

import java.util.List;

public interface ShoppingCartService {
    OrderDetail addProduct(Product product,String userName);
    List<OrderDetail> getOrderDetail(String userName);
    void removeProduct(Long orderId);
    void emptyCartByUser(String userName);
    void checkoutOrderdetail(List<OrderDetail> orderDetails);
}
