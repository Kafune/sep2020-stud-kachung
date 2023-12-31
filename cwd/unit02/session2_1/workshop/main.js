let theErrorReport;

window.onload = function initializeApp() {
  const theForm = document.getElementById("try-out-form");
  theErrorReport = document.getElementById("error-report");
  theErrorReport.hidden = true;

  // The form-validator uses functions to check if a field has valid input.
  // This object defines which checker functions work for which form fields.

  const theFormCheckers = {
    voornaam:   message(hasMaxLength(20),"Lange voornamen passen niet op het vliegticket"),
    achternaam: hasMaxLength(20),  
    postcode:   message(isaPostCode, "Dit moeten vier cijfers, en dan twee letters zijn"),  
    huisnummer: message(isRequired, "Wat jammer dat er geen huisnummer is :-(")
  };
  theForm.addEventListener(
    "submit",
    makeFormValidator(theFormCheckers, handleFormSubmit, handleErrors)
  );
};

function handleFormSubmit() {
  theErrorReport.hidden = true;
  alert(
    "Alle velden zijn prima ingevuld!\nWe kunnen de data naar de server sturen..."
  );
}


// This is a checker function that is used by the validator library.
function isaPostCode(value) {
  value = value.trim();
  // The parameter to the search-method is a "regular expression". They are
  // very useful for finding complex patterns in text. The pattern below is
  // for a Dutch zip code of type 1234 AB.
  // For more info on regular expressions, see Chapter 9 of Eloquent Javascript.
  // A useful tool for visualizeing and testing them is at https://www.debuggex.com/
  const postCodePattern = /^[0-9]{4}\s*[A-Za-z]{2}$/
  const position = value.search(postCodePattern);
  const result = position !== -1; // return value of -1 means the pattern was not found.
  console.log(`Checked postcode «${value}»:`, result);
  return result;
}

function nameLengthChecker(input) {
  if(input.length < 3 || input.length > 20) {
    return false;
  }
  return true;
}

function handleErrors(checkerFailures) {
  theErrorReport.hidden = false;
  const errorList = document.getElementById("error-messages");
  errorList.innerHTML = ""

  checkerFailures.map(([name, failure]) => {
    if (failure !== false) {
      return [name, failure];
    } else {
      return [name, "Dit veld is niet correct ingevuld"];
    }
  }).map(([name, message]) => {
    const messageHtml = `<b>${name}:</b> ` + message;
    return messageHtml;
  }).map(messageHtml => {
    const listItem = document.createElement("li");
    listItem.innerHTML = messageHtml;
    return listItem;
  }).forEach(item => {
    errorList.appendChild(item);
  });
}