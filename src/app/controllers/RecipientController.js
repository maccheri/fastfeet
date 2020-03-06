import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      address: Yup.string().required(),
      number: Yup.number()
        .integer()
        .positive()
        .required(),
      address_line: Yup.string(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      address: Yup.string().required(),
      number: Yup.number()
        .integer()
        .positive()
        .required(),
      address_line: Yup.string(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { id } = req.params;
    const { name } = req.body;

    const recipient = await Recipient.findByPk(id);

    if (name && name !== recipient.name) {
      const recipientExists = await Recipient.findOne({ where: { name } });

      if (recipientExists) {
        return res
          .status(400)
          .json({ error: 'Recipient already exists with this name.' });
      }
    }

    const updatedRecipient = await recipient.update(req.body);

    return res.json(updatedRecipient);
  }
}

export default new RecipientController();
