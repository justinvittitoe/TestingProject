import {Schema} from 'mongoose'

interface Interception {
    id: string;
    request: {
        body: any;
        headers: Record<string, string>;
        method: string;
        url: string;
    };
    response: {
        body: [Question]; // This is where your `questions` data resides
        headers: Record<string, string>;
        statusCode: number;
    };
}

interface Answers {
    text: string;
    isCorrect: boolean;
    _id: Schema.Types.ObjectId
}

interface Question {
    _id: Schema.Types.ObjectId
    question: string;
    answers: [Answers]
} 

export type { Question }
