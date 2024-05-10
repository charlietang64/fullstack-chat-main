package com.example.chatengine.serverspring.services;

import com.example.chatengine.serverspring.db.UserRepository;
import com.example.chatengine.serverspring.model.User;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.*;

@Service
public class UserService {
    private static String CHAT_ENGINE_PROJECT_ID = "8242613e-ac4c-402a-b119-71bc424d4390";
    private static String CHAT_ENGINE_PRIVATE_KEY = "ca4d086e-3945-46ee-9240-8044c885eea3";
    private UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }


    public ResponseEntity loginUser(String username, String secret) {
        HttpURLConnection con = null;
        try {
            // Create GET request to Chat Engine API
            URL url = new URL("https://api.chatengine.io/users/me");
            con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            // Set request headers
            con.setRequestProperty("Content-Type", "application/json");
            con.setRequestProperty("Accept", "application/json");
            con.setRequestProperty("Project-ID", CHAT_ENGINE_PROJECT_ID);
            con.setRequestProperty("User-Name", username);
            con.setRequestProperty("User-Secret", secret);
            // Read response from Chat Engine API
            StringBuilder responseStr = new StringBuilder();
            try (BufferedReader br = new BufferedReader(
                    new InputStreamReader(con.getInputStream(), "utf-8"))) {
                String responseLine;
                while ((responseLine = br.readLine()) != null) {
                    responseStr.append(responseLine.trim());
                }
            }
            // Convert response to JSON and return
            Map<String, Object> response = new Gson().fromJson(
                    responseStr.toString(), new TypeToken<HashMap<String, Object>>() {
                    }.getType());
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } finally {
            if (con != null) {
                con.disconnect();
            }
        }
    }

    public ResponseEntity signUpUser(Map<String, String> userData) {
        HttpURLConnection con = null;
        try {
            String username = userData.get("username");
            if (ifUsernameExists(username)) {
                return new ResponseEntity<>("Username already exists", HttpStatus.BAD_REQUEST);
            }
            // Create POST request to Chat Engine API
            URL url = new URL("https://api.chatengine.io/users");
            con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            // Set request headers
            con.setRequestProperty("Content-Type", "application/json");
            con.setRequestProperty("Accept", "application/json");
            con.setRequestProperty("Private-Key", CHAT_ENGINE_PRIVATE_KEY);
            // Add request body
            con.setDoOutput(true);
            String jsonInputString = new JSONObject(userData).toString();
            try (OutputStream os = con.getOutputStream()) {
                byte[] input = jsonInputString.getBytes("utf-8");
                os.write(input, 0, input.length);
            }
            // Read response from Chat Engine API
            StringBuilder responseStr = new StringBuilder();
            try (BufferedReader br = new BufferedReader(
                    new InputStreamReader(con.getInputStream(), "utf-8"))) {
                String responseLine;
                while ((responseLine = br.readLine()) != null) {
                    responseStr.append(responseLine.trim());
                }
            }
            // Convert response to JSON and return
            Map<String, Object> response = new Gson().fromJson(
                    responseStr.toString(), new TypeToken<HashMap<String, Object>>() {
                    }.getType());

            // Save the user to the repository
            try {
                User newUser = new User();
                newUser.setUsername(userData.get("username"));
                newUser.setSecret(userData.get("secret"));
                newUser.setEmail(userData.get("email"));
                newUser.setFirstName(userData.get("first_name"));
                newUser.setLastName(userData.get("last_name"));

                // Save the user to the repository
                repo.save(newUser);

                return new ResponseEntity<>("User registered successfully", HttpStatus.OK);
            } catch (Exception e) {
                e.printStackTrace();
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } finally {
            if (con != null) {
                con.disconnect();
            }
        }
    }

    public List<Map<String, Object>> getAllUsersFromChatEngine() {
        List<Map<String, Object>> users = new ArrayList<>();
        HttpURLConnection con = null;
        try {
            // Create GET request to Chat Engine API
            URL url = new URL("https://api.chatengine.io/users");
            con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            // Set request headers
            con.setRequestProperty("Content-Type", "application/json");
            con.setRequestProperty("Accept", "application/json");
            con.setRequestProperty("Private-Key", CHAT_ENGINE_PRIVATE_KEY);
            // Read response from Chat Engine API
            StringBuilder responseStr = new StringBuilder();
            try (BufferedReader br = new BufferedReader(
                    new InputStreamReader(con.getInputStream(), "utf-8"))) {
                String responseLine;
                while ((responseLine = br.readLine()) != null) {
                    responseStr.append(responseLine.trim());
                }
            }
            // Convert response to a list of user maps
            users = new Gson().fromJson(
                    responseStr.toString(), new TypeToken<List<Map<String, Object>>>() {}.getType());
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (con != null) {
                con.disconnect();
            }
        }
        return users;
    }

    public ResponseEntity deleteUser(int userId) {
        HttpURLConnection con = null;
        try {
            // Create DELETE request to Chat Engine API
            URL url = new URL("https://api.chatengine.io/users/" + userId);
            con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("DELETE");
            // Set request headers
            con.setRequestProperty("Content-Type", "application/json");
            con.setRequestProperty("Accept", "application/json");
            con.setRequestProperty("PRIVATE-KEY", CHAT_ENGINE_PRIVATE_KEY); // Set private key header
            // Read response from Chat Engine API
            int responseCode = con.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                // If the response code is OK, user deleted successfully
                return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
            } else {
                // If the response code is not OK, handle the error
                return new ResponseEntity<>(null, HttpStatus.valueOf(responseCode));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        } finally {
            if (con != null) {
                con.disconnect();
            }
        }
    }

    public ResponseEntity removeUserFromChat(String chatId, String username, String userSecret) {
        HttpURLConnection con = null;
        try {


            // Create PUT request to remove a Chat Member from the Chat
            URL url = new URL("https://api.chatengine.io/chats/" + chatId + "/people/");
            con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("PUT");
            // Set request headers
            con.setRequestProperty("Content-Type", "application/json");
            con.setRequestProperty("Project-ID", CHAT_ENGINE_PROJECT_ID);
            con.setRequestProperty("User-Name", username);
            con.setRequestProperty("User-Secret", userSecret);
            // Add request body
            con.setDoOutput(true);
            String jsonInputString = "{\"username\": \"" + username + "\"}";
            try (OutputStream os = con.getOutputStream()) {
                byte[] input = jsonInputString.getBytes("utf-8");
                os.write(input, 0, input.length);
            }
            // Read response from Chat Engine API
            StringBuilder responseStr = new StringBuilder();
            try (BufferedReader br = new BufferedReader(
                    new InputStreamReader(con.getInputStream(), "utf-8"))) {
                String responseLine;
                while ((responseLine = br.readLine()) != null) {
                    responseStr.append(responseLine.trim());
                }
            }
            // Convert response to JSON and return
            Map<String, Object> response = new Gson().fromJson(
                    responseStr.toString(), new TypeToken<HashMap<String, Object>>() {
                    }.getType());
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } finally {
            if (con != null) {
                con.disconnect();
            }
        }
    }

    private boolean ifUsernameExists(String username) {
        List<User> allUsers = repo.findAll();
        List<String> existingUsernames = new ArrayList<>();
        for(User user : allUsers) {
            existingUsernames.add(user.getUsername());
        }
        return existingUsernames.contains(username);
    }
}
