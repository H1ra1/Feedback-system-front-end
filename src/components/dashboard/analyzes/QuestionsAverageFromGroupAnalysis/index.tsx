import React from 'react';
import SimpleBarChart from '../../charts/SimpleBarChart';

interface QuestionsAverageFromGroupAnalysisProps {
    data: [
        group_id:  number,
        questions: Question[]
    ]
}

interface Question {
    id:           number
    alias:        string
    note_average: number
}

function formattedChartData( props: any ) {
    const  QUESTIONS_FORMATTED: any = [];
    const DATA: any = props.data;

    DATA.questions.forEach( ( question: Question ) => {
        QUESTIONS_FORMATTED.push( {
            label: question.alias,
            value: question.note_average
        } );
    } );

    return QUESTIONS_FORMATTED;
}

function QuestionsAverageFromGroupAnalysis( props: QuestionsAverageFromGroupAnalysisProps ) {
    const AVERAGE_QUESTIONS_NOTES_FORMATTED  = formattedChartData( props );

    return (
        <div>
            <SimpleBarChart chart_data={ AVERAGE_QUESTIONS_NOTES_FORMATTED } chart_aspect={ 2 } />
        </div>
    )
}

export default QuestionsAverageFromGroupAnalysis;
