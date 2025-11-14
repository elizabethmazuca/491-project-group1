'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  MessageCircle,
  Heart,
  Share2,
  ImageIcon,
  Hash,
  MessageSquarePlus,
} from 'lucide-react'

interface Comment {
  id: string
  author: string
  content: string
  timeAgo: string
}

interface Post {
  id: string
  author: string
  handle: string
  team: string
  avatarColor: string
  timeAgo: string
  content: string
  tags: string[]
  likes: number
  liked: boolean
  comments: Comment[]
}

const initialPosts: Post[] = [
  {
    id: 'post-1',
    author: 'Samantha Reed',
    handle: '@sammyscores',
    team: 'Arsenal',
    avatarColor: 'bg-red-500',
    timeAgo: '5m',
    content:
      'Bukayo Saka is in outrageous form right now. Nine goal contributions in his last five matches 🔥 #Gunners',
    tags: ['Arsenal', 'PremierLeague', 'FormWatch'],
    likes: 128,
    liked: false,
    comments: [
      {
        id: 'comment-1',
        author: 'Diego Martinez',
        content:
          'When he drifts inside it opens the entire pitch. Absolutely electric.',
        timeAgo: '2m',
      },
    ],
  },
  {
    id: 'post-2',
    author: 'Hoops Insider',
    handle: '@hoopsinsider',
    team: 'Celtics',
    avatarColor: 'bg-green-500',
    timeAgo: '22m',
    content:
      'Jayson Tatum recorded his third 40-piece of the month tonight. Boston now 9-1 when he hits that mark. MVP chatter is real. 🏀',
    tags: ['NBA', 'Celtics', 'MVP'],
    likes: 96,
    liked: false,
    comments: [
      {
        id: 'comment-2',
        author: 'Court Vision',
        content: 'Those step-back threes felt unfair. Defense had no answer.',
        timeAgo: '12m',
      },
      {
        id: 'comment-3',
        author: '3andD',
        content: 'It all starts with their ball movement. Everyone gets touches.',
        timeAgo: '9m',
      },
    ],
  },
  {
    id: 'post-3',
    author: 'Gridiron Pulse',
    handle: '@gridironpulse',
    team: 'Chiefs',
    avatarColor: 'bg-yellow-500',
    timeAgo: '1h',
    content:
      'Mahomes to Kelce is still the cheat code. Chiefs just clinched the top seed with that dagger up the seam. AFC runs through Arrowhead. 🏈',
    tags: ['NFL', 'Chiefs', 'Playoffs'],
    likes: 204,
    liked: false,
    comments: [
      {
        id: 'comment-4',
        author: 'KC Faithful',
        content: 'Spagnuolo deserves flowers too. Defense has been lights out.',
        timeAgo: '35m',
      },
    ],
  },
]

const avatarInitials = (name: string) => {
  const parts = name.split(' ')
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [newPost, setNewPost] = useState<string>('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({})

  const trendingTags = useMemo(() => {
    const allTags = posts.flatMap((post) => post.tags)
    const counts = allTags.reduce<Record<string, number>>((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1
      return acc
    }, {})
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([tag]) => tag)
  }, [posts])

  const handleToggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]
    )
  }

  const filteredPosts = useMemo(() => {
    if (!selectedTags.length) return posts
    return posts.filter((post) =>
      selectedTags.every((tag) => post.tags.includes(tag))
    )
  }, [posts, selectedTags])

  const handleCreatePost = () => {
    const trimmed = newPost.trim()
    if (!trimmed) return

    const newPostEntry: Post = {
      id: `post-${Date.now()}`,
      author: 'You',
      handle: '@you',
      team: 'Community',
      avatarColor: 'bg-orange-500',
      timeAgo: 'Just now',
      content: trimmed,
      tags: ['Community'],
      likes: 0,
      liked: false,
      comments: [],
    }

    setPosts((prev) => [newPostEntry, ...prev])
    setNewPost('')
    setSelectedTags([])
  }

  const handleToggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post
        const liked = !post.liked
        return {
          ...post,
          liked,
          likes: liked ? post.likes + 1 : Math.max(0, post.likes - 1),
        }
      })
    )
  }

  const handleCommentChange = (postId: string, value: string) => {
    setCommentDrafts((prev) => ({
      ...prev,
      [postId]: value,
    }))
  }

  const handleAddComment = (postId: string) => {
    const draft = commentDrafts[postId]?.trim()
    if (!draft) return

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author: 'You',
      content: draft,
      timeAgo: 'Just now',
    }

    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [...post.comments, newComment],
            }
          : post
      )
    )

    setCommentDrafts((prev) => ({
      ...prev,
      [postId]: '',
    }))
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="flex items-center justify-between px-6 py-4 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <Link href="/">
            <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
          </Link>
          <Link href="/">
            <span className="text-white font-bold text-xl">Betz</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/sports"
            className="text-white hover:text-orange-500 transition-colors"
          >
            Sports
          </Link>
          <Link href="/feed" className="text-orange-500 transition-colors">
            Feed
          </Link>
          <Link
            href="/live"
            className="text-white hover:text-orange-500 transition-colors"
          >
            Live
          </Link>
          <Link
            href="/promotions"
            className="text-white hover:text-orange-500 transition-colors"
          >
            Promotions
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="/assistant">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded flex items-center space-x-2">
              <MessageCircle className="h-4 w-4" />
              <span>Ask Rob</span>
            </Button>
          </Link>
          <Link
            href="/auth/signin"
            className="text-white hover:text-orange-500 transition-colors"
          >
            Login
          </Link>
          <Link href="/auth/signup">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded">
              Sign Up
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 grid gap-8 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <MessageSquarePlus className="h-5 w-5 text-orange-500" />
                Share something with the community
              </CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share your hot take, live reaction, or betting insight..."
                className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                rows={4}
              />
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <ImageIcon className="h-4 w-4" />
                  Add media (coming soon)
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Hash className="h-4 w-4" />
                  <span>Select tags to filter</span>
                </div>
              </div>
              {trendingTags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {trendingTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleToggleTag(tag)}
                      className={`rounded-full border px-3 py-1 text-xs uppercase tracking-wide transition-colors ${
                        selectedTags.includes(tag)
                          ? 'border-orange-500 bg-orange-500 text-white'
                          : 'border-gray-700 bg-gray-900 text-gray-300 hover:border-orange-500 hover:text-orange-500'
                      }`}
                      type="button"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              )}
              <div className="mt-6 flex justify-end">
                <Button
                  onClick={handleCreatePost}
                  className="bg-orange-500 hover:bg-orange-600"
                  disabled={!newPost.trim()}
                >
                  Post to Feed
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="bg-gray-800 border-gray-700">
                <CardHeader className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-full ${post.avatarColor}`}
                    >
                      <span className="text-white font-semibold">
                        {avatarInitials(post.author)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-white">{post.author}</div>
                      <div className="text-sm text-gray-400">
                        {post.handle} · {post.timeAgo}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={`${post.id}-${tag}`}
                        className="rounded-full bg-gray-900 px-3 py-1 text-xs uppercase tracking-wide text-gray-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="leading-relaxed text-gray-100">{post.content}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <button
                      onClick={() => handleToggleLike(post.id)}
                      className={`flex items-center gap-2 transition-colors ${
                        post.liked ? 'text-orange-400' : 'hover:text-orange-400'
                      }`}
                      type="button"
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          post.liked ? 'fill-orange-400 text-orange-400' : ''
                        }`}
                      />
                      <span>{post.likes}</span>
                    </button>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      <span>{post.comments.length}</span>
                    </div>
                    <button
                      type="button"
                      className="flex items-center gap-2 hover:text-orange-400"
                      onClick={() => navigator.clipboard?.writeText(post.content)}
                    >
                      <Share2 className="h-5 w-5" />
                      Share
                    </button>
                  </div>

                  <div className="space-y-4">
                    {post.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="rounded-lg border border-gray-700 bg-gray-900 p-3"
                      >
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span className="font-semibold text-gray-300">
                            {comment.author}
                          </span>
                          <span>{comment.timeAgo}</span>
                        </div>
                        <p className="mt-2 text-sm text-gray-200">{comment.content}</p>
                      </div>
                    ))}

                    <div className="rounded-lg border border-gray-700 bg-gray-900 p-3">
                      <textarea
                        value={commentDrafts[post.id] ?? ''}
                        onChange={(e) => handleCommentChange(post.id, e.target.value)}
                        placeholder="Add a comment..."
                        className="w-full resize-none rounded-md border border-gray-800 bg-gray-900 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                        rows={2}
                      />
                      <div className="mt-2 flex justify-end">
                        <Button
                          size="sm"
                          onClick={() => handleAddComment(post.id)}
                          className="bg-orange-500 hover:bg-orange-600"
                          disabled={!commentDrafts[post.id]?.trim()}
                        >
                          Comment
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredPosts.length === 0 && (
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="py-12 text-center text-gray-400">
                  No posts match the selected tags yet. Share something to get the conversation started!
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <aside className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg text-white">Trending Clubs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center justify-between">
                <span>#Arsenal</span>
                <span className="text-gray-500">12.4K mentions</span>
              </div>
              <div className="flex items-center justify-between">
                <span>#ChiefsKingdom</span>
                <span className="text-gray-500">9.1K mentions</span>
              </div>
              <div className="flex items-center justify-between">
                <span>#HeatCulture</span>
                <span className="text-gray-500">6.7K mentions</span>
              </div>
              <div className="flex items-center justify-between">
                <span>#Bruins</span>
                <span className="text-gray-500">5.8K mentions</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg text-white">Suggested People</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-gray-300">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">Court Vision</div>
                  <div className="text-xs text-gray-500">NBA analytics</div>
                </div>
                <Button size="sm" variant="outline" className="border-gray-700 text-gray-200">
                  Follow
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">Pitchside Tactics</div>
                  <div className="text-xs text-gray-500">Premier League breakdowns</div>
                </div>
                <Button size="sm" variant="outline" className="border-gray-700 text-gray-200">
                  Follow
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">Bet Smart</div>
                  <div className="text-xs text-gray-500">Data-driven picks</div>
                </div>
                <Button size="sm" variant="outline" className="border-gray-700 text-gray-200">
                  Follow
                </Button>
              </div>
            </CardContent>
          </Card>
        </aside>
      </main>
    </div>
  )
}

