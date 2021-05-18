package com.ex.repository;

import com.ex.model.Request;

import java.util.Collection;

/**
 * Interface Request Repository
 * @param <R> Request Template
 */
public interface IRequestRepo<R> {
    /**
     * Adding new Request
     * @param request input Request
     */
    void addRequest(Request request);

    /**
     * Update a request
     * @param int_id Request custom ID
     * @param approvedBy Request was approvedBy?
     * @param status Request status
     */
    void updateRequest(int int_id, String approvedBy, String status);

    /**
     * Returns all Request
     * @return a Collection of Request
     */
    Collection<R> findAllRequest();

    /**
     * Return all Request based on given username
     * @param username given a username
     * @return a Collection of Request by user
     */
    Collection<R> findRequestByUsername(String username);

    /**
     * Return all Request based on status
     * @param status given a status
     * @return a Collection of Request by status
     */
    Collection<R> findRequestByStatus(String status);
}
