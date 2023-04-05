'use client'

import React, { useEffect, useRef, useState } from 'react'
import { ResponsiveContainer, Tooltip, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, RadarChart } from 'recharts';
import FeederLoading from '../../loadings/FeederLoading';
import colors from '@/styles/colors.module.scss';
import styles from './styles.module.scss';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import ButtonActionTiny from '../../buttons/ButtonActionTiny';
import { AiOutlineFilePdf } from 'react-icons/ai';

interface QuestionsAnalysisProps {
    group_id: number
}

function GroupAnalysisByQuestions( props: QuestionsAnalysisProps ) {
    const [ areaDataChart, setAreaDataChart ] = useState< any >( [] );
    const [ areaData, setAreaData ] = useState< any >( [] );
    const [ loading, setLoading ] = useState< boolean >( true );
    const [ downloadPdfLoading, setDownloadPdfLoading ] = useState< boolean >( false );
    const GROUP_INFO_REF = useRef< HTMLDivElement >( null );
    const CHART_REF = useRef< HTMLDivElement >( null );
    const QUALITATIVE_REF = useRef< HTMLDivElement >( null );
    const QUALITATIVE_BOX_REF = useRef< HTMLDivElement >( null );
    const ICONS_AREA_REF = useRef< HTMLDivElement >( null );

    async function createPdf() {
        setDownloadPdfLoading( true );

        const PDF = new jsPDF("portrait", "pt", "a4");

        PDF.setTextColor( 141, 21, 236 );
        PDF.setFontSize( 18 );
        PDF.text( areaData.name, 5, 30 );

        // GROUP INFO
        const GROUP_INFO_REF_ELEMENT = await html2canvas( GROUP_INFO_REF.current ? GROUP_INFO_REF.current : new HTMLDivElement );
        const GROUP_INFO_REF_IMAGE = GROUP_INFO_REF_ELEMENT.toDataURL("image/png");
        const GROUP_INFO_REF_PROPS = PDF.getImageProperties( GROUP_INFO_REF_IMAGE );
        const GROUP_INFO_REF_WIDTH = PDF.internal.pageSize.getWidth();
        const GROUP_INFO_REF_HEIGHT = (GROUP_INFO_REF_PROPS.height * GROUP_INFO_REF_WIDTH) / GROUP_INFO_REF_PROPS.width;
        PDF.addImage( GROUP_INFO_REF_IMAGE, "PNG", 5, 50, GROUP_INFO_REF_WIDTH, GROUP_INFO_REF_HEIGHT );

        // CHART
        const CHART_ELEMENT = await html2canvas( CHART_REF.current ? CHART_REF.current : new HTMLDivElement );
        const CHART_IMAGE = CHART_ELEMENT.toDataURL("image/png");
        const CHART_PROPS = PDF.getImageProperties( CHART_IMAGE );
        const CHART_WIDTH = PDF.internal.pageSize.getWidth();
        const CHART_HEIGHT = (CHART_PROPS.height * CHART_WIDTH) / CHART_PROPS.width;
        PDF.addImage( CHART_IMAGE, "PNG", 5, GROUP_INFO_REF_HEIGHT + 80, CHART_WIDTH, CHART_HEIGHT );

        // QUALITATIVE
        if( QUALITATIVE_REF.current !== null && QUALITATIVE_BOX_REF.current !== null ) {
            QUALITATIVE_BOX_REF.current.style.overflow = 'auto';
            QUALITATIVE_BOX_REF.current.style.maxHeight = 'none';
            QUALITATIVE_BOX_REF.current.style.boxShadow = 'none';
            QUALITATIVE_BOX_REF.current.style.backgroundColor = 'transparent';
            const QUALITATIVE_ELEMENT = await html2canvas( QUALITATIVE_REF.current ? QUALITATIVE_REF.current : new HTMLDivElement );
            const QUALITATIVE_IMAGE = QUALITATIVE_ELEMENT.toDataURL("image/png");
            const QUALITATIVE_PROPS = PDF.getImageProperties( QUALITATIVE_IMAGE );
            const QUALITATIVE_WIDTH = PDF.internal.pageSize.getWidth();
            const QUALITATIVE_HEIGHT = (QUALITATIVE_PROPS.height * QUALITATIVE_WIDTH) / QUALITATIVE_PROPS.width;
            PDF.addImage( QUALITATIVE_IMAGE, "PNG", 5, CHART_HEIGHT + 100, QUALITATIVE_WIDTH, QUALITATIVE_HEIGHT );
        }

        
        
        
        PDF.save( `Avaliações - ${areaData.name}.pdf`, { returnPromise:true } ).then( () => {
            if( QUALITATIVE_REF.current !== null && QUALITATIVE_BOX_REF.current !== null && ICONS_AREA_REF.current !== null ) {
                QUALITATIVE_BOX_REF.current.style.overflow = 'auto';
                QUALITATIVE_BOX_REF.current.style.maxHeight = ' 300px';
                QUALITATIVE_BOX_REF.current.style.boxShadow = '0px 0px 4px 1px rgba(0, 0, 0, 0.09)';
                QUALITATIVE_BOX_REF.current.style.backgroundColor = '#FCFBFC';
                setDownloadPdfLoading( false );
            }
        } );
    }

    useEffect( () => {
        async function getQuestionGroupPerQuestionsAverage() {
            setLoading( true );
            const RESPONSE = await fetch( `${process.env.NEXT_PUBLIC_API_BASE}/analysis/questions-group/average/area/${props.group_id}/` );
        
            if( ! RESPONSE.ok )
                throw new Error( RESPONSE.statusText );
        
            const RESPONDE_PARSED = await RESPONSE.json();
            const AREA_DATA: any[] = [];
            RESPONDE_PARSED.data.note_per_questions.forEach( ( area: any ) => {
                AREA_DATA.push( {
                    id: area.id,
                    question: area.alias,
                    points: area.note_average
                } );
            } );

            setAreaDataChart( AREA_DATA );
            setAreaData( RESPONDE_PARSED.data );
            setLoading( false );
        }

        getQuestionGroupPerQuestionsAverage();
    }, [ props.group_id ] );

    function customTooltip( { active, payload, label }: any ) {
        if( active && payload && payload.length )
            return (
                <div className="default-custom-tooltip">
                    <div className="default-custom-tooltip__header">
                        <p>{ payload[0] && payload[0].payload.question }</p>
                    </div>

                    <div className="default-custom-tooltip__content">
                        <p className="label"><strong>Nota média:</strong> { payload[0] && payload[0].value }</p>
                    </div>
                </div>
            );
    }

    function customBarLabelList( props: any ) {
        const { x, y, width, height, value } = props;
        const radius = 15;

        return (
            <g>
            <circle cx={x + width / 2} cy={y - radius - 5} r={radius} fill={colors.highlightColor} />
                <text x={x + width / 2} y={y - radius - 5} fill="#fff" textAnchor="middle" dominantBaseline="middle" fontSize={10}>
                    { value }
                </text>
            </g>
        );
    }

    return (
        <>
            { loading ? <FeederLoading /> :
                <div className={`${styles['group-analysis']} col-xl col-xl-12 custom-purple-scrollbar`}>
                    <div className='flex flex-justify-between flex-align-center'>
                        <div ref={ GROUP_INFO_REF } style={ { width: '100%' } }>
                            <h3 className={`f-22 f-c-highlight`}>Nota média por pergunta</h3>
                            <p><strong>Nota média:</strong> { areaData.average_note }</p>
                            <p><strong>Avaliações recebidas:</strong> { areaData.evaluations_done_total }</p>
                        </div>

                        <div style={ { marginRight: '10px' } } ref={ ICONS_AREA_REF }>
                            <ButtonActionTiny 
                                icon={<AiOutlineFilePdf />} 
                                bgColor={colors.highlightColor} 
                                tooltip="Baixar como PDF"
                                onClick={ () => createPdf() }
                                loading={ downloadPdfLoading }
                            />
                        </div>
                    </div>
        
                    <div ref={ CHART_REF }>
                        <ResponsiveContainer width="100%" aspect={4/1}>
                            <RadarChart data={areaDataChart}>
                                <PolarGrid />
                                
                                <PolarAngleAxis dataKey="question" />

                                <PolarRadiusAxis angle={30} domain={[1, 5]} />

                                <Radar 
                                    dataKey='points' 
                                    stroke={colors.highlightColor} 
                                    fill={colors.highlightColor} 
                                    fillOpacity={0.6}
                                />

                                <Tooltip content={ customTooltip } />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className={ `${styles['group-analysis-text-notes-holder']} m-t-40 flex flex-column flex-align-center` } ref={ QUALITATIVE_REF }>
                        <div className={ `${styles['group-analysis-text-notes__title']}` }>
                            <p>Pontos fortes e fracos</p>
                        </div>
                        
                        <div className={ `${styles['group-analysis-text-notes__scroll_box']} custom-purple-scrollbar default-shadow` } ref={ QUALITATIVE_BOX_REF }>
                            { areaData.text_notes.map( ( ( note: string, index: number ) => (
                                <div className={ `${styles['group-analysis-text-note']}` } key={ index }>
                                    <p>{ note }</p> 
                                </div>
                            ) ) ) }
                        </div>
                        
                    </div>
                </div>
            }
        </>
    )
}

export default GroupAnalysisByQuestions;