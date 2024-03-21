
import prisma from '@voosh/lib/prisma'

export const CreateUser = async (profile: any, accessToken: string, refreshToken: string) => {
  let user = await prisma.user.findUnique({
    where: {
      email: profile.emails[0].value
    }
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        username: profile.displayName,
        email: profile.emails[0].value,
        provider: 'google',
      }
    });
  }

  const userProfile = await prisma.profile.upsert({
    where: {
      userId: user.id
    },
    update: {},
    create: {
      userId: user.id,
      name: profile.displayName,
      isPublic: true
    }
  });

  const token = await prisma.token.create({
    data: {
      userId: user.id,
      token: accessToken,
      expiry: new Date()
    }
  });


  return user;
}


