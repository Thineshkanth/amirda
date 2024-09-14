package com.FullStack.Controller;

import com.FullStack.Entity.Product;
import com.FullStack.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    ProductService productService;
    @GetMapping("/productdetails")
    public ResponseEntity<List<Product>> getAllProducts()
    {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/productdetails/{orderid}")
    public ResponseEntity<List<Product>> getOrdersByOrderId(@PathVariable int orderid) {
        List<Product> products = productService.getOrdersByOrderId(orderid);
        return ResponseEntity.status(HttpStatus.OK).body(products);
    }
}
