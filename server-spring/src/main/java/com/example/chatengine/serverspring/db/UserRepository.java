package com.example.chatengine.serverspring.db;

import com.example.chatengine.serverspring.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
