

const createBooking = async (req, res, next) => {
    req.send('v1/booking createBooking')
};

const getBookingDetails = (req, res, next) => {
    req.send("v1/booking getBookingDetails");
};

const updateBooking = (req, res, next) => {
    req.send("v1/booking updateBooking");
};

const cancelBooking = (req, res, next) => {
    req.send("v1/booking cancelBooking");
};

const addReview = (req, res, next) => {
    req.send("v1/booking addReview");
};


module.exports = {
    createBooking,
    getBookingDetails,
    updateBooking,
    cancelBooking,
    addReview
};

