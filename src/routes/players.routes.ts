import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import PlayersRepository from '../repositories/PlayersRepository';
import CreatePlayerService from '../services/CreatePlayerService';

// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const playersRouter = Router();

// playersRouter.use(ensureAuthenticated);

playersRouter.get('/', async (request, response) => {
  const playersRepository = getCustomRepository(PlayersRepository);
  const players = await playersRepository.find();

  return response.json(players);
});

playersRouter.post('/', async (request, response) => {
  try {
    const { name } = request.body;

    const createPlayer = new CreatePlayerService();

    const player = await createPlayer.execute({
      name,
    });

    return response.json(player);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default playersRouter;
