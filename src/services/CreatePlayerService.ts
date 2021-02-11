import { getCustomRepository } from 'typeorm';
import Player from '../models/Player';
import PlayersRepository from '../repositories/PlayersRepository';

interface IRequest {
  name: string;
}

class CreatePlayerService {
  public async execute({ name }: IRequest): Promise<Player> {
    const playersRepository = getCustomRepository(PlayersRepository);

    const player = playersRepository.create({
      name,
    });

    await playersRepository.save(player);

    return player;
  }
}

export default CreatePlayerService;
