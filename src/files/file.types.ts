export type TFile = Pick<
  Express.Multer.File,
  'originalname' | 'buffer' | 'mimetype'
>;
