import { getByTitle } from "@testing-library/react";

const Header = () => {
  return (
    <header>
      <div className="title-bar">
        <h1 id="main-title" className="title">
          CDS -
        </h1>
        <div className="main-subtitle">
          <h2 className="title inline-subtitle">Compact Desktop Scraper</h2>
          <p>A work in progress</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
