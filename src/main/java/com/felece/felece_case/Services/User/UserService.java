package com.felece.felece_case.Services.User;

import com.felece.felece_case.Models.User.User;
import com.felece.felece_case.Models.User.UserResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface UserService {
    Mono<UserResponse> saveUser(User User);
    Flux<UserResponse> getAllUsers();
    Mono<UserResponse> getUserById(String id);
}
