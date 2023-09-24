import { BaseRepository } from '@app/common/BaseRepositories/sequelize-typescript/BaseRepository';
import { Questions } from '../Models/Questions.entity';
import { Stars } from '../Models/Stars.entity';
import { Categorys } from '../Models/Categorys.entity';
import { Op } from 'sequelize';

export class QuestionsRepository extends BaseRepository<Questions> {
  constructor() {
    super(Questions);
  }

  public getQuetions({
    limit,
    offset,
    star,
    category,
    name,
  }: {
    limit: number;
    offset: number;
    star: number;
    category: string;
    name: string;
  }) {
    return Questions.findAll({
      limit,
      offset,
      where: name ? { name: { [Op.like]: `%${name}%` } } : {},
      include: [
        { model: Stars, where: star ? { star: star } : {}, required: false },
        {
          model: Categorys,
          where: category ? { data: { [Op.like]: `${category ? `%${category}%` : '%%'}` } } : {},
          required: false,
        },
      ],
    });
  }
}
