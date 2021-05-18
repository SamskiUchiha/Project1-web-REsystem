package com.ex;

import com.ex.model.Request;
import com.ex.model.User;
import com.ex.repository.*;
import com.ex.service.RequestService;
import com.ex.service.UserService;
import com.mongodb.MongoClientSettings;
import org.apache.logging.log4j.LogManager;
import org.bson.codecs.configuration.CodecProvider;
import org.bson.codecs.configuration.CodecRegistries;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;

import java.util.HashMap;

public class App extends AbstractApp {
    org.apache.logging.log4j.Logger logger = LogManager.getLogger(Main.class.getName());
    public App() {context = new HashMap<>(); }

    /**
     * Initializing MongoDB connectors
     * - User Service
     * - User Repository
     * - Request Service
     * - Request Repository
     *  Putting each of services and repo into a HashMap
     */
    private void init() {
        logger.info("initializing application");
        MongoConnector connector = new MongoConnector();
        connector.configure( () -> {
            CodecProvider codecProvider = PojoCodecProvider.builder().register("com.ex.model").build();
            CodecRegistry registry = CodecRegistries.fromRegistries(MongoClientSettings.getDefaultCodecRegistry(), CodecRegistries.fromProviders(codecProvider));
            return MongoClientSettings.builder()
                    .applyConnectionString(connector.newConnectionString("mongodb://localhost:27017/company"))
                    .retryWrites(true)
                    .codecRegistry(registry)
                    .build();
        }).createClient();

        IRequestRepo<Request> requestRepo = new RequestRepo(connector);
        RequestService requestService = new RequestService(requestRepo);

        IUserRepo<User> userRepo = new UserRepo(connector);
        UserService userService = new UserService(userRepo);

        context.put("UserService", userService);
        context.put("RequestService", requestService);
        context.put("UserRepo", userRepo);
        context.put("RequestRepo", requestRepo);
    }

    /**
     * Running the init function
     */
    public void run() {
        init();
    }
}
