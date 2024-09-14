package com.FullStack.Service;

import com.FullStack.Entity.Orders;
import com.FullStack.Repository.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    OrderRepo orderRepo;

    public List<Orders> getAllOrders() {
        System.out.println(orderRepo.findAll());
        return orderRepo.findAll();
    }

    public List<Orders> getOrdersByCustomerId(int customerId) {
        return orderRepo.findByCustomerid(customerId);
    }



}
