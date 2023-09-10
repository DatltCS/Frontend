import React, { useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import './DropdownList.css';



function DropdownListStartPlace({ label, options}) {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [kw, setKw] = useState("");
  const nav = useNavigate();

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const search = (evt) => {
    evt.preventDefault();
    nav(`/?kw=${selectedOption}`)
  } 

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  return (
  
      <div className="custom-dropdown-container" ref={menuRef} onSubmit={search}>
        <div className="custom-dropdown">
          <label className="start-place">{label}</label>
          <div
            className={`custom-dropdown-toggle ${open ? 'active' : 'inactive'}`}
            id="dropdown-basic"
            onClick={() => setOpen(!open)}
          >
            <input
              type="text"
              value={selectedOption} 
              onChange={(event) => {
                const newValue = event.target.value;
                handleOptionSelect(newValue);

              }}
              placeholder={label} name="kw"
              style={{ border: 'none' }}
            />
          </div>

          {open && (
            <div className="custom-dropdown-menu">
              {options.map((option, index) => (
                <div
                  key={index}
                  className="custom-dropdown-item"
                  onClick={() => {
                    handleOptionSelect(option);
                    setOpen(false);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

  );
}

export default DropdownListStartPlace;
