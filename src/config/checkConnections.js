const mysql = require('mysql2/promise');
require('dotenv').config()

const countConnect = async () => {
    // Thiết lập cấu hình kết nối
    const connectionConfig = {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    };

    try {
        // Kết nối đến MySQL
        const connection = await mysql.createConnection(connectionConfig);

        // Thực hiện truy vấn để lấy số lượng kết nối hiện tại
        const [rows] = await connection.execute("SHOW STATUS LIKE 'Threads_connected';");

        // In ra kết quả
        const numConnection = rows[0].Value;
        console.log('Số lượng kết nối hiện tại:', numConnection);

        // Đóng kết nối
        await connection.end();
    } catch (err) {
        console.error('Lỗi kết nối đến MySQL:', err);
    }
};

// Gọi hàm để kiểm tra số lượng kết nối
module.exports = {
    countConnect
}
