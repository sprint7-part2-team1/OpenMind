import { supabase } from './supabaseClient';

export const postSupabaseReaction = async (questionId, type) => {
  const { data, error } = await supabase
    .from('reactions')
    .insert([{ question_id: questionId, type, is_active: true }]);

  if (error) throw error;
  return data;
};

export const getCancelledReactionCount = async (questionId, type) => {
  const { data, error } = await supabase
    .from('reactions')
    .select('id')
    .eq('question_id', questionId)
    .eq('type', type)
    .eq('is_active', true);

  if (error) throw error;
  return data.length;
};
