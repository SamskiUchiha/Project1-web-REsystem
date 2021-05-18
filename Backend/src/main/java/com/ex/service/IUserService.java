package com.ex.service;

import com.ex.model.User;

import java.util.Collection;

public interface IUserService<U> {
    U findUsername(String username);
    Collection<U> findAllUser();
    Collection<U> findUserByTitle(String title);
    void updateUser(String username, User user);
}
