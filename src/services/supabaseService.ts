
import { supabase } from '@/integrations/supabase/client';

export interface Category {
  id: string;
  name: string;
  created_at: string;
}

export interface Word {
  id: string;
  term: string;
  pronunciation: string | null;
  part_of_speech: string;
  meaning: string;
  usage: string | null;
  category_id: string;
  created_at: string;
}

export const fetchCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching categories:', error);
    throw new Error(error.message);
  }

  return data || [];
};

export const fetchWordsByCategory = async (categoryId: string): Promise<Word[]> => {
  const { data, error } = await supabase
    .from('words')
    .select('*')
    .eq('category_id', categoryId)
    .order('term');

  if (error) {
    console.error('Error fetching words:', error);
    throw new Error(error.message);
  }

  return data || [];
};

export const searchWordsInSupabase = async (query: string): Promise<Word[]> => {
  const { data, error } = await supabase
    .from('words')
    .select('*')
    .ilike('term', `%${query}%`)
    .order('term');

  if (error) {
    console.error('Error searching words:', error);
    throw new Error(error.message);
  }

  return data || [];
};
