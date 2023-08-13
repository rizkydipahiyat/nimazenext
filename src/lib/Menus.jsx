import {
  RxCalendar,
  RxDoubleArrowUp,
  RxHome,
  RxMagnifyingGlass,
  RxRocket,
} from "react-icons/rx";

const Menus = [
  {
    id: 1,
    path: "/",
    name: "Home",
    icon: <RxHome size={24} />,
  },
  {
    id: 2,
    path: "/search",
    name: "Search",
    icon: <RxMagnifyingGlass size={24} />,
  },
  {
    id: 3,
    path: "/ongoing",
    name: "Ongoing",
    icon: <RxRocket size={24} />,
  },
  {
    id: 4,
    path: "/schedule",
    name: "Schedule",
    icon: <RxCalendar size={24} />,
  },
  {
    id: 5,
    path: "/populer",
    name: "Populer",
    icon: <RxDoubleArrowUp size={24} />,
  },
];

export default Menus;
