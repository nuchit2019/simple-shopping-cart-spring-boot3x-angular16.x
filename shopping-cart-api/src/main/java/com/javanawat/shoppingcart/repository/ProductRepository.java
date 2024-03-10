package com.javanawat.shoppingcart.repository;

import com.javanawat.shoppingcart.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
   // Optional<Product> findById(Long id);
}
