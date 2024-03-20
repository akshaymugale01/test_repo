import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [inputlist, setInputlist] = useState("");
  const [items, setItems] = useState([]);

  const itemEvent = (e) => {
    setInputlist(e.target.value);
  }

  // const handleClick = () => {
  //   console.log("Adding Items");
  //   setItems((previousData) => {
  //     return [...previousData, inputlist];
  //   });
  //   setInputlist("")
  // };

  const handleClick = async () => {
    // Check if inputlist is not empty
    if (inputlist.trim() !== "") {
      try {
        // Make a POST request to the /todos endpoint with the task data
        const response = await axios.post('/test/todos', { task: inputlist });
        console.log('Response from server:', response.data); // Log the response from the server

        // Add the newly created item to the list
        setItems(previousData => [...previousData, response.data]);
        setInputlist("");
      } catch (error) {
        console.error('Error adding task:', error);
        // Handle errors gracefully, e.g., show a notification to the user
      }
    }
  };


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  }


  const handleRemove = async (id) => {
    try {
      // Make delete request to the /todos/:id endpoint
      await axios.delete(`/test/todos/${id}`);

      // Remove task from list
      setItems(previousData => previousData.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error Removing task:', error);
    }
  }


  useEffect(() => {
    //Fetch the list of task when components mounts
    const fetchData = async () => {
      try {
        const response = await axios.get('/test/todos');
        setItems(response.data);
      } catch (error) {
        console.error(`Error fetching task`, error)
      }
    };

    fetchData();
  }, [])


  return (
    <div className="App">
      <div className='centre_div'>
        <br />
        <h1> Todo List - akshaay01 </h1>
        <br />
        <input
          type="text"
          placeholder='Add an Item'
          value={inputlist}
          onChange={itemEvent}
          onKeyPress={handleKeyPress} />
        <button onClick={handleClick}> + </button>
        <ol>
          {items.map((item, index) => (
            <li key={index}>
              {item.task}
              <button className='red' onClick={() => handleRemove(item._id)}>x</button>
            </li>
          ))}
        </ol>


      </div>
    </div>
  );
}

export default App;