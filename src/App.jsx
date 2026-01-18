import ResultGrid from "./components/ResultGrid"
import Searchbar from "./components/Searchbar"
import Tabs from "./components/Tabs"

function App() {

  return (
    <div className='bg-transparent h-screen w-[96%] text-gray-50 mx-auto'>
      <Searchbar />
      <Tabs />
      <ResultGrid />
    </div>
  )
}

export default App
