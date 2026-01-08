
const Tabs = () => {
  const tabs = ['photos', 'GIFs', 'videos']
  return (
    <div className="flex gap-10 mt-6 pb-1 justify-evenly border-b border-stone-700">
      {tabs.map((tab, idx) => {
        return <button key={idx}
          className="font-medium text-stone-400 uppercase cursor-pointer hover:text-stone-300 hover:scale-103 ease-in-out">
          {tab}
        </button>
      })}
    </div>
  )
}

export default Tabs