fs = require('fs');

// Get an array of all files in the folder: 'accounts' using fs.readdir
fs.readdir('accounts', (error, files) => {
    console.log(files);

});
// Log the contents of the last file in the list to the console using fs.readFile
fs.readFile('accounts/serena_klein', (error, data) => {
    if(error) {
        throw error;
    }
    console.log(data.toString());
});

