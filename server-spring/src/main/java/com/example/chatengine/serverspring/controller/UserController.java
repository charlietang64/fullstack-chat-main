package com.example.chatengine.serverspring.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.chatengine.serverspring.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    private UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @CrossOrigin
    @RequestMapping(path = "/login", method = RequestMethod.POST)
    public ResponseEntity getLogin(@RequestBody HashMap<String, String> request) {
        String username = request.get("username");
        String secret = request.get("secret");
        return service.loginUser(username, secret);
    }

    @CrossOrigin
    @RequestMapping(path = "/signup", method = RequestMethod.POST)
    public ResponseEntity signUpUser(@RequestBody Map<String, String> userData) {
        return service.signUpUser(userData);
    }

    @CrossOrigin
    @GetMapping("/users")
    public List<Map<String, Object>> getAllUsers() {
        return service.getAllUsersFromChatEngine();
    }

    @CrossOrigin
    @DeleteMapping("/users/{userId}")
    public ResponseEntity deleteUser(@PathVariable int userId) {
        ResponseEntity<?> responseEntity = service.deleteUser(userId);
        HttpStatus statusCode = (HttpStatus) responseEntity.getStatusCode();
        if (statusCode == HttpStatus.OK) {
            return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Failed to delete user", statusCode);
        }
    }

    @CrossOrigin
    @PutMapping("/chats/{chatId}/removeUser")
    public ResponseEntity removeUserFromChat(@PathVariable String chatId, @RequestBody Map<String, String> request) {
        String username = request.get("username");
        String userSecret = request.get("userSecret");
        return service.removeUserFromChat(chatId, username, userSecret);
    }
}