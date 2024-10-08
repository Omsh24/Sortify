import { Component, useState } from 'react'
import './App.css'
import './components/Sortv.css'
import Bar from './components/Bar'

function App() {
  const [array, setArray] = useState([]);
  const [sortStatus, setSortStatus] = useState({comparing: null, swaping: null, curr : null, done: false});
  const [done, setDone] = useState(2);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const newArr = () => {
      let arr = []
      for(let i=0;i<100;i++){
          let rand = parseInt(Math.random()* 100) + 1;
          arr.push(rand);
      }
      setArray(arr);
      setSortStatus({ comparing: null, swapping: null, curr: null, donr: false });
      setDone(-1);
      console.log(array)
  }

  const sort = async () => {
    let arr = [...array];
    console.log("hello")
    console.log(arr);

    for(let i =0;i<arr.length;i++){
      let min = i;
      for (let j = i + 1; j < arr.length; j++) {
        setDone(0);
        // Highlight the elements being compared
        setSortStatus({ comparing: [i, j], swapping: null, curr: i });
        await sleep(1); // Wait to show comparison

        if (arr[j] < arr[min]) {
          min = j;
        }
      }
      [arr[min], arr[i]] = [arr[i], arr[min]]
      setArray([...arr]);
      setSortStatus({comparing: null, swaping: [i, min], curr: i, done: true})
      await sleep(1);
    }
    setDone(1);
  }

  const mergeSort = async (arr, left, right) => {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    await mergeSort(arr, left, mid);
    await mergeSort(arr, mid + 1, right);

    await merge(arr, left, mid, right);
  };

  const merge = async (arr, left, mid, right) => {
    const temp = [...arr]; 
    let i = left, j = mid + 1, k = left;

    while (i <= mid && j <= right) {
      setSortStatus({ comparing: [i, j], merging: null, curr: i, done:false });
      await sleep(1); 

      if (arr[i] <= arr[j]) {
        temp[k++] = arr[i++];
      } else {
        temp[k++] = arr[j++];
      }
    }

    while (i <= mid) {
      temp[k++] = arr[i++];
    }
    while (j <= right) {
      temp[k++] = arr[j++];
    }

    for (let l = left; l <= right; l++) {
      arr[l] = temp[l];

      setArray([...arr]); 
      setSortStatus({ comparing: null, merging: [left, right], curr: left, done: true });
      await sleep(1); 
    }
  };

  const startMergeSort = async () => {
    setDone(0);
    let arr = [...array]; 
    await mergeSort(arr, 0, arr.length - 1); 
    setDone(1);
  };

  return (
    <div className='container'>
      <h1 className='title'>
        <img src="https://img.icons8.com/?size=100&id=42220&format=png&color=FFA220" className='icon'/>
        Sort
        <span className='title2'>ify</span>
        <img src="https://img.icons8.com/?size=100&id=42345&format=png&color=14FF00" className='icon' />
      </h1>
      <div className='cont'>
        <div className='box'>
            <div className='scale'>
              
              {
                array.map((arr, index) => {

                  let color = 'orange';
                  if(sortStatus && index < sortStatus.curr)
                    color = 'lightgreen'
                  if(sortStatus && sortStatus.done == true)
                    color = 'lightgreen'
                  if(sortStatus.comparing && sortStatus.comparing.includes(index)){
                    color = 'red'
                  }
                  else if (sortStatus.swaping && sortStatus.swaping.includes(index)) {
                    color = 'red'; 
                  }
                  
                  return <Bar key={index} height={arr} color={color} />;
                  
                })
              }
            </div>
        </div>
        <div className='buttons'>
          <button onClick={newArr} className='sort2 generate'>Generate</button>
          <button onClick={sort} className='sort slide_right'>Selection Sort</button>
          <button onClick={startMergeSort} className='sort slide_right'>Merge Sort</button>

          <div className='status'>
            Status: 
            <div>
              {
                done == 2 && 'None'
              }
              {
                done == -1 && 'Unsorted'
              }
              {
                done == 0 && 'Sorting'
              }
              {
                done == 1 && 'Sorted'
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
