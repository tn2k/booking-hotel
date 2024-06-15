const express = require('express')
const routes = express.Router()

const { createBooking, getBookingDetails, updateBooking, cancelBooking, addReview } = require('../../controllers/booking.Controller')

// Router để tạo đặt phòng mới
routes.post('/bookings', createBooking);

// Router để xem chi tiết đặt phòng
routes.get('/bookings/:bookingId', getBookingDetails);

// Router để cập nhật thông tin đặt phòng
routes.patch('/bookings/:bookingId', updateBooking);

// Router để hủy đặt phòng
routes.delete('/bookings/:bookingId', cancelBooking);

// Router để thêm nhận xét sau khi lưu trú
routes.post('/bookings/:bookingId/reviews', addReview);

// Router để lấy danh sách đặt phòng của một người dùng
// routes.get('/users/:userId/bookings', userController.getUserBookings);

// Router để lấy danh sách các phòng trọ
// routes.get('/rooms', roomController.getAvailableRooms);

// Router để xem chi tiết một phòng trọ
// routes.get('/rooms/:roomId', roomController.getRoomDetails);

module.exports = routes; 