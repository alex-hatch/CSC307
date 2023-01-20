import React, {useState, useEffect} from 'react';
import Form from "./Form";
import Table from "./Table";
import axios from 'axios';

function MyApp() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchAll().then(result => {
      if (result) {
        setCharacters(result);
      }
    });
  }, []);

  function removeOneCharacter(index) {
    const updated = characters.filter((_character, i) => {
      return i !== index;
    });
    setCharacters(updated);
  }

  function updateList(person) { 
    makePostCall(person).then( result => {
    if (result && result.status === 200)
       setCharacters([...characters, person] );
    });
  }

  async function fetchAll(){
    try {
       const response = await axios.get('http://localhost:5001/users');
       return response.data.users_list;     
    }
    catch (error){
       //We're not handling errors. Just logging into the console.
       console.log(error); 
       return false;         
    }
 }

 async function makePostCall(person){
  try {
     const response = await axios.post('http://localhost:5001/users', person);
     return response;
  }
  catch (error) {
     console.log(error);
     return false;
  }
}

return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );

}

export default MyApp;

// new branch