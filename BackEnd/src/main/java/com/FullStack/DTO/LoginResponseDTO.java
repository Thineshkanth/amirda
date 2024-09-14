package com.FullStack.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponseDTO {

    private String message;
    private boolean success;
    private String accesstoken;

    public LoginResponseDTO(String message, boolean success) {
        this.message = message;
        this.success = success;
    }
}

