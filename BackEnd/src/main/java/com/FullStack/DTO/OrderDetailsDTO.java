package com.FullStack.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class OrderDetailsDTO {

    private int orderId;
    private String orderName;
    private Date orderDate;
    private int customerId;

    public OrderDetailsDTO(int orderId, String orderName, Date orderDate,int customerId ){

        this.orderId=orderId;
        this.orderName = orderName;
        this.orderDate=orderDate;
        this.customerId=customerId;
    }
}
