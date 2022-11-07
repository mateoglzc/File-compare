import { useState } from 'react';
import md5 from 'md5-hash';
import './App.css';


function App() {

  const [file_one, set_file_one] = useState('')
  const [file_two, set_file_two] = useState('')
  const [hash_algo, set_hash_algo] = useState(false)
  let hashes = [];

  var forge = require('node-forge');
  
  const handleFileRead = (e) => {
    const content = e.target.result;
    var hash;
    if (hash_algo) {
      var md = forge.md.sha256.create();
      md.update(content);
      hash = md.digest().toHex()
    } else {
      hash = md5(content);
    }
    hashes.push(hash);
    if (hashes.length%2 === 0) {
      if (hashes.at(-1) === hashes.at(-2))
      {
        alert("Files are the same!");
      } else {
        alert("Files are different!");
      }
    }
  }

  const handleFileChosen = (file) => {
    let fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  }

  const handleSubmit = (event) => {
    hashes = []
    event.preventDefault();
    handleFileChosen(file_two)
    handleFileChosen(file_one)
  }

  const changeHash = (event) => {
    if (hash_algo) {
      set_hash_algo(false);
    } else {
      set_hash_algo(true);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>

          <div className="input-area">
            <label id='file_one_lable'><b>First File</b></label>
            <input type="file"
                  onChange={(event) => set_file_one(event.target.files[0] || null)}
                  id="file1"
                  name="first_file"
                  required/>
          </div>
          <div className="input-area"> 
            <label id='file_two_lable'><b>Second File</b></label>
            <input type="file"
                  onChange={(event) => set_file_two(event.target.files[0] || null)}
                  id="file2"
                  name="second_file"
                  required/>
          </div>
          <button type="submit">Compare files</button>
        </form>
        <div className='hash-change'>
          <label className='lbl'>Hash Algo: {hash_algo ? "SHA256" : "MD5"}</label>
          <button onClick={changeHash}>Change Hash Algorithm</button>
        </div>
      </header>
    </div>
  );
}

export default App;
