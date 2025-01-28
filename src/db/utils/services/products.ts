import { takeElements } from '../../../utils/constant/pagination';
import postgresService from '../../config'
import { Product } from '../../model/product';

export const getProducts = ({ page }: { page: number }) => {
  const repository = postgresService.getRepository(Product);
  return repository.findAndCount({
    order: { id: 'ASC' },
    take: takeElements,
    skip: (page-1)*takeElements
  });
}

export const getProduct = ({ id }: { id: number }) => {
  const repository = postgresService.getRepository(Product);
  return repository.findOne({ where: { id } });
}
