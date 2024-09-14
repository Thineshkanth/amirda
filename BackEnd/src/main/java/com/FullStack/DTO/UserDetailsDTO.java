package com.FullStack.DTO;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDetailsDTO {
    private int id;
    private String username;
    private String role;

    public UserDetailsDTO(int id, String username, String role ){

        this.id=id;
        this.username = username;
        this.role=role;
    }
}
