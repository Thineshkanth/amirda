package com.FullStack.DTO;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
public class ProductDetailsDTO {
    private int productId;
    private String productName;
    private Date productExpiryDate;
    private int orderId;

    public ProductDetailsDTO(int productId, String productName, Date productExpiryDate,int orderId ){

        this.productId=productId;
        this.productName = productName;
        this.productExpiryDate=productExpiryDate;
        this.orderId=orderId;
    }
}
