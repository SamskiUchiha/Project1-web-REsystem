package com.ex.service;

import com.ex.model.Request;

import java.util.Collection;

public interface IRequestService<R> {
    void addRequest(Request request);
    void updateRequest(int int_id, String approvedBy, String status);

    Collection<R> findAllRequest();
    Collection<R> findRequestByUsername(String username);
    Collection<R> findRequestByStatus(String status);

}
