package com.ex;

import com.ex.model.Request;
import com.ex.model.User;
import com.ex.service.IRequestService;
import com.ex.service.IUserService;
import io.javalin.Javalin;
import io.javalin.core.util.Header;
import org.apache.logging.log4j.LogManager;

import java.util.logging.Level;
import java.util.logging.Logger;

public class Main {
    /**
     * Main that runs the program
     * setting the mongodb logging off in the console
     * Running Javalin Servlets
     * @param args pass in arguments
     */
    public static void main(String[] args){
        org.apache.logging.log4j.Logger logger = LogManager.getLogger(Main.class.getName());

        Logger mongoLogger = Logger.getLogger( "org.mongodb.driver" );
        mongoLogger.setLevel(Level.OFF);

        App mainApp = new App();
        mainApp.run();

        Javalin app = Javalin.create(config -> {
            config.enableCorsForAllOrigins();
            logger.info("starting a javalin server...");
        }).start(7000);

        IRequestService requestService = (IRequestService) mainApp.getContext().get("RequestService");
        IUserService userService = (IUserService) mainApp.getContext().get("UserService");

//        User user = new User("Deku 2", "user3", "1234", "employee");
//        userService.updateUser("user3", user);

        app.get("/user/all", ctx -> {
            ctx.header(Header.ACCESS_CONTROL_ALLOW_ORIGIN, "*");
            ctx.json(userService.findAllUser());
            logger.info("Requesting get all users from client.");
        });

        app.put("/user/update/:username", ctx -> {
            String username = ctx.pathParam("username");
            User user = ctx.bodyAsClass(User.class);
            user.setUsername(username);
            userService.updateUser(user.getUsername(), user);
            logger.info("Requesting to update a user from client.");
        });

        app.get("/user/:username", ctx -> {
            ctx.header(Header.ACCESS_CONTROL_ALLOW_ORIGIN, "*");
            ctx.json(userService.findUsername(ctx.pathParam("username")));
            logger.info("Requesting get a user from client.");
        });

        app.get("/user/title/:title", ctx -> {
            ctx.header(Header.ACCESS_CONTROL_ALLOW_ORIGIN, "*");
            ctx.json(userService.findUserByTitle(ctx.pathParam("title")));
            logger.info("Requesting get a user by title from client.");
        });

        app.get("/request/all", ctx -> {
            ctx.header(Header.ACCESS_CONTROL_ALLOW_ORIGIN, "*");
            ctx.json(requestService.findAllRequest());
            logger.info("Requesting get all requests from client.");
        });

        app.get("/request/:username", ctx -> {
            ctx.header(Header.ACCESS_CONTROL_ALLOW_ORIGIN, "*");
            ctx.json(requestService.findRequestByUsername(ctx.pathParam("username")));
            logger.info("Requesting get all requests by username from client.");
        });

        app.get("/request/status/:status", ctx -> {
            ctx.header(Header.ACCESS_CONTROL_ALLOW_ORIGIN, "*");
            ctx.json(requestService.findRequestByStatus(ctx.pathParam("status")));
            logger.info("Requesting get all requests by status from client.");
        });

        app.put("/request/add", ctx -> {
            Request request = ctx.bodyAsClass(Request.class);
            requestService.addRequest(new Request(
                    request.getUsername(),
                    request.getMessage(),
                    request.getAmount()));
            ctx.status(204);
            logger.info("Requesting to add a new request from client.");
        });

        app.put("/request/update/:int_id", ctx -> {
            int int_id = Integer.parseInt(ctx.pathParam("int_id"));
            Request request = ctx.bodyAsClass(Request.class);
            request.setInt_id(int_id);
            requestService.updateRequest(
                    request.getInt_id(),
                    request.getApprovedBy(),
                    request.getStatus());
            logger.info("Requesting get to update a request by id from client.");
        });
    }
}
