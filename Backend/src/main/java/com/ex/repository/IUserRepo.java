package com.ex.repository;

import com.ex.model.User;

import java.util.Collection;

/**
 * Interface User Repository
 * @param <U> User Template
 */
public interface IUserRepo<U> {
    /**
     * Find a user by their username
     * @param username takes in a username
     * @return return a user
     */
    U findByUsername(String username);

    /**
     * Find all Users
     * @return a collection of users
     */
    Collection<U> findAllUser();

    /**
     * Find all users by their title
     * @param title takes in user title
     * @return a collection of Users
     */
    Collection<U> findUserByTitle(String title);

    /**
     * Update a user info based on username
     * @param username given a username
     * @param user given a User object
     */
    void updateUser(String username, User user);
}
