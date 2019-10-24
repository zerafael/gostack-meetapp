import { isBefore } from 'date-fns';
import { Op } from 'sequelize';

import Meetup from '../models/Meetup';
import User from '../models/User';
import Subscription from '../models/Subscription';

import Mail from '../../lib/Mail';
import File from '../models/File';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          attributes: ['id', 'title', 'description', 'location', 'date'],
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
          include: [
            {
              model: User,
              as: 'organizer',
              attributes: ['name', 'email'],
            },
            {
              model: File,
              as: 'banner',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
      ],
      order: [[{ model: Meetup, as: 'meetup' }, 'date']],
    });

    return res.json(subscriptions);
  }

  async store(req, res) {
    const meetup = await Meetup.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'organizer',
          attributes: ['name', 'email'],
        },
      ],
    });

    if (meetup.organizer_id === req.userId) {
      return res
        .status(401)
        .json({ error: "Organizer can't subscribe to meetup" });
    }

    // Checar se a meetup já passou
    if (isBefore(meetup.date, new Date())) {
      return res
        .status(401)
        .json({ error: "You can't subscribe to a past meetup" });
    }

    // Checar se o usuário já se inscreveu nesse meetup
    const subscribers = await Subscription.findOne({
      where: {
        user_id: req.userId,
        meetup_id: meetup.id,
      },
    });

    if (subscribers) {
      return res
        .status(401)
        .json({ error: 'You only can subscribe to a meetup once' });
    }

    const checkDateSubscription = await Subscription.findOne({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          attributes: ['id', 'date'],
          where: {
            date: meetup.date,
          },
        },
      ],
    });

    // Checar se o usuário já se inscreveu em um meetup nesse horário
    if (checkDateSubscription) {
      return res
        .status(400)
        .json({ error: "Can't subscribe to two meetups at the same time" });
    }

    const { id } = await Subscription.create({
      user_id: req.userId,
      meetup_id: meetup.id,
    });

    const subscription = await Subscription.findByPk(id, {
      include: [
        {
          model: Meetup,
          as: 'meetup',
          attributes: ['id', 'title', 'description', 'date', 'location'],
          include: [
            {
              model: User,
              as: 'organizer',
              attributes: ['name', 'email'],
            },
            {
              model: File,
              as: 'banner',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
      ],
    });

    if (subscription) {
      const user = await User.findByPk(subscription.user_id);

      await Mail.sendMail({
        to: `${meetup.organizer.name} <${meetup.organizer.email}>`,
        subject: `Nova inscrição no meetup ${meetup.title}`,
        template: 'subscription',
        context: {
          organizer: meetup.organizer.name,
          title: meetup.title,
          user: user.name,
          email: user.email,
        },
      });
    }

    return res.json(subscription);
  }
}

export default new SubscriptionController();
