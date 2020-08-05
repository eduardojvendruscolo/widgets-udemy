import React, { useState } from "react";
import Accordion from "./components/Accordion";
import { useQuery } from "react-query";
import Search from "./components/Search";

const App = () => {
  const fetchItems = () => {
    return fetch("http://jsonplaceholder.typicode.com/posts").then((data) => {
      return data.json();
    });
  };

  const { data } = useQuery("itens-accordion", fetchItems, {
    initialData: [],
    initialStale: true,
  });

  const [activeIndex, setActiveIndex] = useState(null);

  const onTitleClick = (index) => {
    setActiveIndex(index);
  };

  const renderedItems = data.map((item, index) => {
    const active = index === activeIndex ? "active" : "";

    return (
      <React.Fragment key={item.id}>
        <div className={`title  ${active}`} onClick={() => onTitleClick(index)}>
          <i className="dropdown icon"></i>
          {item.title}
        </div>
        <div className={`content ${active}`}>
          <p>{item.content}</p>
        </div>
      </React.Fragment>
    );
  });

  return (
    <div className="ui styled accordion">
      <Search />
    </div>
  );
};

export default App;
