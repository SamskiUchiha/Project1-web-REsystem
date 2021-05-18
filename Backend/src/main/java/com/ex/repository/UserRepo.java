package com.ex.repository;

import com.ex.MongoConnector;
import com.ex.model.Request;
import com.ex.model.User;
import com.mongodb.BasicDBObject;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Updates;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static com.mongodb.client.model.Filters.eq;

/**
 * Implements User Repo Interface
 */
public class UserRepo implements IUserRepo {
    private MongoConnector connector;
    private MongoCollection<User> users;

    /**
     * Initialize the User Repo Constructor
     * Connects to User document mongo database
     * @param connector takes in MongoConnector
     */
    public UserRepo(MongoConnector connector) {
        this.connector = connector;
        this.users = this.connector
                .getClient()
                .getDatabase("company")
                .getCollection("user", User.class);
//        User user = new User("Endeavorrrr", "user1", "password", "employee");
//        users.insertOne(new User("Endeavor", "user1", "password", "employee"));
//        users.insertOne(new User("Hawks", "user2", "password", "employee"));
//        users.insertOne(new User("Deku", "user3", "password", "employee"));
//
//        users.insertOne(new User("All Might", "admin", "password", "manager"));
//        users.insertOne(new User("Eraser Head", "admin2", "password", "manager"));

    }

    /**
     * Querying to find a user with given username and Update a user info
     * @param username given a username
     * @param user given a User object
     */
    @Override
    public void updateUser(String username, User user) {
        BasicDBObject newData = new BasicDBObject();
        newData.put("password", user.getPassword());
        newData.put("name", user.getName());

        BasicDBObject updateData = new BasicDBObject();
        updateData.put("$set", newData);

        this.users.updateOne(
                Filters.eq("username", username), Updates.combine(updateData));
    }

    /**
     * Find a user by their username
     * @param username takes in a username
     * @return return a user
     */
    @Override
    public Object findByUsername(String username) {
        return this.users
                .find(eq("username", username))
                .first();
    }

    /**
     * Find all Users
     * @return a collection of users
     */
    @Override
    public Collection<User> findAllUser() {
        FindIterable<User> res = this.users.find();
        return StreamSupport.stream(res.spliterator(), false)
                .collect(Collectors.toList());
    }

    /**
     * Find all users by their title
     * @param title takes in user title
     * @return a collection of Users
     */
    @Override
    public Collection<User> findUserByTitle(String title) {
        List<BasicDBObject> obj = new ArrayList<>();
        obj.add(new BasicDBObject("title", title));

        FindIterable<User> res = this.users.find(obj.get(0));
        return StreamSupport.stream(res.spliterator(), false)
                .collect(Collectors.toList());
    }
}
