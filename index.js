const express = require('express')
const fs=require('fs')
const path=require('path')
const app = express()
const port = 3000



//  1. GET /files - Returns a list of files present in `./files/` directory
//     Response: 200 OK with an array of file names in JSON format.
//     Example: GET http://localhost:3000/files
app.get('/files', (req, res) => {
 
 fs.readdir(path.join(__dirname,'files'), (err, files) => {
  if (err){
    console.log(err);
 res.send('error');
  }
    else {
        let array=[];
    console.log("\nCurrent directory filenames:");
    files.forEach(file => {
      console.log(file);
      array.push(file);
    })
res.status(200).json(array);  
}
})
 
    
})

// 2. GET /file/:filename - Returns content of given file by name
//Description: Use the filename from the request path parameter to read the file from `./files/` directory
//Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
//Example: GET http://localhost:3000/file/example.txt

// app.get('/files/:filename', (req, res) => {
 
//     let filename=req.params.filename
//     let filepath=path.join(__dirname,"files")
//     console.log(filename);
//     let fileread="";
//  fs.readdir(path.join(__dirname,'files'), (err, files) => {
//   if (err){
//     console.log(err);
//  res.send('error');
//   }
//     else {
// files.forEach(file => {
//     console.log("in for each")
//      if(file==filename){
//         console.log("in if statement")
//         fileread=file
//      }
//     })
// fs.readFile(filepath, 'utf8', function(err, data){
      
//     // Display the file content
//     console.log(data);
// });
//     //   let index=  files.findIndex(file=>file==filename)
//     //     if(index==-1){
//     //       res.status(404).send('404 not found');  
//     //     }
//     //     else{
//     //         fs.readFile
//     //     }
// res.send("hey")
//     }
// })   
// })
app.get('/files/:filename', (req, res) => {
 
    let filename=req.params.filename
    //let filepath=path.join(__dirname,"files")
    
  const filesDirectory = path.join(__dirname, 'files');
  const filepath = path.join(filesDirectory, filename);
    console.log(filename);
    let fileread="";
 fs.readdir(path.join(__dirname,'files'), (err, files) => {
  if (err){
    console.log(err);
 res.send('error');
  }
if (files.includes(filename)) {
      fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
        }

        console.log(data); // Display the file content
        res.send(data); // Send the file content as the response
      });
    } else {
      console.log('File not found');
      res.status(404).send('File not found');
    }
 })
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})