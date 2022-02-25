// importing required packages
const yargs = require('yargs');
var fs = require('fs');
const readline = require('readline');

// initializing yargs
let command = yargs.argv._[0];

// initializing readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// create file function
function createFile(input){
    fs.readFile('fileNames.json', 'utf-8', function(err, data) {
	if (err){
        throw err
    }else{
        parsedData = JSON.parse(data);
        // for the first new file
        if(parsedData.fileNames.length == 0){
            var myData = {};
            myData.fileNames = [];
            var obj = {
                file:  `${input}.txt`,
                author: 'Shekhar'
            }
            myData.fileNames.push(obj);
            // updating storage file
            fs.writeFileSync("fileNames.json", JSON.stringify(myData), function(err) {
                if (err) throw err;
                }
            );
            // creating actual new file
            fs.writeFileSync(`${input}.txt`, 'You are awesome!', function(err) {
                if (err) throw err;
                }
            );
            console.log('\nFile created successfully\n');
        }
        // from second file onwards
        else{
            var flag = false;
            parsedData.fileNames.forEach(element => {
                if(element.file === `${input}.txt`){
                    flag = true
                }
            });
            if(flag == true){
                console.log('\nSorry the filename already exists, please try again ..\n')
            }else{
                var myData = {};
                myData.fileNames = parsedData.fileNames;
                var obj = {
                    file:  `${input}.txt`,
                    author: 'Shekhar'
                }
                myData.fileNames.push(obj);
                // updating storage file
                fs.writeFileSync("fileNames.json", JSON.stringify(myData), function(err) {
                    if (err) throw err;
                    }
                );
                // creating actual new file
                fs.writeFileSync(`${input}.txt`, 'You are awesome!', function(err) {
                    if (err) throw err;
                    }
                );
                console.log('\nFile created successfully\n');
            }
        }
    }
});
}

//display file names
function displayFileNames(){    
    fs.readFile('fileNames.json', 'utf-8', function(err, data) {
        if (err){
            throw err
        }else{
            parsedData = JSON.parse(data);
            if(parsedData.fileNames.length == 0){
                console.log('Currently no files have been created. Please use create command to create new files .. \n')
            }else{
                console.log(parsedData, '\n');
            }
        }
    });
}

//---------------------------------------------------------------
// main app
//---------------------------------------------------------------

// file to store file names - storage file
const path = './fileNames.json';
try{
    if(fs.existsSync(path)){
        console.log('\nChecking if storage file exists - File found..! \n')
    }else{
        console.log('\nChecking if storage file exists - File not found, creating file now .. \n');
        const entryZero = {
            fileNames: []
        }
        const data = JSON.stringify(entryZero);
        fs.writeFileSync('fileNames.json', data, function(err){
                return console.error(err);
        });
        console.log('Storage file created ..!\n');
    }
} catch(err){
    console.log(err);
}

//dealing with commands
if(command === 'create'){
    console.log('You have chosen to create file \n');
    rl.question('Please enter filename ... \n', (userInput) => {
    if(!userInput.trim()){
        rl.setPrompt('You cannot have blank filename .. \n');
        rl.prompt();
        rl.on('line', (inp) => {
            if(inp.trim()){
                createFile(inp);
                rl.close();
            }else{
                rl.setPrompt('You cannot have blank filename .. \n');
                rl.prompt();
            }
        })
    }else{
        createFile(userInput);
        rl.close();
    }
});
}else if(command === 'display'){
    console.log('You have chosen to display file names \n');
    displayFileNames();
    rl.close();
}else{
    console.log('Please use create or display commands as shown below .. \n');
    console.log('node index <create>/<display> \n');
    rl.close();
}





