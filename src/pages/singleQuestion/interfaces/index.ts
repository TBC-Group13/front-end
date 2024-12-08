import { UseMutationResult } from "react-query";

export interface Answer {
  id: number;
  author: string;
  created_at: string;
  text: string;
  is_correct: boolean;
}

export interface QuestionData {
  question_id: number;
  question_title: string;
  description: string;
  author: string;
  created_at: string;
  completed: boolean;
  answers_count: number;
  results: Answer[];
}

export interface Mutation {
  data?: QuestionData;
}

export interface SingleQuestContainerProps {
  data: QuestionData;
}

export type MutationData = {
  results?: Answer[];
};

export interface ApiResponse {
  data: QuestionData;
}

export type MutationType = UseMutationResult<QuestionData, Error, void>;

export interface AnswersContainerProps {
  data: QuestionData;
}

export interface CreatedDataProps {
  data: {
    author: string;
    created_at: string;
  };
}