const Attendance = require('../models/Attendance');

exports.clockIn = async (req, res) => {
  try {
    const attendance = new Attendance({
      user: req.user._id,
      clockIn: Date.now(),
    });

    await attendance.save();
    res.status(200).send(attendance);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.clockOut = async (req, res) => {
  try {
    const attendance = await Attendance.findOne({
      user: req.user._id,
      date: { $gte: new Date().setHours(0, 0, 0, 0), $lt: new Date().setHours(23, 59, 59, 999) },
    });

    if (!attendance) {
      return res.status(404).send('No clock-in record found for today.');
    }

    attendance.clockOut = Date.now();
    await attendance.save();
    res.status(200).send(attendance);
  } catch (error) {
    res.status(400).send(error);
  }
};
