document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const filterButton = document.getElementById('filter-button');
    const pincodeInput = document.getElementById('pincode');
    const hospitalList = document.querySelector('.hospital-list');

    const API_BASE_URL = 'YOUR_API_BASE_URL'; // Replace with your API base URL

    // Function to fetch hospitals from the API
    async function fetchHospitals(searchQuery = '', pincodeQuery = '') {
        let url = `${API_BASE_URL}/hospitals?`; // Base URL

        if (searchQuery) {
            url += `search=${searchQuery}&`;
        }
        if (pincodeQuery) {
            url += `pincode=${pincodeQuery}&`;
        }

        try {
            const response = await fetch(url);
            const hospitals = await response.json(); // Assuming the API returns JSON

            renderHospitalList(hospitals); // Display the fetched hospitals
        } catch (error) {
            console.error('Error fetching hospitals:', error);
            // Display an error message to the user (e.g., in the hospitalList div)
            hospitalList.innerHTML = '<p>Error loading hospitals. Please try again later.</p>';
        }
    }

    // Function to render hospital list
    function renderHospitalList(hospitals) {
        hospitalList.innerHTML = ''; // Clear existing list

        hospitals.forEach(hospital => {
            const hospitalCard = document.createElement('div');
            hospitalCard.classList.add('hospital-card');
            hospitalCard.dataset.pincode = hospital.pincode;  // Set pincode as data attribute

            hospitalCard.innerHTML = `
                <img src="${hospital.image}" alt="${hospital.name}">
                <h6>${hospital.name}</h6>
                <p>${hospital.address}</p>
                <p>Pincode: ${hospital.pincode}</p>
                <button>View Details</button>
            `;

            hospitalList.appendChild(hospitalCard);
        });
    }

    // Search Form Event Listener
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchQuery = searchInput.value.trim();
        const pincodeQuery = pincodeInput.value.trim(); // Keep existing pincode, if any

        fetchHospitals(searchQuery, pincodeQuery);
    });

    // Pincode Filter Event Listener
    filterButton.addEventListener('click', () => {
        const searchQuery = searchInput.value.trim(); // Keep existing search, if any
        const pincodeQuery = pincodeInput.value.trim();

        fetchHospitals(searchQuery, pincodeQuery);
    });

    // Initial load of hospitals
    fetchHospitals();
});
