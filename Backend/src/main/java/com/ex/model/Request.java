package com.ex.model;

import org.bson.types.ObjectId;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

/**
 * Pojo Request Reimbursement class
 */
public class Request {
    private ObjectId id;
    private int int_id;
    private Random rand = new Random();
    private String username;
    private String message;
    private Double amount;
    private String approvedBy = "N/A";
    private String status = "pending";

    Date date = new Date();
    private String strDate;
    SimpleDateFormat formatter = new SimpleDateFormat("dd MMMM yyyy");

    /**
     * Default constructor Request
     */
    public Request() {}

    /**
     * Argument Constructor for Request
     * @param username initialize username
     * @param message initialize message
     * @param amount initialize amount
     */
    public Request(String username, String message, Double amount) {
        this.setInt_id(rand.nextInt(Integer.SIZE - 1));
        this.setUsername(username);
        this.setMessage(message);
        this.setAmount(amount);
        this.setStrDate(formatter.format(date));
    }

    /**
     * Argument Constructor for Request
     * @param username initialize username
     * @param message initialize message
     * @param amount initialize amount
     * @param approvedBy initialize approvedBy
     * @param status initialize status
     */
    public Request(String username, String message, Double amount, String approvedBy, String status) {
        this.setUsername(username);
        this.setMessage(message);
        this.setAmount(amount);
        this.setApprovedBy(approvedBy);
        this.setStatus(status);
    }

    /**
     * Auto Generated codes...
     */
    public int getInt_id() {
        return int_id;
    }

    public void setInt_id(int int_id) {
        this.int_id = int_id;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getApprovedBy() {
        return approvedBy;
    }

    public void setApprovedBy(String approvedBy) {
        this.approvedBy = approvedBy;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStrDate() {
        return strDate;
    }

    public void setStrDate(String strDate) {
        this.strDate = strDate;
    }

    /**
     * Auto generated code
     * Converts User data to a formatted string
     * @return a JSON like structure of User Pojo
     */
    @Override
    public String toString() {
        return "Request{" +
                "id=" + this.getId() +
                ", int_id=" + this.getInt_id() +
                ", username='" + this.getUsername() + '\'' +
                ", message='" + this.getMessage() + '\'' +
                ", amount=" + this.getAmount() +
                ", approvedBy='" + this.getApprovedBy() + '\'' +
                ", status='" + this.getStatus() + '\'' +
                ", strDate='" + this.getStrDate() + '\'' +
                '}';
    }
}

