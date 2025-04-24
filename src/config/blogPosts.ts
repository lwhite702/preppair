
export interface BlogPost {
  title: string;
  excerpt: string;
  author: string;
  readTime: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    title: "Top 10 Behavioral Interview Questions and How to Answer Them",
    excerpt: "Master the most common behavioral questions with our comprehensive guide...",
    author: "Career Coach Sarah",
    readTime: "5 min read",
    image: "/lovable-uploads/44b0c31d-e74b-4dd2-b3b3-35b68584b8a3.png"
  },
  {
    title: "Technical Interview Preparation: A Complete Guide",
    excerpt: "Everything you need to know about preparing for technical interviews...",
    author: "Tech Lead Michael",
    readTime: "8 min read",
    image: "/lovable-uploads/44b0c31d-e74b-4dd2-b3b3-35b68584b8a3.png"
  },
  {
    title: "How to Write the Perfect Follow-up Email",
    excerpt: "Learn the art of writing effective post-interview follow-up emails...",
    author: "HR Expert Emily",
    readTime: "4 min read",
    image: "/lovable-uploads/44b0c31d-e74b-4dd2-b3b3-35b68584b8a3.png"
  }
];
