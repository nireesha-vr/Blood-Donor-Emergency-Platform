/* ==========================================================================
   BloodConnect - Blood Donor & Emergency Request Platform
   Global JavaScript (script.js)
   ========================================================================== */

// Storage Keys
const DONORS_KEY = 'bloodDonors';
const REQUESTS_KEY = 'bloodRequests';

// Initial Sample Data (Seeded ONLY if localStorage is empty)
const SAMPLE_DONORS = [
  {
    id: 'DON-1001',
    name: 'Arun Kumar',
    age: 26,
    gender: 'Male',
    bloodGroup: 'A+',
    phone: '9876543210',
    email: 'arun.kumar@example.com',
    city: 'Chennai',
    address: '12 Anna Salai, T. Nagar',
    lastDonation: '2024-01-15',
    availability: 'Available'
  },
  {
    id: 'DON-1002',
    name: 'Priya S',
    age: 24,
    gender: 'Female',
    bloodGroup: 'O+',
    phone: '9876543211',
    email: 'priya.s@example.com',
    city: 'Chennai',
    address: '45 Beach Road, Velachery',
    lastDonation: '2023-11-20',
    availability: 'Available'
  },
  {
    id: 'DON-1003',
    name: 'Rahul M',
    age: 29,
    gender: 'Male',
    bloodGroup: 'B+',
    phone: '9876543212',
    email: 'rahul.m@example.com',
    city: 'Coimbatore',
    address: '88 Cross Cut Road, Gandhipuram',
    lastDonation: '2024-02-01',
    availability: 'Available'
  },
  {
    id: 'DON-1004',
    name: 'Divya R',
    age: 22,
    gender: 'Female',
    bloodGroup: 'O-',
    phone: '9876543213',
    email: 'divya.r@example.com',
    city: 'Madurai',
    address: '14 KK Nagar Main Road',
    lastDonation: '2023-10-10',
    availability: 'Available'
  },
  {
    id: 'DON-1005',
    name: 'Karthik V',
    age: 31,
    gender: 'Male',
    bloodGroup: 'AB+',
    phone: '9876543214',
    email: 'karthik.v@example.com',
    city: 'Chennai',
    address: '77 Mount Road, Guindy',
    lastDonation: '2024-01-05',
    availability: 'Not Available'
  }
];

const SAMPLE_REQUESTS = [
  {
    id: 'REQ-5001',
    patientName: 'Suresh Babu',
    bloodGroup: 'O-',
    units: 2,
    hospital: 'Apollo Hospital',
    location: 'Greams Road',
    city: 'Chennai',
    contact: '9840123456',
    date: '2024-10-06',
    emergencyLevel: 'Critical',
    message: 'Urgent requirement for heart surgery. Universal donor needed immediately.',
    status: 'Active'
  },
  {
    id: 'REQ-5002',
    patientName: 'Meenakshi Sundaram',
    bloodGroup: 'B+',
    units: 3,
    hospital: 'Ganga Hospital',
    location: 'Mettupalayam Road',
    city: 'Coimbatore',
    contact: '9840654321',
    date: '2024-10-07',
    emergencyLevel: 'Urgent',
    message: 'Accident emergency response needed within 24 hours.',
    status: 'Active'
  },
  {
    id: 'REQ-5003',
    patientName: 'Anitha Ramesh',
    bloodGroup: 'A+',
    units: 1,
    hospital: 'Rajaji Government Hospital',
    location: 'Goripalayam',
    city: 'Madurai',
    contact: '9840987654',
    date: '2024-10-08',
    emergencyLevel: 'Normal',
    message: 'Scheduled plasma procedure.',
    status: 'Active'
  }
];

// --------------------------------------------------------------------------
// Initialize & Seed LocalStorage
// --------------------------------------------------------------------------
function initStorage() {
  if (!localStorage.getItem(DONORS_KEY)) {
    localStorage.setItem(DONORS_KEY, JSON.stringify(SAMPLE_DONORS));
  }
  if (!localStorage.getItem(REQUESTS_KEY)) {
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(SAMPLE_REQUESTS));
  }
}

// Data Retrieval & Storage Helpers
function getDonors() {
  initStorage();
  return JSON.parse(localStorage.getItem(DONORS_KEY)) || [];
}

function saveDonor(donor) {
  const donors = getDonors();
  donors.unshift(donor); // Add new donor to the beginning
  localStorage.setItem(DONORS_KEY, JSON.stringify(donors));
}

function getRequests() {
  initStorage();
  return JSON.parse(localStorage.getItem(REQUESTS_KEY)) || [];
}

function saveRequest(request) {
  const requests = getRequests();
  requests.unshift(request); // Add new request to beginning
  localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
}

// --------------------------------------------------------------------------
// Toast Notification & Modal System
// --------------------------------------------------------------------------
function showToast(message, type = 'success') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let iconClass = 'fa-circle-check';
  if (type === 'error') iconClass = 'fa-circle-exclamation';
  if (type === 'info') iconClass = 'fa-circle-info';

  toast.innerHTML = `
    <i class="fa-solid ${iconClass}"></i>
    <div class="toast-content">${message}</div>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4000);
}

function showModal(title, contentHtml) {
  let overlay = document.getElementById('global-modal');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'global-modal';
    overlay.className = 'modal-overlay';
    document.body.appendChild(overlay);
  }

  overlay.innerHTML = `
    <div class="modal-content">
      <button class="modal-close" onclick="closeModal()"><i class="fa-solid fa-xmark"></i></button>
      <h3 style="margin-bottom: 1rem; color: var(--primary-color);">${title}</h3>
      <div>${contentHtml}</div>
    </div>
  `;

  overlay.classList.add('active');
}

function closeModal() {
  const overlay = document.getElementById('global-modal');
  if (overlay) {
    overlay.classList.remove('active');
  }
}

// --------------------------------------------------------------------------
// Donor Registration Logic (donor.html)
// --------------------------------------------------------------------------
function initDonorRegistration() {
  const form = document.getElementById('donorForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('fullName').value.trim();
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const bloodGroup = document.getElementById('bloodGroup').value;
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const city = document.getElementById('city').value.trim();
    const address = document.getElementById('address').value.trim();
    const lastDonation = document.getElementById('lastDonation').value || 'N/A';
    const availability = document.getElementById('availability').value;

    // Validation checks
    if (!name || !age || !gender || !bloodGroup || !phone || !email || !city || !address) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    if (isNaN(age) || age < 18 || age > 65) {
      showToast('Eligible donor age must be between 18 and 65 years.', 'error');
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      showToast('Please enter a valid 10-digit phone number.', 'error');
      return;
    }

    const newDonor = {
      id: 'DON-' + Date.now().toString().slice(-4),
      name,
      age,
      gender,
      bloodGroup,
      phone,
      email,
      city,
      address,
      lastDonation,
      availability
    };

    saveDonor(newDonor);
    showToast('Thank you! You have been registered successfully as a blood donor.', 'success');
    form.reset();
  });
}

// --------------------------------------------------------------------------
// Find Blood Donor Logic (find-blood.html)
// --------------------------------------------------------------------------
function searchDonors(groupFilter, cityFilter) {
  const donors = getDonors();
  return donors.filter(donor => {
    const matchesGroup = !groupFilter || groupFilter === 'All' || donor.bloodGroup === groupFilter;
    const matchesCity = !cityFilter || donor.city.toLowerCase().includes(cityFilter.toLowerCase().trim());
    return matchesGroup && matchesCity;
  });
}

function renderDonorCards(donorsList) {
  const resultsContainer = document.getElementById('donorResultsGrid');
  if (!resultsContainer) return;

  if (donorsList.length === 0) {
    resultsContainer.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-user-slash"></i>
        <h3>No matching donors found</h3>
        <p>Try broadening your search criteria or submit an emergency request to reach all members.</p>
        <a href="emergency-request.html" class="btn btn-primary btn-sm"><i class="fa-solid fa-truck-medical"></i> Submit Emergency Request</a>
      </div>
    `;
    return;
  }

  resultsContainer.innerHTML = donorsList.map(donor => `
    <div class="donor-card">
      <div class="donor-header">
        <div>
          <div class="donor-name">${donor.name}</div>
          <span class="badge ${donor.availability === 'Available' ? 'badge-available' : 'badge-unavailable'}" style="margin-top: 0.3rem;">
            ${donor.availability}
          </span>
        </div>
        <div class="donor-blood-badge">${donor.bloodGroup}</div>
      </div>
      <div class="donor-details">
        <div class="donor-detail-item"><i class="fa-solid fa-location-dot"></i> <span>${donor.city} (${donor.address})</span></div>
        <div class="donor-detail-item"><i class="fa-solid fa-phone"></i> <span>${donor.phone}</span></div>
        <div class="donor-detail-item"><i class="fa-solid fa-envelope"></i> <span>${donor.email}</span></div>
        <div class="donor-detail-item"><i class="fa-solid fa-calendar"></i> <span>Last Donated: ${donor.lastDonation}</span></div>
      </div>
      <button class="btn btn-outline btn-block btn-sm" onclick="contactDonor('${donor.name}', '${donor.phone}', '${donor.bloodGroup}', '${donor.city}')">
        <i class="fa-solid fa-comment-dots"></i> Contact Donor
      </button>
    </div>
  `).join('');
}

function contactDonor(name, phone, group, city) {
  const modalContent = `
    <p style="margin-bottom: 0.8rem;">You are reaching out to donor <strong>${name}</strong> (${group}) in <strong>${city}</strong>.</p>
    <div style="background: var(--bg-light); padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 1rem;">
      <p><strong><i class="fa-solid fa-phone"></i> Phone:</strong> <a href="tel:${phone}" style="color: var(--primary-color); font-weight: 700;">${phone}</a></p>
    </div>
    <p style="font-size: 0.85rem; color: var(--text-muted);">Please contact politely and specify your patient details and hospital location clearly.</p>
  `;
  showModal(`Contact ${name}`, modalContent);
}

function initFindBloodPage() {
  const searchForm = document.getElementById('searchForm');
  if (!searchForm) return;

  // Initial display of all donors
  renderDonorCards(getDonors());

  searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const bloodGroup = document.getElementById('searchBloodGroup').value;
    const city = document.getElementById('searchCity').value;
    const filtered = searchDonors(bloodGroup, city);
    renderDonorCards(filtered);
  });

  const resetBtn = document.getElementById('resetSearchBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      document.getElementById('searchBloodGroup').value = 'All';
      document.getElementById('searchCity').value = '';
      renderDonorCards(getDonors());
    });
  }

  // Handle URL query parameter if passed from home page blood group pills
  const urlParams = new URLSearchParams(window.location.search);
  const groupParam = urlParams.get('group');
  if (groupParam) {
    const select = document.getElementById('searchBloodGroup');
    if (select) {
      select.value = groupParam;
      renderDonorCards(searchDonors(groupParam, ''));
    }
  }
}

// --------------------------------------------------------------------------
// Emergency Request Logic (emergency-request.html)
// --------------------------------------------------------------------------
function initEmergencyRequestForm() {
  const form = document.getElementById('emergencyForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const patientName = document.getElementById('patientName').value.trim();
    const bloodGroup = document.getElementById('bloodGroupReq').value;
    const units = parseInt(document.getElementById('units').value);
    const hospital = document.getElementById('hospital').value.trim();
    const location = document.getElementById('location').value.trim();
    const city = document.getElementById('city').value.trim();
    const contact = document.getElementById('contact').value.trim();
    const date = document.getElementById('reqDate').value;
    const emergencyLevel = document.getElementById('emergencyLevel').value;
    const message = document.getElementById('message').value.trim() || 'Urgent requirement.';

    if (!patientName || !bloodGroup || !units || !hospital || !city || !contact || !date || !emergencyLevel) {
      showToast('Please fill in all mandatory emergency fields.', 'error');
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(contact)) {
      showToast('Please provide a valid 10-digit contact number.', 'error');
      return;
    }

    const newRequest = {
      id: 'REQ-' + Date.now().toString().slice(-4),
      patientName,
      bloodGroup,
      units,
      hospital,
      location: location || hospital,
      city,
      contact,
      date,
      emergencyLevel,
      message,
      status: 'Active'
    };

    saveRequest(newRequest);
    showToast('Emergency blood request submitted successfully!', 'success');
    form.reset();

    setTimeout(() => {
      window.location.href = 'requests.html';
    }, 1500);
  });
}

// --------------------------------------------------------------------------
// Active Requests List & Filtering (requests.html)
// --------------------------------------------------------------------------
function displayRequests(filterLevel = 'All') {
  const grid = document.getElementById('requestsFeedGrid');
  if (!grid) return;

  let requests = getRequests();

  // Sort critical first, then urgent, then normal
  const priorityOrder = { Critical: 1, Urgent: 2, Normal: 3 };
  requests.sort((a, b) => priorityOrder[a.emergencyLevel] - priorityOrder[b.emergencyLevel]);

  // Apply filter
  if (filterLevel !== 'All') {
    requests = requests.filter(r => r.emergencyLevel === filterLevel);
  }

  if (requests.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-heart-circle-check"></i>
        <h3>No active emergency requests available</h3>
        <p>There are currently no active emergency blood requests matching this filter category.</p>
        <a href="emergency-request.html" class="btn btn-primary btn-sm">Post New Request</a>
      </div>
    `;
    return;
  }

  grid.innerHTML = requests.map(req => {
    let levelBadgeClass = 'badge-normal';
    let cardClass = 'normal';
    if (req.emergencyLevel === 'Critical') {
      levelBadgeClass = 'badge-critical';
      cardClass = 'critical';
    } else if (req.emergencyLevel === 'Urgent') {
      levelBadgeClass = 'badge-urgent';
      cardClass = 'urgent';
    }

    return `
      <div class="request-card ${cardClass}">
        <div class="request-header">
          <div class="patient-info">
            <div class="blood-req-badge">${req.bloodGroup}</div>
            <div>
              <div class="patient-name">${req.patientName}</div>
              <span style="font-size: 0.8rem; color: var(--text-muted);">Req ID: ${req.id}</span>
            </div>
          </div>
          <span class="badge ${levelBadgeClass}">${req.emergencyLevel}</span>
        </div>

        <div class="request-details-grid">
          <div><i class="fa-solid fa-vial"></i> <strong>Units Needed:</strong> ${req.units} unit(s)</div>
          <div><i class="fa-solid fa-hospital"></i> <strong>Hospital:</strong> ${req.hospital}</div>
          <div><i class="fa-solid fa-location-dot"></i> <strong>City:</strong> ${req.city} (${req.location})</div>
          <div><i class="fa-solid fa-calendar-day"></i> <strong>Required Date:</strong> ${req.date}</div>
        </div>

        <div class="request-msg">
          <i class="fa-solid fa-quote-left" style="color: var(--primary-color);"></i> ${req.message}
        </div>

        <div class="request-actions">
          <button class="btn btn-primary btn-block btn-sm" onclick="volunteerHelp('${req.patientName}', '${req.contact}', '${req.bloodGroup}')">
            <i class="fa-solid fa-hand-holding-heart"></i> I Can Help
          </button>
          <a href="tel:${req.contact}" class="btn btn-outline btn-sm">
            <i class="fa-solid fa-phone"></i> Contact
          </a>
        </div>
      </div>
    `;
  }).join('');
}

function volunteerHelp(patientName, contact, group) {
  showToast('Thank you for volunteering to help!', 'success');
  const modalContent = `
    <div style="text-align: center; padding: 1rem 0;">
      <i class="fa-solid fa-heart-pulse" style="font-size: 3rem; color: var(--primary-color); margin-bottom: 1rem;"></i>
      <h4 style="margin-bottom: 0.5rem;">Heroic Gesture!</h4>
      <p style="margin-bottom: 1rem;">You are volunteering to donate <strong>${group}</strong> blood for patient <strong>${patientName}</strong>.</p>
      <p style="background: var(--bg-light); padding: 1rem; border-radius: var(--radius-sm); font-size: 1.1rem; font-weight: 700;">
        <i class="fa-solid fa-phone"></i> Emergency Contact: <a href="tel:${contact}" style="color: var(--primary-color);">${contact}</a>
      </p>
      <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 1rem;">Please call the hospital contact immediately to coordinate donation time.</p>
    </div>
  `;
  showModal('Volunteer Confirmation', modalContent);
}

function initRequestsPage() {
  const grid = document.getElementById('requestsFeedGrid');
  if (!grid) return;

  displayRequests('All');

  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const level = this.getAttribute('data-filter');
      displayRequests(level);
    });
  });
}

// --------------------------------------------------------------------------
// Navigation & Dynamic Header Active State
// --------------------------------------------------------------------------
function initNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // Highlight active link based on window location
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// --------------------------------------------------------------------------
// Document Ready Entry Point
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initStorage();
  initNavigation();
  initDonorRegistration();
  initFindBloodPage();
  initEmergencyRequestForm();
  initRequestsPage();
});
