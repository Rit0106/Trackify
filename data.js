// Supply chain checkpoints data with transaction hashes
const checkpoints = [
    {
        id: 1,
        name: "Manufacturer",
        description: "Product manufactured at Factory Unit A",
        location: "Factory Unit A, Building 2",
        lat: 12.9716,
        lng: 77.5946,
        status: "completed",
        timestamp: "2025-07-01 09:00",
        operator: "Manufacturing Team Lead",
        txHash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12",
        details: {
            temperature: "22°C",
            humidity: "45%",
            batchNumber: "MFG-2025-001",
            qualityScore: "98.5%",
            productionLine: "Line A-01",
            supervisor: "John Smith"
        }
    },
    {
        id: 2,
        name: "Quality Control",
        description: "Inspected and approved by QC Team",
        location: "Quality Control Lab",
        lat: 13.0827,
        lng: 80.2707,
        status: "completed",
        timestamp: "2025-07-02 15:10",
        operator: "QC Inspector",
        txHash: "0x2b3c4d5e6f7890abcdef1234567890abcdef123",
        details: {
            testResults: "Passed",
            inspector: "QC-001",
            testDuration: "2 hours",
            testsPassed: "15/15",
            defectRate: "0.0%",
            certificationLevel: "Grade A"
        }
    },
    {
        id: 3,
        name: "Packaging",
        description: "Product packaged and sealed",
        location: "Packaging Facility",
        lat: 15.3173,
        lng: 75.7139,
        status: "completed",
        timestamp: "2025-07-04 12:30",
        operator: "Packaging Team",
        txHash: "0x3c4d5e6f7890abcdef1234567890abcdef1234",
        details: {
            packageType: "Retail Box",
            weight: "250g",
            dimensions: "30x20x10 cm",
            barcode: "123456789012",
            packagingMaterial: "Eco-friendly cardboard",
            sealingMethod: "Heat sealed"
        }
    },
    {
        id: 4,
        name: "In Transit",
        description: "En route to Central Distribution Hub",
        location: "Highway Transport",
        lat: 18.5204,
        lng: 73.8567,
        status: "current",
        timestamp: "2025-07-05 08:45",
        operator: "Logistics Partner",
        txHash: "0x4d5e6f7890abcdef1234567890abcdef12345",
        details: {
            vehicle: "TRK-001",
            eta: "2025-07-05 18:00",
            currentSpeed: "65 km/h",
            driver: "Mike Johnson",
            route: "NH-48 Express Highway",
            mileage: "245 km covered"
        }
    },
    {
        id: 5,
        name: "Distribution Center",
        description: "Awaiting distributor collection",
        location: "Central Hub Mumbai",
        lat: 19.0760,
        lng: 72.8777,
        status: "pending",
        timestamp: null,
        operator: "Distribution Manager",
        txHash: "0x5e6f7890abcdef1234567890abcdef123456",
        details: {
            capacity: "1000 units",
            currentStock: "750 units",
            warehouseSection: "Section B-12",
            expectedArrival: "2025-07-05 18:00",
            storageConditions: "Climate controlled",
            securityLevel: "High"
        }
    },
    {
        id: 6,
        name: "Retail Delivery",
        description: "Final delivery to retail store",
        location: "Store Location Delhi",
        lat: 28.7041,
        lng: 77.1025,
        status: "pending",
        timestamp: null,
        operator: "Retail Partner",
        txHash: "0x6f7890abcdef1234567890abcdef1234567",
        details: {
            storeId: "DEL-001",
            expectedDelivery: "2025-07-08",
            deliveryWindow: "10:00 AM - 2:00 PM",
            storeManager: "Sarah Wilson",
            stockLocation: "Premium Section",
            customerNotification: "SMS & Email"
        }
    }
];

// Product information
const productInfo = {
    id: "AR4237-900",
    name: "Nike Air Fear of God 1 \"Oatmeal\"",
    brand: "Nike",
    model: "Air Fear of God 1",
    colorway: "Multi-Color / String-Oatmeal",
    size: "US 11",
    styleCode: "AR4237-900",
    releaseDate: "2019-11-02",
    retailPrice: "$350.00",
    materials: "Mesh upper, suede toe cap, TPU cage, Zoom Air cushioning",
    description: "High-top basketball silhouette designed by Jerry Lorenzo blending luxury streetwear aesthetics with performance tech. Features double-stacked Zoom Air and a translucent outsole.",
    image: "data:image/jpeg;./shoe.jpg",
    blockchain: {
        txHash: "0x4f8d...A32e",
        blockNumber: "45930976",
        gasUsed: "21,000",
        metadataURI: "ipfs://QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgN"
    }
};

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { checkpoints, productInfo };
}
