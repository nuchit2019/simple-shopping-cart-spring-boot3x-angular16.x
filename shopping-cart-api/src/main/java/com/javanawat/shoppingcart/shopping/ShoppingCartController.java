package com.javanawat.shoppingcart.shopping;

import com.javanawat.shoppingcart.entity.OrderDetail;
import com.javanawat.shoppingcart.entity.Product;
import com.javanawat.shoppingcart.product.ProductService;
import com.javanawat.shoppingcart.response.MessageRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api")
public class ShoppingCartController {

    String userName = "nuchit";//get UserName by Token
    @Autowired
    private ShoppingCartService shoppingCartService;

    @Autowired
    private ProductService productService;

    @GetMapping("/shoppingCart")
    public ResponseEntity<?> shoppingCart() {

        var orderDetail = shoppingCartService.getOrderDetail("UserName");
        return ResponseEntity.ok().body(orderDetail);
    }

    @PostMapping("/shoppingCart/addProduct")
    public ResponseEntity<OrderDetail> addProductToCart(@RequestBody Product product) {

        OrderDetail order = shoppingCartService.addProduct(product, userName);
        return ResponseEntity.ok(order);
    }

    @DeleteMapping("/shoppingCart/removeProduct/{orderId}")
    public ResponseEntity<?> removeProduct1(@PathVariable Long orderId) {

        shoppingCartService.removeProduct(orderId);
        MessageRes res = new MessageRes();
        res.setMessage("Delete Complete");

        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/shoppingCart/emptyCartByUser")
    public ResponseEntity<?> emptyCartByUser() {

        shoppingCartService.emptyCartByUser(userName);
        MessageRes res = new MessageRes();
        res.setMessage("Delete Card by Username = "+userName+" Complete...");

        return ResponseEntity.ok(res);
    }

    @PostMapping("/shoppingCart/checkout")
    public ResponseEntity<?> checkoutOrderdetail(@RequestBody List<OrderDetail> orderDetails) {

        System.out.println("checkoutOrderdetail ==>> orderDetails="+orderDetails);
        MessageRes res=new MessageRes();
        try {
            shoppingCartService.checkoutOrderdetail(orderDetails);
            res.setMessage("Checkout update Stock Complete...");
        } catch (Exception e) {
            res.setMessage("Checkout update Stock Error: "+e.getMessage());
        }

        return ResponseEntity.ok(res);
    }


}
