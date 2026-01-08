// K1 - CrApi Mock
const express = require('express');
const app = express();
const port = 443;

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.json());

// Dummy Middleware to represent Security Schemes (JWT)
// Scheme: JWT-JjcxXjQ (Bearer)
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};

// ==========================================
// Endpoint: /chatbot/genai/state
// Method: GET
// Description: Swagger auto-generated from learnt schema
// ==========================================
app.get('/chatbot/genai/state', (req, res) => {
    // Parameters
    const cookieTS01 = req.cookies['TS01dc4fc6'];
    const cookieSession = req.cookies['chat_session_id'];
    const headerTe = req.headers['te'];
    const headerTestingId = req.headers['x-f5-api-testing-identifier'];
    const headerTruncated = req.headers['x-volterra-truncated-hdr'];

    // Response 2XX
    res.set('content-type', 'application/json');
    res.set('x-volterra-truncated-hdr', 'dummy-header-value');
    res.status(200).send({});
});

// ==========================================
// Endpoint: /community/api/v2/community/posts
// Method: POST
// Description: Swagger auto-generated from learnt schema
// ==========================================
app.post('/community/api/v2/community/posts', authMiddleware, (req, res) => {
    // Headers
    const trafficGen = req.headers['x-traffic-gen'];
    
    // Request Body
    const { content, title } = req.body;

    // Response 2XX
    res.status(200).json({
        "CreatedAt": "2026-01-01T12:00:00Z",
        "author": {
            "created_at": "2025-01-01T12:00:00Z",
            "email": "user@example.com",
            "nickname": "user123",
            "profile_pic_url": "http://example.com/pic.jpg",
            "vehicleid": "uuid-1234-5678"
        },
        "authorid": 101, // or string
        "comments": [], // array or string
        "content": "This is a dummy post content.",
        "id": "post-id-12345",
        "title": "Dummy Post Title"
    });
});

// ==========================================
// Endpoint: /community/api/v2/community/posts/{DYN}
// Method: GET
// Description: Fetch specific post
// ==========================================
app.get('/community/api/v2/community/posts/:DYN', authMiddleware, (req, res) => {
    // Path Param
    const dynParam = req.params.DYN;

    // Response 2XX
    res.status(200).json({
        "CreatedAt": "2026-01-01T12:00:00Z",
        "author": {
            "created_at": "2025-01-01T12:00:00Z",
            "email": "user@example.com",
            "nickname": "user123",
            "profile_pic_url": "http://example.com/pic.jpg",
            "vehicleid": "uuid-1234-5678"
        },
        "authorid": 101,
        "comments": [],
        "content": "Content of the specific post",
        "id": dynParam,
        "title": "Specific Post Title"
    });
});

// ==========================================
// Endpoint: /identity/api/auth/login
// Method: POST
// Description: Login endpoint
// ==========================================
app.post('/identity/api/auth/login', (req, res) => {
    // Request Body
    const { email, password } = req.body;

    // Response 2XX
    res.status(200).json({
        "message": "Login successful",
        "mfaRequired": false,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "type": "Bearer"
    });
});

// ==========================================
// Endpoint: /identity/api/auth/verify
// Method: POST
// Description: Verify token
// ==========================================
app.post('/identity/api/auth/verify', (req, res) => {
    // Request Body
    const { token } = req.body;

    // Response 2XX
    res.status(200).json({
        "message": "Token verified",
        "status": 200
    });
});

// ==========================================
// Endpoint: /identity/api/v2/admin/videos/{DYN}
// Method: DELETE
// Description: Admin delete video
// ==========================================
app.delete('/identity/api/v2/admin/videos/:DYN', authMiddleware, (req, res) => {
    const videoId = req.params.DYN;

    // Response 2XX
    res.status(200).json({
        "message": "Video deleted successfully",
        "status": 200
    });
});

// ==========================================
// Endpoint: /identity/api/v2/user/dashboard
// Method: GET
// Description: User dashboard data
// ==========================================
app.get('/identity/api/v2/user/dashboard', (req, res) => {
    // Response 2XX
    res.status(200).json({
        "available_credit": 500.00,
        "email": "user@example.com",
        "id": 1,
        "name": "John Doe",
        "number": "+1234567890",
        "picture_url": {},
        "role": "User",
        "video_id": 10,
        "video_name": {},
        "video_url": {}
    });
});

// ==========================================
// Endpoint: /identity/api/v2/user/videos
// Method: POST
// Description: Upload user video
// ==========================================
app.post('/identity/api/v2/user/videos', authMiddleware, (req, res) => {
    // Response 2XX
    res.status(200).json({
        "conversion_params": "param string",
        "id": 123,
        "profileVideo": "video_data_string",
        "video_name": "my_video.mp4"
    });
});

// ==========================================
// Endpoint: /identity/api/v2/user/videos/{DYN}
// Method: GET
// Description: Get specific video
// ==========================================
app.get('/identity/api/v2/user/videos/:DYN', authMiddleware, (req, res) => {
    const videoId = req.params.DYN;

    // Response 2XX
    res.status(200).json({
        "conversion_params": "param string",
        "id": 123,
        "profileVideo": "video_data_string",
        "video_name": "my_video.mp4"
    });
});

// ==========================================
// Endpoint: /identity/api/v2/vehicle/{DYN}
// Method: GET
// Description: Get vehicle details
// ==========================================
app.get('/identity/api/v2/vehicle/:DYN', authMiddleware, (req, res) => {
    const vehicleId = req.params.DYN;

    // Response 2XX
    res.status(200).json([
        {
            "id": 1,
            "model": {
                "fuel_type": "Electric",
                "id": 55,
                "model": "Model X",
                "vehicle_img": "url_to_image",
                "vehiclecompany": {
                    "id": 10,
                    "name": "Tesla"
                }
            },
            "owner": {},
            "pincode": "90210",
            "previousOwners": [],
            "status": "Active",
            "uuid": "uuid-string-123",
            "vehicleLocation": {
                "id": 1,
                "latitude": "34.0522",
                "longitude": "-118.2437"
            },
            "vin": "123ABC456DEF",
            "year": 2022
        }
    ]);
});

// ==========================================
// Endpoint: /identity/api/v2/vehicle/{DYN}
// Method: POST
// Description: Add/Update vehicle
// ==========================================
app.post('/identity/api/v2/vehicle/:DYN', authMiddleware, (req, res) => {
    const vehicleId = req.params.DYN;

    // Response 2XX
    res.status(200).json({
        "message": "Vehicle updated",
        "status": 200
    });
});

// ==========================================
// Endpoint: /manifest.json
// Method: GET
// Description: Manifest file
// ==========================================
app.get('/manifest.json', (req, res) => {
    // Response 2XX
    res.status(200).json({
        "background_color": "#ffffff",
        "display": "standalone",
        "icons": [
            {
                "sizes": "192x192",
                "src": "icon.png",
                "type": "image/png"
            }
        ],
        "name": "crAPI",
        "short_name": "crAPI",
        "start_url": "/",
        "theme_color": "#000000"
    });
});

// ==========================================
// Endpoint: /workshop/api/mechanic/mechanic_report
// Method: GET
// Description: Get mechanic report
// ==========================================
app.get('/workshop/api/mechanic/mechanic_report', authMiddleware, (req, res) => {
    // Query Params
    const reportId = req.query.report_id;

    // Response 2XX
    res.status(200).json({
        "comments": [],
        "created_on": "2026-01-08",
        "id": 999,
        "mechanic": {
            "id": 5,
            "mechanic_code": "MEC-001",
            "user": {
                "email": "mech@example.com",
                "number": "+1987654321"
            }
        },
        "problem_details": "Engine noise",
        "status": "Pending",
        "updated_on": {},
        "vehicle": {
            "id": 20,
            "owner": {
                "email": "owner@example.com",
                "number": "+1122334455"
            },
            "vin": "VIN123456789"
        }
    });
});

// ==========================================
// Endpoint: /workshop/api/mechanic/receive_report
// Method: GET
// Description: Receive report
// ==========================================
app.get('/workshop/api/mechanic/receive_report', authMiddleware, (req, res) => {
    // Query Params
    const mechanicCode = req.query.mechanic_code;
    const problemDetails = req.query.problem_details;
    const vin = req.query.vin;

    // Response 2XX
    res.status(200).json({
        "id": 500,
        "report_link": "http://api.example.com/report/500",
        "sent": true
    });
});

// ==========================================
// Endpoint: /workshop/api/mechanic/service_requests
// Method: GET
// Description: Get service requests
// ==========================================
app.get('/workshop/api/mechanic/service_requests', authMiddleware, (req, res) => {
    // Response 2XX
    res.status(200).json({
        "count": 5,
        "next_offset": 10,
        "previous_offset": null,
        "service_requests": [
            {
                "comments": [],
                "created_on": "2026-01-08",
                "id": 1,
                "mechanic": {
                    "id": 2,
                    "mechanic_code": "MEC-123",
                    "user": {
                        "email": "mech@example.com",
                        "number": "1234567890"
                    }
                },
                "problem_details": "Brake failure",
                "status": "Open",
                "updated_on": null,
                "vehicle": {
                    "id": 10,
                    "owner": {
                        "email": "owner@example.com",
                        "number": "0987654321"
                    },
                    "vin": "VIN0000001"
                }
            }
        ]
    });
});

// ==========================================
// Endpoint: /workshop/api/shop/products
// Method: GET
// Description: Get shop products
// ==========================================
app.get('/workshop/api/shop/products', authMiddleware, (req, res) => {
    // Response 2XX
    res.status(200).json({
        "count": 10,
        "credit": 100.50,
        "next_offset": null,
        "previous_offset": null,
        "products": [
            {
                "id": 1,
                "image_url": "http://example.com/img.jpg",
                "name": "Oil Filter",
                "price": "20.00"
            }
        ]
    });
});

app.listen(port, () => {
    console.log(`Dummy crAPI app listening at http://localhost:${port}`);
});