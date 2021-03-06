import * as Yup from 'yup';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().required().email(),
    });

    const { email } = req.body;
    let user = await User.findOne({ email });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid Email' });
    }

    if (!user) {
      user = await User.create({ email });
    }

    return res.json(user);
  }
}

export default new SessionController();
