import React, { useState, useEffect } from 'react';
import './CountriesPage.css';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { Button, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';

const BASE_URL = "https://restcountries.com/v3.1";
const COUNTRIES_PER_PAGE = 20;

interface Country {
    name: {
        common: string;
    };
    flags: {
        png: string;
    };
    capital?: string[];
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
            const response = await fetch(`${BASE_URL}/all`);
            const data = await response.json();
            setCountries(data);
            const capitals = data
                .filter((country: Country) => country.capital && country.capital[0])
                .map((country: Country) => ({ value: country.capital[0], label: country.capital[0] }));
            setFilterableCapitals(capitals);
            setTotalPages(Math.ceil(data.length / COUNTRIES_PER_PAGE));
        };

        fetchCountries();
    }, []);

    useEffect(() => {
        const startIndex = (currentPage - 1) * COUNTRIES_PER_PAGE;
        const endIndex = startIndex + COUNTRIES_PER_PAGE;
        setFilteredCountries(countries.slice(startIndex, endIndex));
    }, [currentPage, countries]);

    const handleSelectChange = (selectedOption: any) => {
        const selectedCapital = selectedOption.value;
        setCapital(selectedCapital);
        const filtered = countries.filter((country: Country) =>
            country.capital && country.capital[0] === selectedCapital
        );
        setFilteredCountries(filtered.slice(0, COUNTRIES_PER_PAGE));
        setTotalPages(Math.ceil(filtered.length / COUNTRIES_PER_PAGE));
        setCurrentPage(1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage => Math.min(currentPage + 1, totalPages));
    };

    const handleReset = () => {
        setCapital(undefined);
        setFilteredCountries(countries.slice(0, COUNTRIES_PER_PAGE));
        setTotalPages(Math.ceil(countries.length / COUNTRIES_PER_PAGE));
        setCurrentPage(1);
    };

    return (
        <div className="countries-page">
            <Typography variant="h4" gutterBottom>
                Countries Page
            </Typography>
            <div className="select-container">
                <Select
                    onChange={handleSelectChange}
                    options={filterableCapitals}
                    placeholder="Select a capital"
                />
            </div>
            <Grid container spacing={2} className="country-list">
                {filteredCountries.map((country, index) => (
                    <Grid item xs={6} sm={4} md={3} key={index}>
                        <Card className="country-card">
                            <CardMedia
                                component="img"
                                image={country.flags.png}
                                alt={`Flag of ${country.name.common}`}
                                className="flag-image"
                            />
                            <CardContent>
                                <Typography variant="subtitle1" component="div">
                                    {country.name.common}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <div className="pagination">
                <Button variant="outlined" onClick={handlePrevPage} disabled={currentPage === 1}>
                    Previous
                </Button>
                <span className="mx-3">{currentPage} / {totalPages}</span>
                <Button variant="outlined" onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </Button>
            </div>
            <div className="button-container">
                <Button variant="contained" onClick={handleReset} color="primary">Reset</Button>
                <Link to="/login">
                    <Button variant="contained" color="secondary">Login</Button>
                </Link>
            </div>
        </div>
    );
};

export default CountriesPage;
