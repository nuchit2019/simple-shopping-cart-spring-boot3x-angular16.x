package com.javanawat.shoppingcard.shopping.impl;

import com.javanawat.shoppingcard.entity.OrderDetail;
import com.javanawat.shoppingcard.entity.Product;
import com.javanawat.shoppingcard.product.*;
import com.javanawat.shoppingcard.repository.OrderRepository;
import com.javanawat.shoppingcard.repository.ProductRepository;
import com.javanawat.shoppingcard.shopping.ShoppingCartService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShoppingCartServiceImpl implements ShoppingCartService {
    @Autowired
    ProductRepository productRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private ProductService productService;

    public OrderDetail addProduct(Product product, String userName) {

        OrderDetail order = new OrderDetail();
        order.setProduct_id(product.getId());
        order.setName(product.getName());
        order.setQuantity(1);
        order.setPrice(product.getPrice());
        order.setUserName(userName);
        order.setStatus("PENDING");//PENDING, CONFIRM

        return orderRepository.save(order);

    }

    public void removeProduct(Long orderId) {
        orderRepository.deleteById(orderId);

    }

    public List<OrderDetail> getOrderDetail(String userName) {

        return orderRepository.findAll();

    }

    @Transactional
    @Override
    public void emptyCartByUser(String userName) {
        orderRepository.deleteByUserName(userName);
    }

    @Override
    public void checkoutOrderdetail(List<OrderDetail> orderDetails) {
        for (OrderDetail orderDetail : orderDetails) {
            Long productId = orderDetail.getProduct_id();
            int quantity = orderDetail.getQuantity();

            //Update Statue Order...  CONFIRM
            orderDetail.setStatus("CONFIRM");
            orderRepository.save(orderDetail);

            // Update stock in product table
            productService.updateStock(productId, quantity);
        }
    }
}
