package com.felece.felece_case.Services.User;

import com.felece.felece_case.Models.User.User;
import com.felece.felece_case.Models.User.UserResponse;
import com.felece.felece_case.Repo.User.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.Collection;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class UserImpl implements UserService, UserDetailsService {
    private final UserRepo userRepo;
    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(username).block();
        if(user != null) {
            Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
            user.getRoles().forEach(role -> {
                authorities.add(new SimpleGrantedAuthority(role.getName()));
            });
            return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
        }
        else {
            throw new UsernameNotFoundException("Kullanıcı bulunamadı !");
        }
    }

    @Override
    public Flux<UserResponse> saveUser(User newUser) {
        User user = User.builder().username(newUser.getUsername())
                .gender(newUser.getGender())
                .mail(newUser.getMail())
                .name(newUser.getName())
                .password(passwordEncoder.encode(newUser.getPassword()))
                .roles(new ArrayList<>())
                .id(UUID.randomUUID().toString()).build();

        userRepo.save(user).block();

        return getAllUsers();
    }

    @Override
    public Flux<UserResponse> getAllUsers() {
        return userRepo.findAll().map(this::mapToResponse);
    }

    @Override
    public Flux<UserResponse> deleteUserById(String id) {
        userRepo.deleteById(id).block();

        return userRepo.findAll().map(this::mapToResponse);
    }

    private UserResponse mapToResponse(User user) {
        return UserResponse.builder().id(user.getId())
                .name(user.getName())
                .username(user.getUsername())
                .mail(user.getMail())
                .gender(user.getGender())
                .roles(user.getRoles())
                .build();
    }
}
