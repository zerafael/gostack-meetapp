import { startOfDay, endOfDay, isBefore, parseISO } from 'date-fns';
import * as Yup from 'yup';
import { Op } from 'sequelize';

import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

class MeetupController {
  async index(req, res) {
    const { date, page } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Invalid date' });
    }

    const searchDate = parseISO(date);

    const meetups = await Meetup.findAll({
      where: {
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
      attributes: ['id', 'title', 'description', 'location', 'date'],
      include: [
        {
          model: User,
          as: 'organizer',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: File,
          as: 'banner',
          attributes: ['name', 'path', 'url'],
        },
      ],
      limit: 10,
      offset: (page - 1) * 10,
    });

    return res.json(meetups);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
      banner_id: Yup.number().required(),
    });

    if (!schema.isValid()) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const parsedDate = parseISO(req.body.date);

    if (isBefore(parsedDate, new Date())) {
      return res
        .status(401)
        .json({ error: "You can't create a meetup with date before today" });
    }

    const organizer_id = req.userId;

    const meetup = await Meetup.create({
      ...req.body,
      organizer_id,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      location: Yup.string(),
      date: Yup.date(),
      banner_id: Yup.number(),
      organizer_id: Yup.number(),
    });

    if (!schema.isValid()) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const user_id = req.userId;

    const meetup = await Meetup.findByPk(req.params.id);

    if (user_id !== meetup.organizer_id) {
      return res
        .status(401)
        .json({ error: 'Only the organizer can edit a meetup' });
    }

    if (isBefore(meetup.date, new Date())) {
      return res.status(401).json({ error: "You can't update a past meetup" });
    }

    const parsedDate = parseISO(req.body.date);

    if (isBefore(parsedDate, new Date())) {
      return res
        .status(401)
        .json({ error: "You can't update a meetup with date before today" });
    }

    await meetup.update(req.body);

    return res.json(meetup);
  }

  async delete(req, res) {
    const organizer_id = req.userId;

    const meetup = await Meetup.findByPk(req.params.id);

    if (organizer_id !== meetup.organizer_id) {
      return res
        .status(401)
        .json({ error: 'Only the organizer can cancel a meetup' });
    }

    if (isBefore(meetup.date, new Date())) {
      return res.status(401).json({ error: "You can't cancel a past meetup" });
    }

    await meetup.destroy();

    return res.send();
  }
}

export default new MeetupController();
