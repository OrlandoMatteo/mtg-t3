import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const cardRouter = createTRPCRouter({
  randomCard: publicProcedure.query(({ ctx }) => {
    const randomehdRank: number = Math.floor(Math.random() * 24425)
    return ctx.prisma.cards.findFirst(
      { where: { edhrecRank: randomehdRank },
        select:{manaCost:true,name:true,colors:true}})
  }),
  imageSrc: publicProcedure
    .input(z.object({ src: z.string() }))
  .query(({ ctx, input }) => {
    console.log('input:')
    const result = ctx.prisma.identifiers.findFirst({
      where: {
        identifiers: {
          scryfallId:input.src, 
        }
      },
    });
    return result
  }),
});
