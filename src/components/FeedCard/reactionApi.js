import { supabase } from './supabaseClient';

// Supabase에 좋아요를 추가하는 함수
export const postSupabaseReaction = async (questionId, type, userId) => {
  const { data, error } = await supabase
    .from('reactions')
    .insert([{ question_id: questionId, type, user_id: userId, is_active: true }]);

  if (error) throw error;
  return data;
};

// Supabase에 좋아요를 취소하는 함수
export const removeSupabaseReaction = async (questionId, type, userId) => {
  const { data, error } = await supabase
    .from('reactions')
    .update({ is_active: false })
    .eq('question_id', questionId)
    .eq('type', type)
    .eq('user_id', userId)
    .eq('is_active', true);

  if (error) throw error;
  return data;
};

// Supabase에서 현재 count를 가져오는 함수
export const getReactionCount = async (questionId, type) => {
  const { data, error } = await supabase
    .from('reactions')
    .select('id')
    .eq('question_id', questionId)
    .eq('type', type)
    .eq('is_active', true);

  if (error) throw error;
  return data.length;
};

// Supabase에서 좋아요 취소된 횟수를 가져오는 함수
export const getCancelledReactionCount = async (questionId, type) => {
  const { data, error } = await supabase
    .from('reactions')
    .select('id')
    .eq('question_id', questionId)
    .eq('type', type)
    .eq('is_active', false);

  if (error) throw error;
  return data.length;
};

