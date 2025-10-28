import { describe, it, expect, beforeEach, vi } from 'vitest';
import request from 'supertest';
import app from '../backend/index.js';
import { supabase } from '../backend/client.js';

vi.mock('../backend/client.js', () => ({
  supabase: {
    from: vi.fn(),
  },
}));

describe('POSTS ROUTES', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /posts', () => {
    it('should return a list of posts', async () => {
      const mockData = [{ id: 1, title: 'Hello', description: 'World' }];

      const selectMock = vi.fn().mockReturnValue({
        order: vi.fn().mockResolvedValue({ data: mockData, error: null }),
      });

      supabase.from.mockReturnValue({ select: selectMock });

      const res = await request(app).get('/posts');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockData);
    });
  });

  describe('POST /posts', () => {
    it('should insert a new post', async () => {
      const newPost = { title: 'New', description: 'Post' };
      const inserted = [{ id: 3, ...newPost }];

      const insertMock = vi.fn().mockReturnValue({
        select: vi.fn().mockResolvedValue({ data: inserted, error: null }),
      });

      supabase.from.mockReturnValue({ insert: insertMock });

      const res = await request(app).post('/posts').send(newPost);
      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(inserted);
    });

  });
});
