import React, { useEffect, useState } from 'react';

const App = () => {
  const [valueInput, setvalueInput] = useState('');
  const [UpdateInput, setUpdateInput] = useState([]);
  const [arr, setArr] = useState([]);

  const handleAdd = () => {
    setArr([...arr, { taskName: valueInput, priority: 'low' }]);
    setvalueInput('');
    setUpdateInput([...UpdateInput, '']);
  };

  useEffect(() => {
    console.log(arr, 'item');
  }, [arr]);

  function handleRemove(index) {
    const newArr = [...arr];
    newArr.splice(index, 1); // Remove the item at the specified index
    setArr(newArr);
    setUpdateInput(UpdateInput.filter((_, i) => i !== index)); // Remove the corresponding value in UpdateInput
  }

  function handleUpdate(index) {
    const newArrData = [...arr];
    newArrData[index].taskName = UpdateInput[index];
    setArr(newArrData);
  }

  function handleChange(e, index) {
    const newArr = [...UpdateInput];
    newArr[index] = e.target.value;
    setUpdateInput(newArr);
  }

  return (
    <div className="container mt-5">
      <div className="mb-3">
        <input
          value={valueInput}
          onChange={(e) => setvalueInput(e.target.value)}
          className="form-control"
          placeholder="Enter todo"
        />
        <button onClick={handleAdd} className="btn btn-primary mt-2">
          Add Todo
        </button>
      </div>
      {arr.map((item, index) => {
        let colorset = '';
        if (item.priority === 'low') {
          colorset = 'blue';
        } else if (item.priority === 'medium') {
          colorset = 'yellow';
        } else {
          colorset = 'red';
        }
        return (
          <div
            key={index}
            className="d-flex align-items-center mb-3"
            style={{ color: colorset }}
          >
            <h3 className="mr-3">{item.taskName}</h3>
            <select
              value={item.priority}
              onChange={(e) => {
                const newArr = [...arr];
                newArr[index].priority = e.target.value;
                setArr(newArr);
              }}
              className="form-select mr-3"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <input
              value={UpdateInput[index]}
              onChange={(e) => handleChange(e, index)}
              placeholder="update"
              style={{ marginRight: '10px' }}
            />
            <button
              onClick={() => handleUpdate(index)}
              className="btn btn-success mr-3"
            >
              Update
            </button>
            <button
              onClick={() => handleRemove(index)}
              className="btn btn-danger"
            >
              Remove
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default App;
