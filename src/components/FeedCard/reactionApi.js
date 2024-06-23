import { supabase } from './supabaseClient';

// Supabase에 좋아요를 추가하는 함수
export const postSupabaseReaction = async (questionId, type) => {
  const { data, error } = await supabase
    .from('reactions')
    .insert([{ question_id: questionId, type, is_active: true }]);

  if (error) throw error;
  return data;
};

// Supabase에서 좋아요 취소된 횟수를 가져오는 함수
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
