const express = require('express');
const router = express.Router();
const { requestLeave, approveLeave, rejectLeave } = require('../controllers/leaveController');
const auth = require('../middleware/auth');

router.post('/request', auth, requestLeave); // Employee requests leave
router.post('/approve/:id', auth, approveLeave); // Manager approves leave
router.post('/reject/:id', auth, rejectLeave); // Manager rejects leave

module.exports = router;

/**
 * @swagger
 * openapi: 3.0.0
 * /leave/request:
 *   post:
 *     summary: Create a leave request
 *     tags: [Leave]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - startDate
 *               - endDate
 *               - typeOfLeave
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Start date of the leave
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: End date of the leave
 *               typeOfLeave:
 *                 type: string
 *                 description: Type of leave (e.g., sick, vacation, personal)
 *               reason:
 *                 type: string
 *                 description: Reason for leave (optional)
 *     responses:
 *       201:
 *         description: Leave request created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
/**
 * @swagger
 * openapi: 3.0.0
 * /leave/approve/{id}:
 *   post:
 *     summary: Approve a leave request
 *     tags: [Leave]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The leave request ID
 *     responses:
 *       200:
 *         description: Leave request approved
 *       404:
 *         description: Leave request not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * openapi: 3.0.0
 * /leave/reject/{id}:
 *   post:
 *     summary: Reject a leave request
 *     tags: [Leave]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The leave request ID
 *     responses:
 *       200:
 *         description: Leave request rejected
 *       404:
 *         description: Leave request not found
 *       401:
 *         description: Unauthorized
 */
/**
 * @swagger
 * openapi: 3.0.0
 * components:
 *   schemas:
 *     LeaveRequest:
 *       type: object
 *       required:
 *         - startDate
 *         - endDate
 *         - typeOfLeave
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the leave request
 *         startDate:
 *           type: string
 *           format: date
 *           description: The start date of the leave
 *         endDate:
 *           type: string
 *           format: date
 *           description: The end date of the leave
 *         typeOfLeave:
 *           type: string
 *           enum:
 *             - sick
 *             - vacation
 *             - personal
 *           description: The type of leave
 *         status:
 *           type: string
 *           enum:
 *             - pending
 *             - approved
 *             - rejected
 *           description: The status of the leave request
 *         reason:
 *           type: string
 *           description: The reason for leave (optional)
 *       example:
 *         startDate: "2023-01-01"
 *         endDate: "2023-01-10"
 *         typeOfLeave: vacation
 *         reason: "Family vacation"
 */
