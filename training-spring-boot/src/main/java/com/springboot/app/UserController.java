package com.springboot.app;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.springboot.app.entity.User;




@RestController
@CrossOrigin(origins = "http://localhost:4200") // Frontend bağlantısını ayarlayın
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;
    
   

    // Kullanıcı oluşturma
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.createUser(user));
    }

    // Tüm kullanıcıları getirme
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // ID ile kullanıcı getirme
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Kullanıcı güncelleme
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        return userService.updateUser(id, updatedUser)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Kullanıcı silme
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (userService.deleteUser(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // İsimle kullanıcıları getirme
    @GetMapping("/by-name")
    public ResponseEntity<List<User>> getUsersByName(@RequestParam String name) {
        return ResponseEntity.ok(userService.getUsersByName(name));
    }

    // Soyisimle kullanıcıları getirme
    @GetMapping("/by-surname")
    public ResponseEntity<List<User>> getUsersBySurname(@RequestParam String surname) {
        return ResponseEntity.ok(userService.getUsersBySurname(surname));
    }

    // Email ile kullanıcıları getirme
    @GetMapping("/by-email")
    public ResponseEntity<List<User>> getUsersByEmail(@RequestParam String email) {
        return ResponseEntity.ok(userService.getUsersByEmail(email));
    }
    
}
