package com.springboot.app.entity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
	
	List<User> findByName(String name);
	List<User> findBySurname(String surname);
    List<User> findByEmail(String email);

}
