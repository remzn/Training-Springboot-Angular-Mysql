package com.springboot.app;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.app.entity.User;
import com.springboot.app.entity.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Kullanıcı oluşturma
    public User createUser(User user) {
    	if (user.getRegisterDate() == null) {
            user.setRegisterDate(LocalDateTime.now()); // Tarihi ayarla
        }
        return userRepository.save(user);
    }

    // Tüm kullanıcıları getirme
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ID ile kullanıcı getirme
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Kullanıcı güncelleme
    public Optional<User> updateUser(Long id, User updatedUser) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setName(updatedUser.getName());
                    user.setEmail(updatedUser.getEmail());
                    user.setSurname(updatedUser.getSurname());
                    return userRepository.save(user);
                });
    }

    // Kullanıcı silme
    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // İsimle kullanıcıları getirme
    public List<User> getUsersByName(String name) {
        return userRepository.findByName(name);
    }

    // Soyisimle kullanıcıları getirme
    public List<User> getUsersBySurname(String surname) {
        return userRepository.findBySurname(surname);
    }

    // Email ile kullanıcıları getirme
    public List<User> getUsersByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
