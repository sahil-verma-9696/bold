import { useSelector } from "react-redux";
import { windowMap } from "../../redux/slices/mainSlice";

function Main() {
  const window = useSelector((store) => store.mainPannel.window);
  const Window = windowMap[window];
  return (
    <section className=" h-screen sm:block flex-1 bg-gray-100 dark:bg-black">
      <Window />
    </section>
  );
}

export default Main;
