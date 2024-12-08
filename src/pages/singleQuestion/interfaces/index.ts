import { UseMutationResult } from 'react-query';

export interface QuestionData {
  question_title: string;
  results: string[];
  description: string;
  author: string;
  created_at: string;
}
export interface Mutation {
  data?: QuestionData;
}

export interface SingleQuestContainerProps {
  data: QuestionData;
}

export type MutationData = {
  results?: string[];
};

export interface ApiResponse {
  data: QuestionData;
}

export type MutationType = UseMutationResult<QuestionData, Error, void>;

export interface AnswersContainerProps {
  data: QuestionData;
}
export interface CreatedDataProps {
  data: QuestionData;
}
