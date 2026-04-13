import { createUploadthing, type FileRouter } from 'uploadthing/express';

const uploadBuilder = createUploadthing();

export const uploadRouter = {
  newsImage: uploadBuilder({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(({ req }) => {
      const admin = (req as any).admin;
      if (!admin) throw new Error('Unauthorised');
      return { adminId: admin.id };
    })
    .onUploadComplete(({ metadata, file }: any) => {
      return { url: file.url };
    }),

  newsVideo: uploadBuilder({ video: { maxFileSize: '64MB', maxFileCount: 1 } })
    .middleware(({ req }) => {
      const admin = (req as any).admin;
      if (!admin) throw new Error('Unauthorised');
      return { adminId: admin.id };
    })
    .onUploadComplete(({ metadata, file }: any) => {
      return { url: file.url };
    }),
} as FileRouter;

export type OurFileRouter = typeof uploadRouter;
