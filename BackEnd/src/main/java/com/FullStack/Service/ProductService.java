package com.FullStack.Service;

import com.FullStack.Entity.Product;
import com.FullStack.Repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    ProductRepo productRepo;

    public List<Product> getAllProducts() {

        return productRepo.findAll();
    }

    public List<Product> getOrdersByOrderId(int productid) {
        return productRepo.findByOrderid(productid);
    }

}
