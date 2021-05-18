package com.ex;

import java.util.HashMap;

/**
 * Centralize data which we can have access to
 */
public abstract class AbstractApp {
    protected HashMap<String, Object> context;

    public HashMap<String, Object> getContext() {
        return context;
    }
}
