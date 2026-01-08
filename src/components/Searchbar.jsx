import { useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from 'react-redux';
import { setQuery } from '../redux/features/searchSlice';

const Searchbar = () => {
  const [input, setInput] = useState('');
  const [cross, setCross] = useState(false);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    let input = e.target.value;
    setCross(input.length > 0 ? true : false);
    setInput(e.target.value);
  }

  const handleCrossClick = () => {
    setCross(false)
    setInput('')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setQuery(input));
    console.log("input: ", input);
    setInput('')
    setCross(false)

  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='mt-2 flex gap-5 justify-center '>
        <div className='flex w-[80%] border border-[#f9b767] rounded text-center px-2'>
          <input
            type='text'
            placeholder='Search...'
            value={input}
            onChange={handleInputChange}
            className='w-full border-none focus:outline-none focus:ring-0 px-2 py-1'
            required />

          {cross && <div
            className='cursor-pointer text-red-500 hover:bg-[#333333] my-1 px-1 rounded-xl content-center'
            onClick={handleCrossClick} >
            <RxCross2 />
          </div>}
        </div>

        <button
          className='bg-stone-300 px-2 py-1 rounded cursor-pointer text-[#1f1414] font-medium'>Search</button>
      </form>
    </div>
  )
}

export default Searchbar