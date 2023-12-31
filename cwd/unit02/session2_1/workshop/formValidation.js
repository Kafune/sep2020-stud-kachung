/////////////////////////////////////
//                                 //
//      The validator library      //
//                                 //
/////////////////////////////////////


// makeFormValidator is a function that returns an event handler (a function).
// The returned event handler will use the checkerFunctions as a set of functions to
// validate form fields, and the submitHandler to call if everything is valid.
function makeFormValidator(checkerFunctions, submitHandler, errorReporter) {
  // This function below is the actual form-validator that becomes an event handler
  // for form submissions.
  return function validator(event) {
    // This prevents the browser from sending the form-data to the server and
    // loading the server response as a new HTML page (replacing this one).
    event.preventDefault();

    const theForm = event.target;
    const theErrorReport = document.getElementById("error-report");
    // Like querySelectorAll() and getElementsByClassName(), getElementsByTagName()
    // does not return a proper Array, but something called an HTMLCollection.
    // We can't call forEach, map, filter etc. directly on an HTMLCollection,
    // but after we convert it to a normal array using the Array.from() function,
    // we can call all the cool higher-order functions that are methods of arrays.
    const fieldsCollection = theForm.getElementsByTagName(`input`);
    const fieldsArray = Array.from(fieldsCollection);

    console.log("---");

    const checkValidInput = fieldsArray.filter(inputElement => {
      return checkerFunctions[inputElement.name] !== undefined;
    });
    const isCheckSuccess = checkValidInput.map(inputElement => {
      const fieldName = inputElement.name
      const checker = checkerFunctions[inputElement.name];
      const checkResult = checker(inputElement.value)
      return [fieldName, checkResult];
    });
    const hasFailedChecks = isCheckSuccess.filter(([fName,result]) => result !== true);
    
    if (hasFailedChecks.length == 0) {
      submitHandler(); // Everything checked out OK, call success-callback.
    } else {
      errorReporter( hasFailedChecks );
    }
  };
}

// A checker function that simply checks if there is any input in the field.
function isRequired(value) {
  const result = value.trim() != "";
  console.log(`Checked required field «${value}»:`, result);
  return result;
}

function hasMaxLength(maxLength) {
  return (input) => {
    if(input.length > maxLength) {
      return false;
    }
    return true;
  }
}

function hasMinimumLength(minLength) {
  return (input) => {
    if(input.length < minLength) {
      return false;
    }
    return true;
  }
}

function checkBoth(checker1, checker2) {
  return (input) => {
    return checker1(input) && checker2(input);
  }
}

// const checkAll = (...checkers) => value => checkers.every(check => check(value));
// checkAll(hasMaxLength(29), isRequired, hasMinimumLength(2));

function checkAll(...checkers) {
  return (input) => {
    return checkers.every(check => {
      return check(input);
    })
  }
}

const optional = (checker) => {
  return (input) => {
    return (checker(input) || input.length < 1);
  }
}

// A checker function that simply checks if there is any input in the field.
function isRequired(value) {
  const result = value.trim() != "";
  return result || "Dit veld moet ingevuld worden";
}

const message = (checker, string) => (input) => (!checker(input)) ? string : true;