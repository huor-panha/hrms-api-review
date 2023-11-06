const Leave = require('../models/Leave');

exports.requestLeave = async (req, res) => {
    try {
        const leave = new Leave({
            ...req.body,
            user: req.user._id,
        });
        await leave.save();
        res.status(201).send(leave);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Assume 'auth' middleware ensures only managers can approve/reject
exports.approveLeave = async (req, res) => {
    try {
        const leave = await Leave.findOne({ _id: req.params.id, status: 'pending' });
        if (!leave) {
            return res.status(404).send();
        }
        leave.status = 'approved';
        await leave.save();
        res.send(leave);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.rejectLeave = async (req, res) => {
    try {
        const leave = await Leave.findOne({ _id: req.params.id, status: 'pending' });
        if (!leave) {
            return res.status(404).send();
        }
        leave.status = 'rejected';
        await leave.save();
        res.send(leave);
    } catch (error) {
        res.status(400).send(error);
    }
};
