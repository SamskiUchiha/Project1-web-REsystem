package com.ex.model;

import org.bson.types.ObjectId;

/**
 * Pojo User class
 */
public class User {
    private ObjectId id;
    private String name;
    private String username;
    private String password;
    private String title;

    /**
     * Default constructor for User
     */
    public User() { }

    /**
     * Param constructor for User
     * @param name user's Name
     * @param username user's Username
     * @param password user's Password
     * @param title user's Title
     */
    public User(String name, String username, String password, String title) {
        this.setName(name);
        this.setUsername(username);
        this.setPassword(password);
        this.setTitle(title);
    }

    /**
     * Auto Generated codes..
     */
    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * Auto generated code
     * Converts User data to a formatted string
     * @return a JSON like structure of User Pojo
     */
    @Override
    public String toString() {
        return "User{" +
                "id=" + this.getId() +
                ", name='" + this.getName() + '\'' +
                ", password='" + this.getPassword() + '\'' +
                ", title='" + this.getTitle() + '\'' +
                ", username='" + this.getUsername() + '\'' +
                '}';
    }
}
