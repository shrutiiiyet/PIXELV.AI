import express from 'express';
import cors from 'cors'
import { supabase } from './client.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/posts', async (req, res) => {

    const { data, error } = await supabase
      .from('Post')
      .select('id, title, description')
      .order('id', { ascending: true });

    res.json(data);  
});

app.post('/posts', async (req, res) => {
    const { title, description } = req.body;

    const { data, error } = await supabase
      .from('Post')
      .insert([{ title, description }])
      .select();

});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
