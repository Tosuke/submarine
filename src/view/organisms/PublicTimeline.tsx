import React, { useCallback } from 'react'
import { PostList } from './PostList'
import { useValueObservable } from '../../hooks/useObservable'
import { usePublicTimelineBloc } from '../../hooks/inject'

export const PublicTimeline: React.FC = () => {
  const publicTLBloc = usePublicTimelineBloc()
  const posts = useValueObservable(() => publicTLBloc.posts$, [publicTLBloc])
  const refreshing = useValueObservable(() => publicTLBloc.isFetchingLatestPosts$, [publicTLBloc])
  const onRefresh = useCallback(() => publicTLBloc.fetchLatestPosts$.next(100), [publicTLBloc])
  const loadMore = useCallback(() => publicTLBloc.fetchMorePosts$.next(20), [publicTLBloc])

  return (
    <PostList
      posts={posts}
      refreshing={refreshing}
      onRefresh={onRefresh}
      loadMore={loadMore}
      scrollToTopEvent={publicTLBloc.scrollToTopEvent$}
    />
  )
}