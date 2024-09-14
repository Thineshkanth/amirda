package com.FullStack.Service;

import com.FullStack.DTO.LoginRequestDTO;
import com.FullStack.DTO.SignupRequestDTO;
import com.FullStack.DTO.UserDetailsDTO;
import com.FullStack.Entity.User;
import com.FullStack.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;




    private BCryptPasswordEncoder bCryptPasswordEncoder=new BCryptPasswordEncoder();


    //Signup
    public UserDetailsDTO signup(SignupRequestDTO signupRequestDTO) {
        if (userRepo.findByUsername(signupRequestDTO.getUsername())!=null) {
            return null;

        } else {
            User user=new User();
            user.setUsername(signupRequestDTO.getUsername());
            user.setPassword(bCryptPasswordEncoder.encode(signupRequestDTO.getPassword()));
            user.setRole(signupRequestDTO.getRole());
            userRepo.save(user);
            return new UserDetailsDTO(user.getId(),user.getUsername(),user.getRole());

        }
    }


    //Login
    public UserDetailsDTO login(LoginRequestDTO loginRequestDTO){
        User user = userRepo.findByUsername(loginRequestDTO.getUsername());
        if(user==null){
            return null;
        }
        else if (!bCryptPasswordEncoder.matches(loginRequestDTO.getPassword(),user.getPassword())){
            return null;
        }
        else {

            return new UserDetailsDTO(user.getId(),user.getUsername(),user.getRole());

        }
    }

    //Logout
    public ResponseEntity<String> logout(){
        return new ResponseEntity<>("Sucessfully LogOut", HttpStatus.OK);
    }


    //Userupdate
    public  UserDetailsDTO userUpdate( int id,UserDetailsDTO userDetails){


            Optional<User> existinguser = userRepo.findById((long) id);
            if (existinguser.isPresent()) {
                User updateuser = existinguser.get();
                updateuser.setUsername(userDetails.getUsername());
                updateuser.setRole(userDetails.getRole());
                userRepo.save(updateuser);
                return new UserDetailsDTO(userDetails.getId(), userDetails.getUsername(), userDetails.getRole());
            } else {
                throw new RuntimeException("User not found with id: " + id);
            }

    }

    //getuserdetails
    public List<User> getAllUsers() {
            return userRepo.findAll();
        }

        //delete user using id
        public void deleteUser(int id) {
            if (userRepo.existsById((long) id)) {
                userRepo.deleteById((long) id);
            } else {
                throw new RuntimeException("User not found with id: " + id);
            }
        }

}
