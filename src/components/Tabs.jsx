import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../redux/features/searchSlice";

const Tabs = () => {
  const tabs = ['photos', 'videos', 'GIFs']

  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.search.activeTab);

  return (
    <div className="flex gap-10 mt-6 pb-1 justify-evenly border-b border-stone-700">
      {tabs.map((tab, idx) => {
        return (
          <button
            key={idx}
            className={`font-medium uppercase cursor-pointer hover:text-[#f9b767] hover:scale-103 ease-in-out ${(activeTab === tab) ? 'text-[#f9b767] scale-103' : 'text-stone-400'} transition-all`}
            onClick={() => {
              dispatch(setActiveTab(tab))
            }}>
            {tab}
          </button>
        )
      })}
    </div>
  )
}

export default Tabs