# Konttori external camunda module
Konttori push notification sender using camunda.

### Prerequisites
* [Axios](https://www.npmjs.com/package/axios) - ```npm i axios ```

### Environment Variables
Following environment variables are required
```javascript
KONTTORI_APP_ID
KONTTORI_APP_KEY
```

## **Tasks available**

### konttori-send-notification
Sends direct message to application user

```javascript
@param PhoneNumber {String}
@param Sender {String}
@param NotificationTitle {String}
@param NotificationBody {String}
@returns {
  status {String}
}
@throws {
  error {Integer}
  status {String}
  message {String}
}
```

For using error boundary event
  - PhoneNumberNotFound

