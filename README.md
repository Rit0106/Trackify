🚀 Motivation
The inspiration for this project came from the desire to create a more engaging and transparent tracking system.
We aim to replace the static, often confusing, text-based updates with a rich, interactive, and easy-to-understand visualization that provides peace of mind to the end-user.

# Product Tracker
This project is a single-page web application that provides a detailed view of a product's journey through the supply chain.
It features an interactive map to visualize the product's location at each stage and a timeline that details the supply chain checkpoints.
The application also includes a "Blockchain Verified" feature, suggesting that the supply chain data is transparent and secure.

 ## Tech Stack
*   **Frontend:**
    *   HTML5
    *   CSS3
    *   JavaScript (ES6)
*   **Libraries:**
    *   **Leaflet.js:** An open-source JavaScript library for mobile-friendly interactive maps.
    *   **Font Awesome:** A popular icon toolkit.
    *   **Google Fonts:** For typography.

## How it Works

The application loads product and supply chain data from the `data.js` file. The `app.js` file then processes this data to dynamically generate the timeline and map markers. 
The user can interact with the timeline and map to view details about each checkpoint.

''  
    A[index.html] -- "Loads" --> B(style.css);
    A -- "Loads" --> C(app.js);
    A -- "Loads" --> D(data.js);
    C -- "Uses data from" --> D;
    C -- "Manipulates" --> A;
    C -- "Uses" --> E(Leaflet.js); 
  ''


##  Key Features
**Interactive Map**: A dynamic map interface powered by Leaflet.js to visually trace the path of a delivery.
**Detailed Timeline**: A chronological view of all logistics events, from order placement to final delivery, with associated timestamps.
**Location Insights**: Click on any stop on the map or timeline to view detailed information about that location.
**Product Information**: Display relevant product details, such as order number, item name, and shipment status, directly within the tracking view.
**Responsive Design**: A seamless and optimized experience across all devices, from desktop to mobile.

