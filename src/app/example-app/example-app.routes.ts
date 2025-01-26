import { Request, Response, Router } from "express";


const exampleRoutes = Router();

exampleRoutes.get('/', (req: Request, res: Response) => {
  return res.json({
    message: 'Get Example Routes'
  });
});


exampleRoutes.post('/', (req: Request, res: Response) => {
  const postData = req.body;
  return res.json({
    message: 'Post Example Routes',
    data: postData
  });
});

export default exampleRoutes;