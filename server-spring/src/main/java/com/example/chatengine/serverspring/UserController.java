package com.example.chatengine.serverspring;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

/**
 * The {@code UserController} class handles user login and signup requests for the Chat Engine application.
 * It interacts with the Chat Engine API to authenticate users and create new user accounts.
 * This class uses Spring's {@code @RestController} annotation to make it a controller
 * handled by Spring MVC. The {@code @RequestMapping} annotations are used to map web requests
 * to the respective method.
 */
@RestController
public class UserController {
    private static String CHAT_ENGINE_PROJECT_ID = "4128f052-a8b8-46be-8304-55cd3f68a578";
    private static String CHAT_ENGINE_PRIVATE_KEY = "7e570db2-e9d6-478e-b781-206bc0271370";

    /**
     * Handles the login request for a user.
     * This method communicates with the Chat Engine API to authenticate the user based on the provided username and secret.
     *
     * @param request A {@code HashMap} containing the username and secret for authentication.
     * @return A {@code ResponseEntity} object containing the response from the Chat Engine API.
     *         The response includes user details if authentication is successful or null with a BAD_REQUEST status if unsuccessful.
     */
    @CrossOrigin
    @RequestMapping(path = "/login", method = RequestMethod.POST)
    public ResponseEntity getLogin(@RequestBody HashMap<String, String> request) {
        HttpURLConnection con = null;
        try {
            // Create GET request
            URL url = new URL("https://api.chatengine.io/users/me");
            con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            // Set headers
            con.setRequestProperty("Content-Type", "application/json");
            con.setRequestProperty("Accept", "application/json");
            con.setRequestProperty("Project-ID", CHAT_ENGINE_PROJECT_ID);
            con.setRequestProperty("User-Name", request.get("username"));
            con.setRequestProperty("User-Secret", request.get("secret"));
            // Generate response String
            StringBuilder responseStr = new StringBuilder();
            try (BufferedReader br = new BufferedReader(
                    new InputStreamReader(con.getInputStream(), "utf-8"))) {
                String responseLine = null;
                while ((responseLine = br.readLine()) != null) {
                    responseStr.append(responseLine.trim());
                }
            }
            // Jsonify + return response
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

    /**
     * Handles the signup request for a new user.
     * This method communicates with the Chat Engine API to create a new user account based on the provided details.
     *
     * @param request A {@code HashMap} containing the user's details such as username, secret, email, first name, and last name.
     * @return A {@code ResponseEntity} object containing the response from the Chat Engine API.
     *         The response includes the newly created user details if the signup is successful or null with a BAD_REQUEST status if unsuccessful.
     */
    @CrossOrigin
    @RequestMapping(path = "/signup", method = RequestMethod.POST)
    public ResponseEntity newSignup(@RequestBody HashMap<String, String> request) {
        HttpURLConnection con = null;
        try {
            // Create POST request
            URL url = new URL("https://api.chatengine.io/users");
            con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            // Set headers
            con.setRequestProperty("Content-Type", "application/json");
            con.setRequestProperty("Accept", "application/json");
            con.setRequestProperty("Private-Key", CHAT_ENGINE_PRIVATE_KEY);
            // Add request body
            con.setDoOutput(true);
            Map<String, String> body = new HashMap<String, String>();
            body.put("username", request.get("username"));
            body.put("secret", request.get("secret"));
            body.put("email", request.get("email"));
            body.put("first_name", request.get("first_name"));
            body.put("last_name", request.get("last_name"));
            String jsonInputString = new JSONObject(body).toString();
            try (OutputStream os = con.getOutputStream()) {
                byte[] input = jsonInputString.getBytes("utf-8");
                os.write(input, 0, input.length);
            }
            // Generate response String
            StringBuilder responseStr = new StringBuilder();
            try (BufferedReader br = new BufferedReader(
                    new InputStreamReader(con.getInputStream(), "utf-8"))) {
                String responseLine = null;
                while ((responseLine = br.readLine()) != null) {
                    responseStr.append(responseLine.trim());
                }
            }
            // Jsonify + return response
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
}
