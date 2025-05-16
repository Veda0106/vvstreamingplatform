import { usersRouter } from '@/modules/users/server/procedure';
import { studioRouter } from '@/modules/studio/server/procedures';
import { videosRouter } from '@/modules/videos/server/procedures';
import { searchRouter } from '@/modules/search/server/procedures';
import { commentsRouter } from '@/modules/comments/server/procedure';
import { playlistsRouter } from '@/modules/playlists/server/procedure';
import { categoriesRouter } from '@/modules/categories/server/procedure';
import { videoViewsRouter } from '@/modules/video-views/server/procedure';
import { suggestionsRouter } from '@/modules/suggestions/server/procedure';
import { subscriptionsRouter } from '@/modules/subscriptions/server/procedures';
import { videoReactionsRouter } from '@/modules/video-reactions/server/procedure';
import { commentReactionsRouter } from '@/modules/comment-reactions/server/procedures';
import { createTRPCRouter } from '../init';

export const appRouter = createTRPCRouter({
  users: usersRouter,
  studio: studioRouter,
  videos: videosRouter,
  search: searchRouter,
  comments: commentsRouter,
  playlists: playlistsRouter,
  categories: categoriesRouter,
  videoViews: videoViewsRouter,
  suggestions: suggestionsRouter,
  subscriptions: subscriptionsRouter,
  videoReactions: videoReactionsRouter,
  commentReactions: commentReactionsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;