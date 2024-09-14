package com.FullStack.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;


@Entity
@Getter
@Setter
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private int orderid;

    private String ordername;

    private Date orderdate;

    private int customerid;
}
