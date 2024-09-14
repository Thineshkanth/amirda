package com.FullStack.Controller;

import com.FullStack.Entity.Orders;
import com.FullStack.Entity.User;
import com.FullStack.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")

public class OrdersController {

    @Autowired
    OrderService orderService;
    @GetMapping("/orderdetails")
    public ResponseEntity<List<Orders>> getAllOrders()
    {
        List<Orders> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/orderdetails/{customerId}")
    public ResponseEntity<List<Orders>> getOrdersByCustomerId(@PathVariable int customerId) {
        List<Orders> orders = orderService.getOrdersByCustomerId(customerId);
        return ResponseEntity.status(HttpStatus.OK).body(orders);
    }

}
