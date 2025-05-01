import { useSelector } from "react-redux";
import { leftPannels } from "../../redux/slices/leftPannel";
import { LeftPannelHeader } from "../leftPannel/LeftPannelHeader";
import SearchUser from "../leftPannel/SearchUser";

export default function Left() {
  const { pannel } = useSelector((store) => store.leftPannel);
  const Pannels = leftPannels[pannel];

  return (
    <section className="h-screen bg-gray-100 dark:bg-black dark:text-white border-r">
      <LeftPannelHeader />
      <SearchUser />
      <Pannels />
    </section>
  );
}


