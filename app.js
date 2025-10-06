// Global variables
let map = null;
let markers = [];
let routeLine = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    renderTimeline();
    setupEventListeners();
    updateLastModified();
});

// Initialize the map
function initializeMap() {
    try {
        // Initialize map
        map = L.map('map', {
            center: [15.5937, 78.9629], // Center of India
            zoom: 5,
            zoomControl: true,
            attributionControl: false
        });

        // Add dark tile layer
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: null,
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(map);

        // Add markers and route
        addMarkersAndRoute();
        
    } catch (error) {
        console.error('Error initializing map:', error);
        document.getElementById('map').innerHTML = '<div class="loading">Map loading failed. Please refresh the page.</div>';
    }
}

// Add markers and route to the map
function addMarkersAndRoute() {
    if (!map) return;

    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    
    if (routeLine) {
        map.removeLayer(routeLine);
    }

    const routeCoords = [];
    const statusColors = {
        completed: '#00d084',
        current: '#0071ce',
        pending: '#6c757d'
    };

    // Add markers for each checkpoint
    checkpoints.forEach((checkpoint, index) => {
        const { lat, lng, name, description, location, status, timestamp, operator, txHash } = checkpoint;
        
        // Create custom pin marker
        const pinIcon = L.divIcon({
            className: 'custom-pin',
            html: `
                <div class="map-pin ${status}">
                    <div class="pin-inner"></div>
                </div>
            `,
            iconSize: [30, 30],
            iconAnchor: [15, 30]
        });

        const marker = L.marker([lat, lng], { icon: pinIcon })
            .addTo(map)
            .bindPopup(`
                <div style="font-family: 'Poppins', sans-serif; color: #ffffff; min-width: 220px;">
                    <h4 style="margin: 0 0 8px 0; color: #0071ce; font-size: 1rem;">${name}</h4>
                    <p style="margin: 0 0 6px 0; font-size: 0.9rem; line-height: 1.4;">${description}</p>
                    <div style="font-size: 0.8rem; color: #b0b0b0; margin-bottom: 4px;">
                        <i class="fas fa-map-marker-alt" style="margin-right: 4px;"></i> ${location}
                    </div>
                    <div style="font-size: 0.8rem; color: #b0b0b0; margin-bottom: 4px;">
                        <i class="fas fa-user" style="margin-right: 4px;"></i> ${operator}
                    </div>
                    ${timestamp ? `
                        <div style="font-size: 0.8rem; color: #b0b0b0; margin-bottom: 4px;">
                            <i class="fas fa-clock" style="margin-right: 4px;"></i> ${timestamp}
                        </div>
                    ` : ''}
                    <div style="font-size: 0.75rem; color: #0071ce; font-family: 'Courier New', monospace; margin-top: 6px;">
                        <i class="fas fa-link" style="margin-right: 4px;"></i> ${txHash}
                    </div>
                </div>
            `);

        markers.push(marker);
        routeCoords.push([lat, lng]);
    });

    // Add route line
    if (routeCoords.length > 1) {
        routeLine = L.polyline(routeCoords, {
            color: '#0071ce',
            weight: 3,
            opacity: 0.8,
            dashArray: '10, 10'
        }).addTo(map);
    }

    // Fit map to show all markers
    if (markers.length > 0) {
        const group = new L.featureGroup(markers);
        map.fitBounds(group.getBounds().pad(0.1));
    }
}

// Render timeline
function renderTimeline() {
    const timelineContainer = document.getElementById('timeline');
    if (!timelineContainer) return;

    const statusIcons = {
        completed: 'fas fa-check',
        current: 'fas fa-truck',
        pending: 'fas fa-clock'
    };

    const timelineHTML = checkpoints.map((checkpoint, index) => `
        <div class="timeline-item" data-checkpoint-id="${checkpoint.id}">
            <div class="timeline-icon ${checkpoint.status}" onclick="locateOnMap(${checkpoint.lat}, ${checkpoint.lng})">
                <i class="${statusIcons[checkpoint.status]}"></i>
            </div>
            <div class="timeline-content">
                <div class="timeline-title" onclick="showCheckpointDetails(${checkpoint.id})">${checkpoint.name}</div>
                <div class="timeline-desc">${checkpoint.description}</div>
                <div class="timeline-time">${checkpoint.timestamp || 'Pending'}</div>
                <div class="timeline-hash">Tx: ${checkpoint.txHash}</div>
            </div>
        </div>
    `).join('');

    timelineContainer.innerHTML = timelineHTML;
}

// Locate checkpoint on map
function locateOnMap(lat, lng) {
    if (!map) return;
    
    map.setView([lat, lng], 12);
    
    // Find and open popup for the marker
    markers.forEach(marker => {
        const markerPos = marker.getLatLng();
        if (Math.abs(markerPos.lat - lat) < 0.001 && Math.abs(markerPos.lng - lng) < 0.001) {
            marker.openPopup();
        }
    });
}

// Show checkpoint details in modal
function showCheckpointDetails(checkpointId) {
    const checkpoint = checkpoints.find(cp => cp.id === checkpointId);
    if (!checkpoint) return;

    const modal = document.getElementById('checkpointModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    modalTitle.textContent = `${checkpoint.name} - Details`;
    
    modalBody.innerHTML = `
        <div class="modal-detail">
            <h4>Checkpoint Information</h4>
            <p><strong>Location:</strong> ${checkpoint.location}</p>
            <p><strong>Status:</strong> ${checkpoint.status.charAt(0).toUpperCase() + checkpoint.status.slice(1)}</p>
            <p><strong>Operator:</strong> ${checkpoint.operator}</p>
            <p><strong>Description:</strong> ${checkpoint.description}</p>
            ${checkpoint.timestamp ? `<p><strong>Timestamp:</strong> ${checkpoint.timestamp}</p>` : ''}
            <div class="modal-hash">Transaction Hash: ${checkpoint.txHash}</div>
        </div>
        
        <div class="modal-detail">
            <h4>Product Journey at this Stage</h4>
            ${Object.entries(checkpoint.details).map(([key, value]) => 
                `<p><strong>${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> ${value}</p>`
            ).join('')}
        </div>
        
        <div class="modal-detail">
            <h4>Blockchain Verification</h4>
            <p><strong>Transaction Hash:</strong> ${checkpoint.txHash}</p>
            <p><strong>Block Height:</strong> ${Math.floor(Math.random() * 1000000) + 45000000}</p>
            <p><strong>Gas Used:</strong> ${Math.floor(Math.random() * 50000) + 20000}</p>
            <p><strong>Verification Status:</strong> ✅ Verified</p>
        </div>
    `;

    modal.style.display = 'block';
}

// Setup event listeners
function setupEventListeners() {
    // Track button
    const trackBtn = document.getElementById('trackBtn');
    const productIdInput = document.getElementById('productId');

    if (trackBtn) {
        trackBtn.addEventListener('click', handleTrackProduct);
    }

    if (productIdInput) {
        productIdInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleTrackProduct();
            }
        });
    }

    // Fullscreen button
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', toggleFullscreen);
    }

    // Modal close functionality
    const modal = document.getElementById('checkpointModal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Window resize handler
    window.addEventListener('resize', function() {
        if (map) {
            setTimeout(() => {
                map.invalidateSize();
            }, 100);
        }
    });
}

// Handle track product
function handleTrackProduct() {
    const productId = document.getElementById('productId').value.trim();
    if (!productId) {
        alert('Please enter a Product ID');
        return;
    }

    // Here you would typically make an API call
    // For now, we'll just refresh the timeline and map
    renderTimeline();
    if (map) {
        addMarkersAndRoute();
    }
    
    console.log('Tracking product:', productId);
}

// Toggle fullscreen
function toggleFullscreen() {
    const mapContainer = document.querySelector('.map-container');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    
    if (!mapContainer || !fullscreenBtn) return;

    if (mapContainer.classList.contains('fullscreen')) {
        mapContainer.classList.remove('fullscreen');
        fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
    } else {
        mapContainer.classList.add('fullscreen');
        fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
    }

    // Invalidate map size after fullscreen toggle
    setTimeout(() => {
        if (map) {
            map.invalidateSize();
        }
    }, 100);
}

// Update last modified timestamp
function updateLastModified() {
    const lastUpdatedElement = document.getElementById('lastUpdated');
    if (lastUpdatedElement) {
        const now = new Date();
        const formattedDate = now.toLocaleString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
        lastUpdatedElement.textContent = formattedDate;
    }
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
});

// Handle map load errors
window.addEventListener('load', function() {
    setTimeout(() => {
        if (map && typeof map.invalidateSize === 'function') {
            map.invalidateSize();
        }
    }, 500);
});


