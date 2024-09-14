package com.FullStack.Repository;

import com.FullStack.Entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepo extends JpaRepository<Orders,Integer> {
    List<Orders> findByCustomerid(int customerId);
}
