package com.javanawat.shoppingcard.repository;

import com.javanawat.shoppingcard.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
   // Optional<Product> findById(Long id);
}
