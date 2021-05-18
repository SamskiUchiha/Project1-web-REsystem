package com.ex.service;

import com.ex.model.Request;
import com.ex.repository.IRequestRepo;
import java.util.Collection;

/**
 * Request services that implements Request Service Interface
 * Converting Request repo to usable code
 */
public class RequestService implements IRequestService<Request> {
    private IRequestRepo<Request> requestRepo;

    /**
     * Default constructor
     */
    public RequestService() { }

    /**
     * Initializing Request Service constructor
     * @param requestRepo takes in a repository
     */
    public RequestService(IRequestRepo<Request> requestRepo) {
        this.requestRepo = requestRepo;
    }

    /**
     * Calls findRequestByUsername from request repository
     * @param username takes in a username
     * @return a collection of requests
     */
    @Override
    public Collection<Request> findRequestByUsername(String username) {
        return this.requestRepo.findRequestByUsername(username);
    }

    @Override
    public void updateRequest(int int_id, String approvedBy, String status) {
        this.requestRepo.updateRequest(int_id, approvedBy, status);
    }

    @Override
    public void addRequest(Request request) {
        this.requestRepo.addRequest(request);
    }

    @Override
    public Collection<Request> findAllRequest() {
        return this.requestRepo.findAllRequest();
    }

    @Override
    public Collection<Request> findRequestByStatus(String status) {
        return this.requestRepo.findRequestByStatus(status);
    }

}
