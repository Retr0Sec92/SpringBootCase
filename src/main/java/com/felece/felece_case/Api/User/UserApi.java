package com.felece.felece_case.Api.User;

import com.felece.felece_case.Models.User.User;
import com.felece.felece_case.Models.User.UserResponse;
import com.felece.felece_case.Services.User.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserApi {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<Flux<UserResponse>> getUsers() {
        return ResponseEntity.ok().body(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Mono<UserResponse>> getUserById(@PathVariable String id) {
        return ResponseEntity.ok().body(userService.getUserById(id));
    }

    @PostMapping
    public ResponseEntity<Mono<UserResponse>> saveNewUser(@RequestBody User user) {
        return ResponseEntity.ok().body(userService.saveUser(user));
    }
}