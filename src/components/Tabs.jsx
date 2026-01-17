import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../redux/features/searchSlice";
import '../style/tab.css'

const Tabs = () => {
  const tabs = ['photos', 'videos', 'gifs']

  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.search.activeTab);

  return (
    <div className="tab">
      {tabs.map((tab, idx) => {
        return (
          <button
            key={idx}
            className={`tab-button ${(activeTab === tab) ? 'activeTab' : ''}`}
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