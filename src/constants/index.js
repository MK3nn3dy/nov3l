import {
  dashboard,
  profile,
  info,
  journalPlus,
  flower,
  hearts,
} from "../assets";

// change icon for new script to a page and a plus
// add question mark to link to new page - how to use
// add i in a circle for information - about.

export const navlinks = [
  {
    name: "dashboard",
    imgUrl: dashboard,
    link: "/",
  },
  {
    name: "new script",
    imgUrl: journalPlus,
    link: "/create-campaign",
  },
  {
    name: "profile",
    imgUrl: profile,
    link: "/profile",
  },
  {
    name: "about",
    imgUrl: info,
    link: "/about",
  },
  {
    name: "donate",
    imgUrl: hearts,
    link: "/donate",
  },
];

export const genres = [
  "Action",
  "Adventure",
  "Comedy",
  "Crime",
  "Dark Comedy",
  "Drama",
  "Dystopian",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "Other",
];

export const types = ["Novel", "Novella", "Short Story", "Poem", "Other"];
