<?php
/**
 * We use HTTP status code to tell client side the response status.
 * For more, visit https://en.wikipedia.org/wiki/List_of_HTTP_status_codes.
 */
$API_CODE=array(
    '200'=>'OK', // tandard response for successful HTTP requests.
    '304'=>'Not Modified', // 
    '400'=>'Bad Request', // The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).
    '401'=>'Not Authorized', // 401 semantically means "unauthenticated", i.e. "you don't have necessary credentials".
    '403'=>'Forbidden', // 403 error semantically means "unauthorized", i.e. "you don't have necessary permissions for the resource".
    '404'=>'Not Found', //The requested resource could not be found but may be available again in the future.
    '405'=>'Method Not Allowed', // A request was made of a resource using a request method not supported by that resource; for example, using GET on a form which requires data to be presented via POST, or using PUT on a read-only resource.
    '429'=>'Too Many Requests', // The user has sent too many requests in a given amount of time. Intended for use with rate limiting schemes.
    '440'=>'Login Timeout', // Indicates that your session has expired.
    '498'=>'Token expired/invalid', // A code of 498 indicates an expired or otherwise invalid token.
    '499'=>'Token required', // A code of 499 indicates that a token is required (if no token was submitted).
    '500'=>'Internal Server Error', // A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.
    '503'=>'Service Unavailable', //The server is currently unavailable (because it is overloaded or down for maintenance).
    '520'=>'Unknown Error', //"The 520 error is essentially a “catch-all” response for when the origin server returns something unexpected or something that is not tolerated/interpreted (protocol violation or empty response)."
);