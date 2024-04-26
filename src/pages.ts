import type { NavGroup } from "./components/nav-list";

const pages: NavGroup[] = [
  {
    title: "Introduction",
    children: [
      {
        title: "Overview",
        path: "/",
      },
      {
        title: "Quick Start",
        path: "/docs/quick-start",
      },
    ],
  },
];

export default pages;
