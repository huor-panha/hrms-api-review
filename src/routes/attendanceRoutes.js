const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { clockIn, clockOut } = require('../controllers/attendanceController');

router.post('/clock-in', auth, clockIn);
router.post('/clock-out', auth, clockOut);

module.exports = router;

/**
 * @swagger
 * openapi: 3.0.0
 * /attendance/clock-in:
 *   post:
 *     summary: Clock in for a user
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Clock-in recorded successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * openapi: 3.0.0
 * /attendance/clock-out:
 *   post:
 *     summary: Clock out for a user
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Clock-out recorded successfully
 *       401:
 *         description: Unauthorized
 */
