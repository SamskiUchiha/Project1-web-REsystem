package com.ex.service;

import com.ex.model.User;
import com.ex.repository.IUserRepo;
import java.util.Collection;

/**
 * User services that implements User Service Interface
 * Converting user repo to usable code
 */
public class UserService implements IUserService<User>{
    private IUserRepo<User> userRepo;

    /**
     * Default constructor
     */
    public UserService() { }

    /**
     * Initializing User Service constructor
     * @param userRepo takes in a repository
     */
    public UserService(IUserRepo<User> userRepo) {
        this.userRepo = userRepo;
    }

    /**
     * Calls findByUsername from user repository
     * @param username takes in a username
     * @return a user
     */
    @Override
    public User findUsername(String username) {
        return this.userRepo.findByUsername(username);
    }

    /**
     * Calls findAllUser from user repository
     * @return a collection of users
     */
    @Override
    public Collection<User> findAllUser() {
        return this.userRepo.findAllUser();
    }

    /**
     * Calls findUserByTitle from user repository
     * @param title takes in a title
     * @return a collection of users
     */
    @Override
    public Collection<User> findUserByTitle(String title) {
        return this.userRepo.findUserByTitle(title);
    }

    /**
     * Calls updateUser from user repository
     * @param username takes in a username
     * @param user takes in a user object
     */
    @Override
    public void updateUser(String username, User user) {
        this.userRepo.updateUser(username, user);
    }
}
