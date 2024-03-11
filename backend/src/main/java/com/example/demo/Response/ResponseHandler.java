package com.example.demo.Response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class ResponseHandler {
    public static ResponseEntity<Object> responseBuilder(
            int errorCode, HttpStatus httpStatus, Object responseObj
    ) {
        Map<String, Object> response = new HashMap<>();
        response.put("errorCode", errorCode);
        response.put("httpStatus", httpStatus);
        response.put("data", responseObj);
        return new ResponseEntity<>(response, httpStatus);
    }
}
