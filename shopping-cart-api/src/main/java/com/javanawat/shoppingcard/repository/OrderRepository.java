package com.javanawat.shoppingcard.repository;

import com.javanawat.shoppingcard.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderRepository extends JpaRepository<OrderDetail, Long> {

    @Modifying
    @Query("DELETE FROM OrderDetail o WHERE o.userName = :userName AND o.status = 'PENDING'")
    void deleteByUserName(@Param("userName") String userName);

}
