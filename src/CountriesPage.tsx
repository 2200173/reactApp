// CountriesPage.tsx

import React, { useState, useEffect } from 'react';
import './CountriesPage.css';
import Select from 'react-select';
import { Link } from 'react-router-dom';

const BASE_URL = "https://restcountries.com/v3.1";
const COUNTRIES_PER_PAGE = 10;

interface Country {
    name: {
        common: string;
    };
    flags: {
        png: string;
    };
}

const CountriesPage: React.FC = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [capital, setCapital] = useState<string | undefined>();
    const [filterableCapitals, setFilterableCapitals] = useState<{ value: string, label: string }[]>([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch(`${BASE_URL}/all`);
                const data = await response.json();
                setCountries(data);
   
                const capitals = data
                    .filter((country: Country) => country.capital && country.capital[0])
                    .map((country: Country) => ({ value: country.capital[0], label: country.capital[0] }));
                setFilterableCapitals(capitals);
   
                // Calculate total pages based on number of countries and items per page
                setTotalPages(Math.ceil(data.length / COUNTRIES_PER_PAGE));
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };
   
        fetchCountries();
    }, []);
   
    useEffect(() => {
        // Calculate the index range for the current page
        const startIndex = (currentPage - 1) * COUNTRIES_PER_PAGE;
        const endIndex = startIndex + COUNTRIES_PER_PAGE;
        setFilteredCountries(countries.slice(startIndex, endIndex));
    }, [currentPage, countries]);
   
    const handleSelectChange = (selectedOption: any) => {
        const selectedCapital = selectedOption.value;
        setCapital(selectedCapital);

        if (selectedCapital) {
            const filtered = countries.filter((country: Country) =>
                country.capital && country.capital[0] === selectedCapital
            );
            setFilteredCountries(filtered.slice(0, COUNTRIES_PER_PAGE)); // Reset to first page
            setTotalPages(Math.ceil(filtered.length / COUNTRIES_PER_PAGE)); // Update total pages
        } else {
            setFilteredCountries(countries.slice(0, COUNTRIES_PER_PAGE)); // Reset to first page
            setTotalPages(Math.ceil(countries.length / COUNTRIES_PER_PAGE)); // Update total pages
        }
        setCurrentPage(1); // Reset current page to 1
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage => Math.min(currentPage + 1, totalPages));
    };

    const handleReset = () => {
        setCapital(undefined);
        setFilteredCountries(countries.slice(0, COUNTRIES_PER_PAGE)); // Reset to first page
        setTotalPages(Math.ceil(countries.length / COUNTRIES_PER_PAGE)); // Update total pages
        setCurrentPage(1); // Reset current page to 1
    };
   
    return (
        <div className="countries-page">
            <h1>Countries Page</h1>
            <div className="select-container">
                <Select
                    onChange={handleSelectChange}
                    options={filterableCapitals}
                    placeholder="Select a capital"
                />
            </div>
            <div className="country-list">
                {filteredCountries.map((country, index) => (
                    <div key={index} className="country-card">
                        <h3>{country.name.common}</h3>
                        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} className="flag-image" />
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button className="btn btn-outline-primary" onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                <span className="mx-3">{currentPage} / {totalPages}</span>
                <button className="btn btn-outline-primary" onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
            <div className="button-container">
                <button className="btn btn-primary" onClick={handleReset}>Reset</button>
                <Link to="/login">
                    <button className="btn btn-primary">Login</button>
                </Link>
            </div>
        </div>
    );
};

export default CountriesPage;
