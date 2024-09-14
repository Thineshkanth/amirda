package com.FullStack.Controller;

import com.FullStack.DTO.LoginRequestDTO;
import com.FullStack.DTO.LoginResponseDTO;
import com.FullStack.DTO.SignupRequestDTO;
import com.FullStack.DTO.UserDetailsDTO;
import com.FullStack.Entity.User;
import com.FullStack.Service.UserService;
import com.FullStack.Util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/signup")
    public ResponseEntity<UserDetailsDTO> signup(@RequestBody SignupRequestDTO signupRequestDTO) {

        UserDetailsDTO userDetailsDTO = userService.signup(signupRequestDTO);
        if (userDetailsDTO != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(userDetailsDTO);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(userDetailsDTO);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginRequestDTO) {

        UserDetailsDTO userDetails = userService.login(loginRequestDTO);
        if (userDetails != null) {
            // Return success response with user details
            String jwtToken = jwtUtil.generateToken(userDetails);
            LoginResponseDTO response = new LoginResponseDTO("Login successful", true);
            response.setAccesstoken(jwtToken);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } else {
            // Return error response
            LoginResponseDTO response = new LoginResponseDTO("Invalid credentials", false);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }


    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        return userService.logout();
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDetailsDTO> userUpdate(@PathVariable int id ,@RequestBody UserDetailsDTO userDetais) {

        UserDetailsDTO userDetailsDTO = userService.userUpdate(id,userDetais);
        if (userDetailsDTO != null) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(userDetailsDTO);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(userDetailsDTO);
        }
    }

    //get all users
    @GetMapping("/userDetails")
    public ResponseEntity<List<User>> getAllUsers()
    {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    //delete the user date using id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable int id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

}
