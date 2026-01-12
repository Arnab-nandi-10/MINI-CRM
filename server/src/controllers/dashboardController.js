import Client from '../models/Client.js';
import Lead from '../models/Lead.js';
import Task from '../models/Task.js';

export const getDashboardStats = async (req, res) => {
  try {
    const totalClients = await Client.countDocuments();
    const activeLeads = await Lead.countDocuments({ status: { $in: ['New', 'In Progress'] } });
    const convertedLeads = await Lead.countDocuments({ status: 'Converted' });
    const lostLeads = await Lead.countDocuments({ status: 'Lost' });
    const pendingFollowUps = await Task.countDocuments({ status: 'Pending' });
    // For charts: conversion rate, monthly performance
    const monthlyLeads = await Lead.aggregate([
      { $group: {
        _id: { month: { $month: '$createdAt' }, year: { $year: '$createdAt' } },
        total: { $sum: 1 },
        converted: { $sum: { $cond: [{ $eq: ['$status', 'Converted'] }, 1, 0] } },
        lost: { $sum: { $cond: [{ $eq: ['$status', 'Lost'] }, 1, 0] } }
      } },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);
    res.json({ totalClients, activeLeads, convertedLeads, lostLeads, pendingFollowUps, monthlyLeads });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch dashboard stats', error: err.message });
  }
};
