// K1 - Mock CraPI
const express = require('express');
const cookieParser = require('cookie-parser');
const multer = require('multer'); // For multipart/form-data support
const upload = multer({ dest: 'uploads/' });

const app = express();
const port = 443; // Port matching your servers.url in spec

app.use(express.json());
app.use(cookieParser());

// Dummy Middleware  
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};

// ==========================================
// IDENTITY / AUTH ENDPOINTS
// ==========================================

// POST /identity/api/auth/signup
app.post('/identity/api/auth/signup', (req, res) => {
    const { email, name, number, password } = req.body;
    res.status(200).json({
        "message": "User successfully registered",
        "status": 200
    });
});

// POST /identity/api/auth/login
app.post('/identity/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    res.status(200).json({
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "type": "Bearer",
        "message": "Login successful",
        "role": "ROLE_USER"
    });
});

// POST /identity/api/auth/forget-password
app.post('/identity/api/auth/forget-password', (req, res) => {
    const { email } = req.body;
    res.status(200).json({
        "message": "Successfully send OTP",
        "status": 200
    });
});

// POST /identity/api/auth/v3/check-otp
app.post('/identity/api/auth/v3/check-otp', (req, res) => {
    const { email, otp, password } = req.body;
    res.status(200).json({
        "message": "OTP successfully verified",
        "status": 200
    });
});

// POST /identity/api/auth/v2/check-otp
app.post('/identity/api/auth/v2/check-otp', (req, res) => {
    const { email, otp, password } = req.body;
    res.status(200).json({
        "message": "OTP verified successfully",
        "status": 200
    });
});

// POST /identity/api/auth/v4.0/user/login-with-token
app.post('/identity/api/auth/v4.0/user/login-with-token', (req, res) => {
    const { email, token } = req.body;
    // Spec defines 400/403 responses primarily, but assuming success path exists or handling errors
    res.status(403).json({
        "message": "Forbidden",
        "status": 403
    });
});

// POST /identity/api/auth/v2.7/user/login-with-token
app.post('/identity/api/auth/v2.7/user/login-with-token', (req, res) => {
    const { email, token } = req.body;
    res.status(200).json({
        "token": "eyJhbGciOiJIUzI1Ni...",
        "type": "Bearer",
        "message": "Login successful",
        "role": "ROLE_USER"
    });
});

// ==========================================
// IDENTITY / USER ENDPOINTS
// ==========================================

// POST /identity/api/v2/user/reset-password
app.post('/identity/api/v2/user/reset-password', authMiddleware, (req, res) => {
    const { email, password } = req.body;
    res.status(200).json({
        "message": "Password reset successfully",
        "status": 200
    });
});

// POST /identity/api/v2/user/change-email
app.post('/identity/api/v2/user/change-email', authMiddleware, (req, res) => {
    const { new_email, old_email } = req.body;
    res.status(200).json({
        "message": "Email change initiated",
        "status": 200
    });
});

// POST /identity/api/v2/user/verify-email-token
app.post('/identity/api/v2/user/verify-email-token', authMiddleware, (req, res) => {
    const { old_email, new_email, token } = req.body;
    res.status(200).json({
        "message": "Email verified",
        "status": 200
    });
});

// GET /identity/api/v2/user/dashboard
app.get('/identity/api/v2/user/dashboard', authMiddleware, (req, res) => {
    res.status(200).json({
        "id": 35,
        "name": "Jasen.Hamill",
        "email": "Jasen.Hamill@example.com",
        "number": "7005397357",
        "picture_url": null,
        "video_url": null,
        "video_name": null,
        "available_credit": 155,
        "video_id": 0,
        "role": "ROLE_USER"
    });
});

// POST /identity/api/v2/user/pictures (Multipart)
app.post('/identity/api/v2/user/pictures', authMiddleware, upload.single('file'), (req, res) => {
    // req.file would contain the upload
    res.status(200).json({
        "name": "profile.jpg",
        "available_credit": 155,
        "id": 35,
        "status": "active",
        "picture": "http://localhost/images/profile.jpg",
        "user": {}
    });
});

// POST /identity/api/v2/user/videos (Multipart)
app.post('/identity/api/v2/user/videos', authMiddleware, upload.single('file'), (req, res) => {
    res.status(200).json({
        "id": 1,
        "video_name": "abc.mp4",
        "conversion_params": "-v codec h264",
        "profileVideo": "data:image/jpeg;base64,aGFrZmhhcw==",
        "user": {},
        "video": "url_to_video"
    });
});

// GET /identity/api/v2/user/videos/{video_id}
app.get('/identity/api/v2/user/videos/:video_id', authMiddleware, (req, res) => {
    const videoId = req.params.video_id;
    res.status(200).json({
        "id": 1,
        "video_name": "abc.mp4",
        "conversion_params": "-v codec h264",
        "profileVideo": "data:image/jpeg;base64,aGFrZmhhcw==",
        "user": {},
        "video": "url_to_video"
    });
});

// PUT /identity/api/v2/user/videos/{video_id}
app.put('/identity/api/v2/user/videos/:video_id', authMiddleware, (req, res) => {
    const videoId = req.params.video_id;
    const { videoName, video_url, conversion_params } = req.body;
    res.status(200).json({
        "id": 1,
        "video_name": videoName || "abc.mp4",
        "conversion_params": conversion_params || "-v codec h264",
        "profileVideo": "data:image/jpeg;base64,aGFrZmhhcw=="
    });
});

// DELETE /identity/api/v2/user/videos/{video_id}
app.delete('/identity/api/v2/user/videos/:video_id', authMiddleware, (req, res) => {
    const videoId = req.params.video_id;
    res.status(200).send({});
});

// GET /identity/api/v2/user/videos/convert_video
app.get('/identity/api/v2/user/videos/convert_video', authMiddleware, (req, res) => {
    const videoId = req.query.video_id;
    res.status(200).send({});
});

// ==========================================
// IDENTITY / VEHICLE ENDPOINTS
// ==========================================

// GET /identity/api/v2/vehicle/vehicles
app.get('/identity/api/v2/vehicle/vehicles', authMiddleware, (req, res) => {
    res.status(200).json([{
        "id": 1,
        "uuid": "uuid-1234",
        "year": 2020,
        "status": "active",
        "vin": "VIN123456789",
        "pincode": "90210",
        "owner": { "email": "user@example.com", "number": "1234567890" },
        "model": {
            "model": "Model S",
            "fuel_type": "Electric",
            "vehicle_img": "url",
            "id": 10,
            "vehiclecompany": { "id": 1, "name": "Tesla" }
        },
        "vehicleLocation": { "id": 1, "latitude": "34.05", "longitude": "-118.25" }
    }]);
});

// POST /identity/api/v2/vehicle/add_vehicle
app.post('/identity/api/v2/vehicle/add_vehicle', authMiddleware, (req, res) => {
    const { pincode, vin } = req.body;
    res.status(200).json({ "message": "Vehicle added", "status": 200 });
});

// POST /identity/api/v2/vehicle/resend_email
app.post('/identity/api/v2/vehicle/resend_email', authMiddleware, (req, res) => {
    res.status(200).json({ "message": "Email resent", "status": 200 });
});

// ==========================================
// COMMUNITY / POSTS ENDPOINTS
// ==========================================

// GET /community/api/v2/community/posts/{postId}
app.get('/community/api/v2/community/posts/:postId', authMiddleware, (req, res) => {
    const postId = req.params.postId;
    res.status(200).json({
        "id": postId,
        "title": "Title 3",
        "content": "Hello world 3",
        "author": {
            "nickname": "Hacker",
            "email": "hacker@darkweb.com",
            "vehicleid": "abac4018-5a38-466c-ab7f-361908afeab6",
            "profile_pic_url": "",
            "created_at": "2021-09-16T01:46:32.432Z"
        },
        "comments": [],
        "authorid": 3,
        "CreatedAt": "2021-09-16T01:46:32.432Z"
    });
});

// POST /community/api/v2/community/posts
app.post('/community/api/v2/community/posts', authMiddleware, (req, res) => {
    const { content, title } = req.body;
    res.status(200).json({
        "id": "ConZLXacq3MqhbLQDrbNLf",
        "title": title,
        "content": content,
        "author": {
            "nickname": "user",
            "email": "user@example.com",
            "vehicleid": "uuid",
            "profile_pic_url": "url",
            "created_at": "date"
        },
        "comments": [],
        "authorid": 1,
        "CreatedAt": "date"
    });
});

// POST /community/api/v2/community/posts/{postId}/comment
app.post('/community/api/v2/community/posts/:postId/comment', authMiddleware, (req, res) => {
    const postId = req.params.postId;
    const { content } = req.body;
    res.status(200).json({ /* ... Same Post Object Structure as above ... */ });
});

// GET /community/api/v2/community/posts/recent
app.get('/community/api/v2/community/posts/recent', authMiddleware, (req, res) => {
    const { limit, offset } = req.query;
    res.status(200).json([
        {
            "id": "ConZLXacq3MqhbLQDrbNLf",
            "title": "Title 3",
            "content": "Hello world 3",
            "author": {
                "nickname": "Hacker",
                "email": "hacker@darkweb.com",
                "vehicleid": "abac4018-5a38-466c-ab7f-361908afeab6",
                "profile_pic_url": "",
                "created_at": "2021-09-16T01:46:32.432Z"
            },
            "comments": [],
            "authorid": 3,
            "CreatedAt": "2021-09-16T01:46:32.432Z"
        }
    ]);
});

// ==========================================
// COMMUNITY / COUPON ENDPOINTS
// ==========================================

// POST /community/api/v2/coupon/new-coupon
app.post('/community/api/v2/coupon/new-coupon', authMiddleware, (req, res) => {
    const { coupon_code, amount } = req.body;
    res.status(200).json("Coupon added in database!");
});

// POST /community/api/v2/coupon/validate-coupon
app.post('/community/api/v2/coupon/validate-coupon', authMiddleware, (req, res) => {
    const { coupon_code } = req.body;
    res.status(200).json({
        "coupon_code": coupon_code,
        "amount": "75",
        "CreatedAt": "2023-12-07T14:22:29.832Z"
    });
});

// ==========================================
// WORKSHOP / SHOP ENDPOINTS
// ==========================================

// GET /workshop/api/shop/products
app.get('/workshop/api/shop/products', authMiddleware, (req, res) => {
    res.status(200).json({
        "credit": 100,
        "products": [
            { "id": 1, "name": "Seat", "price": "10.00", "image_url": "images/seat.svg" }
        ]
    });
});

// POST /workshop/api/shop/products
app.post('/workshop/api/shop/products', authMiddleware, (req, res) => {
    const { name, price, image_url } = req.body;
    res.status(200).json({
        "id": 2, "name": name, "price": price, "image_url": image_url
    });
});

// POST /workshop/api/shop/orders
app.post('/workshop/api/shop/orders', authMiddleware, (req, res) => {
    const { product_id, quantity } = req.body;
    res.status(200).json({
        "id": 30,
        "message": "Order sent successfully.",
        "credit": 155
    });
});

// PUT /workshop/api/shop/orders/{order_id}
app.put('/workshop/api/shop/orders/:order_id', authMiddleware, (req, res) => {
    const orderId = req.params.order_id;
    const { product_id, quantity } = req.body;
    res.status(200).json({
        "orders": {
            "id": orderId,
            "user": { "email": "user@example.com", "number": "123" },
            "product": { "id": 1, "name": "Seat", "price": "10", "image_url": "url" },
            "quantity": quantity,
            "status": "delivered",
            "created_on": "2023-01-01T00:00:00Z"
        }
    });
});

// GET /workshop/api/shop/orders/{order_id}
app.get('/workshop/api/shop/orders/:order_id', authMiddleware, (req, res) => {
    const orderId = req.params.order_id;
    res.status(200).json({
        "orders": {
            "id": orderId,
            "user": { "email": "user@example.com", "number": "123" },
            "product": { "id": 1, "name": "Seat", "price": "10", "image_url": "url" },
            "quantity": 1,
            "status": "delivered",
            "created_on": "2023-01-01T00:00:00Z"
        }
    });
});

// GET /workshop/api/shop/orders/all
app.get('/workshop/api/shop/orders/all', authMiddleware, (req, res) => {
    const { limit, offset } = req.query;
    res.status(200).json({
        "orders": [{
            "id": 1,
            "quantity": 1,
            "status": "delivered",
            "created_on": "date",
            "user": { "email": "a", "number": "1" },
            "product": { "id": 1, "image_url": "url", "name": "name", "price": "10" }
        }]
    });
});

// POST /workshop/api/shop/orders/return_order
app.post('/workshop/api/shop/orders/return_order', authMiddleware, (req, res) => {
    const orderId = req.query.order_id;
    res.status(200).json({
        "message": "Return processed",
        "order": {
            "id": orderId,
            "user": {},
            "product": {},
            "quantity": 1,
            "status": "returned",
            "created_on": "date"
        },
        "qr_code_url": "http://url.com/qr.png"
    });
});

// POST /workshop/api/shop/apply_coupon
app.post('/workshop/api/shop/apply_coupon', authMiddleware, (req, res) => {
    const { amount, coupon_code } = req.body;
    res.status(200).json({
        "credit": 165,
        "message": "Coupon successfully applied!"
    });
});

// GET /workshop/api/shop/return_qr_code
app.get('/workshop/api/shop/return_qr_code', (req, res) => {
    // Spec says security [] which implies none or optional, but typical shop flow might need it.
    // Spec response is image/png (binary)
    res.set('Content-Type', 'image/png');
    res.send(Buffer.from('fake_image_data')); 
});

// GET /workshop/api/management/users/all
app.get('/workshop/api/management/users/all', authMiddleware, (req, res) => {
    const { limit, offset } = req.query;
    res.status(200).json({
        "users": [
            {
                "user": { "email": "adam007@example.com", "number": "9876895423" },
                "available_credit": 100
            }
        ]
    });
});

// ==========================================
// WORKSHOP / MECHANIC ENDPOINTS
// ==========================================

// GET /workshop/api/mechanic/
app.get('/workshop/api/mechanic/', authMiddleware, (req, res) => {
    res.status(200).json({
        "mechanics": [
            {
                "id": 1,
                "mechanic_code": "TRAC_MECH1",
                "user": { "email": "mechanic.one@example.com", "number": "" }
            }
        ]
    });
});

// POST /workshop/api/merchant/contact_mechanic
app.post('/workshop/api/merchant/contact_mechanic', authMiddleware, (req, res) => {
    const { mechanic_code, problem_details, vin } = req.body;
    res.status(200).json({
        "response_from_mechanic_api": {
            "id": 17,
            "sent": true,
            "report_link": "http://localhost:8888/workshop/api/mechanic/mechanic_report?report_id=17"
        },
        "status": 200
    });
});

// GET /workshop/api/mechanic/receive_report
app.get('/workshop/api/mechanic/receive_report', (req, res) => {
    const { mechanic_code, problem_details, vin } = req.query;
    res.status(200).json({
        "id": 123,
        "sent": true,
        "report_link": "http://localhost/report/123"
    });
});

// GET /workshop/api/mechanic/mechanic_report
app.get('/workshop/api/mechanic/mechanic_report', authMiddleware, (req, res) => {
    const { report_id } = req.query;
    res.status(200).json({
        "id": report_id,
        "mechanic": {
            "id": 1,
            "mechanic_code": "TRAC_MECH1",
            "user": { "email": "mechanic@ex.com", "number": "123" }
        },
        "vehicle": {
            "id": 3,
            "vin": "VIN...",
            "owner": { "email": "owner@ex.com", "number": "123" }
        },
        "problem_details": "Engine noise",
        "status": "pending",
        "created_on": "2021-09-21"
    });
});

// GET /workshop/api/mechanic/service_requests
app.get('/workshop/api/mechanic/service_requests', authMiddleware, (req, res) => {
    const { limit, offset } = req.query;
    res.status(200).json({
        "service_requests": [{
            "id": 10,
            "mechanic": {
                "id": 1,
                "mechanic_code": "CODE",
                "user": { "email": "mech@ex.com", "number": "123" }
            },
            "vehicle": {
                "id": 20,
                "vin": "VIN",
                "owner": { "email": "own@ex.com", "number": "321" }
            },
            "problem_details": "Issue",
            "status": "pending",
            "created_on": "2023-01-01T00:00:00Z"
        }]
    });
});

// POST /workshop/api/mechanic/signup
app.post('/workshop/api/mechanic/signup', (req, res) => {
    const { email, mechanic_code, name, number, password } = req.body;
    res.status(200).json({
        "message": `Mechanic created with email: ${email}`
    });
});

app.listen(port, () => {
    console.log(`crAPI dummy server listening on port ${port}`);
});