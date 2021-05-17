# Mutko external camunda module
Module to ease creation, amendment and completion of Mutko forms using camunda.

### Prerequisites
* [Axios](https://www.npmjs.com/package/axios) - ```npm i axios ```

### Environment Variables
Following environment variables are required
```javascript
MUTKO_APP_ID
MUTKO_APP_KEY
```

## **Tasks available**
List of available tasks

### mutko-form-create
Creates a new mutko form from template
```javascript
@param TEMPLATEID {Number}
@param RECIPIENT {String}
@param FORMDATA {Object} (Optional)
@param MUTKO_APP_ID {String} (Optional, overrides environment variable)
@param MUTKO_APP_KEY {String} (Optional, overrides environment variable)
Returns {
  FORMURL {String}
  FORMHASH {String}
}
```

### mutko-form-subscribe-submitted
Subscribes to a form submit event for given hash
```javascript
@param FORMHASH {String}
@param MUTKO_APP_ID {String} (Optional, overrides environment variable)
@param MUTKO_APP_KEY {String} (Optional, overrides environment variable)
Returns {
  FORMSUBMIT {JSON}
  FORMSUBMITON {Date}
}
```

### mutko-form-approve
Approves a form
```javascript
@param FORMHASH {String}
@param FORMDATA {Object} (Optional)
@param MUTKO_APP_ID {String} (Optional, overrides environment variable)
@param MUTKO_APP_KEY {String} (Optional, overrides environment variable)
```
