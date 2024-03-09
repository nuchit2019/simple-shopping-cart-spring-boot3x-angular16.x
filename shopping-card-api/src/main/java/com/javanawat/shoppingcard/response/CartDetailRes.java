package com.javanawat.shoppingcard.response;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class CartDetailRes {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer quantity;

}
