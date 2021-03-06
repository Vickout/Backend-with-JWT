import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';
import UserMap from '../mappers/UserMap';

class UserController {
  public index(req: Request, res: Response): Response {
    return res.send({ userID: req.userId });
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const repository = getRepository(User);
    const { name, email, password } = req.body;

    const userExists = await repository.findOne({ where: { email } });

    if (userExists) {
      return res.sendStatus(409);
    }

    const user = repository.create({ name, email, password });
    await repository.save(user);

    const mappedUser = UserMap.toDTO(user);

    return res.json(mappedUser);
  }
}

export default new UserController();
