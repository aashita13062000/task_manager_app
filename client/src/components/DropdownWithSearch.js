import React, { useState, useEffect, useRef } from 'react';
import './DropdownWithSearch.css';

const DropdownWithSearch = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Filter options based on the search term
    const filtered = options.filter(option =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Update options based on search
    setFilteredOptions(filtered);
  }, [searchTerm, options]);

  const handleSelectOption = option => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
    // Additional logic you want to perform when an option is selected
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
  };

  const handleButtonClick = () => {
    // Add logic for the button click
    console.log('Button clicked!');
  };

  return (
    <div className="dropdown-container" ref={dropdownRef} onBlur={closeDropdown}>
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedOption || 'Select an option'}
      </div>
      {isDropdownOpen && (
        <div className="dropdown-content" onClick={e => e.stopPropagation()}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="options">
            {filteredOptions.map(option => (
              <div
                key={option}
                className="option"
                onClick={() => handleSelectOption(option)}
              >
                {option}
              </div>
            ))}
          </div>
          <button className="dropdown-button" onClick={handleButtonClick}>
            Click me
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownWithSearch;