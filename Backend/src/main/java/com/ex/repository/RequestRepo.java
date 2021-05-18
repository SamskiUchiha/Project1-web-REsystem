package com.ex.repository;

import com.ex.MongoConnector;
import com.ex.model.Request;
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

/**
 * Implements Interface Request Repo
 */
public class RequestRepo implements IRequestRepo{
    private MongoConnector connector;
    private MongoCollection<Request> request;

    /**
     * Initialize the Request Repo Constructor
     * Connects to request document mongo database
     * @param connector takes in MongoConnector
     */
    public RequestRepo(MongoConnector connector) {
        this.connector = connector;
        this.request = this.connector
                .getClient()
                .getDatabase("company")
                .getCollection("request", Request.class);

//        Request r = new Request("user333333", "School stuffs", 1005.0);
//        this.request.insertOne(new Request("user2", "Car stuffs", 10132.0));
//        this.request.insertOne(new Request("user3", "Hero stuffs", 20400.0));
//        this.request.insertOne(new Request("user2", "School", 131.65));
//        this.request.insertOne(new Request("user3", "Flight Lesson", 3302.0));
//        this.request.insertOne(new Request("user1", "Car Repairs", 200.0));
//        this.request.insertOne(new Request("user1", "Hero Costume Changes", 4000.0));
    }

    /**
     * Update a request
     * @param int_id Request custom ID
     * @param approvedBy Request was approvedBy?
     * @param status Request status
     */
    @Override
    public void updateRequest(int int_id, String approvedBy, String status) {
        BasicDBObject newData = new BasicDBObject();
        newData.put("approvedBy", approvedBy);
        newData.put("status", status);

        BasicDBObject updateData = new BasicDBObject();
        updateData.put("$set", newData);

        this.request.updateOne(
                Filters.eq("int_id", int_id), Updates.combine(updateData));
    }

    /**
     * Return all Request based on given username
     * @param username given a username
     * @return a Collection of Request by user
     */
    @Override
    public Collection<Request> findRequestByUsername(String username) {
        List<BasicDBObject> obj = new ArrayList<>();
        obj.add(new BasicDBObject("username", username));

        FindIterable<Request> res = this.request.find(obj.get(0));
        return StreamSupport.stream(res.spliterator(), false)
                .collect(Collectors.toList());
    }

    /**
     * Return all Request based on status
     * @param status given a status
     * @return a Collection of Request by status
     */
    @Override
    public Collection<Request> findRequestByStatus(String status) {
        List<BasicDBObject> obj = new ArrayList<>();
        obj.add(new BasicDBObject("status", status));

        FindIterable<Request> res = this.request.find(obj.get(0));
        return StreamSupport.stream(res.spliterator(), false)
                .collect(Collectors.toList());
    }

    /**
     * Adding new Request
     * @param request input Request
     */
    @Override
    public void addRequest(Request request) {
        this.request.insertOne(
                new Request(request.getUsername(),
                        request.getMessage(),
                        request.getAmount()));
    }

    /**
     * Returns all Request
     * @return a Collection of Request
     */
    @Override
    public Collection<Request> findAllRequest() {
        FindIterable<Request> res = this.request.find();
        return StreamSupport.stream(res.spliterator(), false)
                .collect(Collectors.toList());
    }

}
