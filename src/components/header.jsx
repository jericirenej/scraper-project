import { getByTitle } from "@testing-library/react";

const Header = () => {
  return (
    <header>
      <div className="title-bar">
        <h1 id="main-title" className="title">
          CAS -
        </h1>
        <div className="main-subtitle">
          <h2 className="title inline-subtitle">Compact Adjustable Scraper</h2>
          <p>A work in progress</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
