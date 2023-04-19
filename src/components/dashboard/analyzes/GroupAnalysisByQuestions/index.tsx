'use client'

import React, { useEffect, useRef, useState } from 'react'
import { ResponsiveContainer, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
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
    const [ chartAspect, setChartAspect ] = useState< number >( 3/1 );
    const GROUP_INFO_REF = useRef< HTMLDivElement >( null );
    const CHART_REF = useRef< HTMLDivElement >( null );
    const QUALITATIVE_REF = useRef< HTMLDivElement >( null );
    const QUALITATIVE_BOX_REF = useRef< HTMLDivElement >( null );
    const ICONS_AREA_REF = useRef< HTMLDivElement >( null );
    const BOXS_CONTAINERS_REF = useRef< HTMLDivElement >( null );

    function prepareBoxToPdf() {

    }

    async function createPdf() {
        setDownloadPdfLoading( true );
        setChartAspect( 4/4 );

        const PDF = new jsPDF("portrait", "pt", "a4");
        const PAGE_HEIGHT = PDF.internal.pageSize.height;

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
        PDF.addImage( CHART_IMAGE, "PNG", 0, GROUP_INFO_REF_HEIGHT + 80, CHART_WIDTH, CHART_HEIGHT );

        const CONTAINERS_BOX: any = BOXS_CONTAINERS_REF.current?.children;

        for ( const BOX of CONTAINERS_BOX ) {
            const BOX_SCROLL = BOX.querySelector( '.box-scroll' );
            BOX_SCROLL.style.overflow = 'auto';
            BOX_SCROLL.style.maxHeight = 'none';
            BOX_SCROLL.style.BOX_SCROLLShadow = 'none';
            BOX_SCROLL.style.backgroundColor = 'transparent';
        }

        PDF.addPage();

        const BOX_ELEMENT = await html2canvas( BOXS_CONTAINERS_REF.current ? BOXS_CONTAINERS_REF.current : new HTMLDivElement );
        const BOX_IMAGE = BOX_ELEMENT.toDataURL("image/png");
        const BOX_PROPS = PDF.getImageProperties( BOX_IMAGE );
        const BOX_WIDTH = PDF.internal.pageSize.getWidth();
        const BOX_HEIGHT = ( BOX_PROPS.height * BOX_WIDTH ) / BOX_PROPS.width;

        let pageHeight = PAGE_HEIGHT;
        let heightLeft = BOX_HEIGHT;
        let position = 10;

        PDF.addImage( BOX_IMAGE, 'PNG', 5, position, BOX_WIDTH, BOX_HEIGHT );
        heightLeft -= pageHeight;

        while ( heightLeft >= 0 ) {
            position = heightLeft - BOX_HEIGHT;
            PDF.addPage();
            PDF.addImage( BOX_IMAGE, 'PNG', 5, position, BOX_WIDTH, BOX_HEIGHT );
            heightLeft -= pageHeight;
        }
        
        PDF.save( `Avaliações - ${areaData.name}.pdf`, { returnPromise: true } ).then( () => {
            if( QUALITATIVE_REF.current !== null && QUALITATIVE_BOX_REF.current !== null && ICONS_AREA_REF.current !== null ) {
                for ( const BOX of CONTAINERS_BOX ) {
                    const BOX_SCROLL = BOX.querySelector( '.box-scroll' );
                    BOX_SCROLL.style.overflow = 'auto';
                    BOX_SCROLL.style.maxHeight = ' 300px';
                    BOX_SCROLL.style.boxShadow = '0px 0px 4px 1px rgba(0, 0, 0, 0.09)';
                    BOX_SCROLL.style.backgroundColor = '#FCFBFC';
                }
                setChartAspect( 3/1 );
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
                    question_alias: area.alias,
                    question: area.question,
                    points: area.note_average,
                    total_average: RESPONDE_PARSED.data.total_average
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
        const radius = 20;

        return (
            <g>
            <circle cx={ width } cy={y - radius - 2} r={radius} fill={colors.highlightColor} />
                <text x={ width } y={y - radius - 2} fill="#fff" textAnchor="middle" dominantBaseline="middle" fontSize={14}>
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
                            <p className='f-18'><strong>Nota média:</strong> { areaData.average_note }</p>
                            <p className='f-18'><strong>Média geral:</strong> { areaData.total_average }</p>
                            <p className='f-18'><strong>Avaliações enviadas:</strong> { areaData.evaluations_sended }</p>
                            <p className='f-18'><strong>Avaliações realizadas:</strong> { areaData.evaluations_done_total }</p>
                            <p className='f-18'><strong>Avaliações não realizadas:</strong> { areaData.evaluations_not_done }</p>
                            <p className='f-18'><strong>Pessoas que não conhecem a área:</strong> { areaData.evaluations_dont_know }</p>
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
                        <ResponsiveContainer width="100%" aspect={ chartAspect } >
                            <RadarChart data={areaDataChart}>
                                <PolarGrid />
                                
                                <PolarAngleAxis dataKey="question_alias" />

                                <PolarRadiusAxis angle={30} domain={[1, 5]} />

                                <Radar 
                                    dataKey='points' 
                                    stroke={colors.highlightColor} 
                                    fill={colors.highlightColor} 
                                    fillOpacity={0.4}
                                    name='Pontuação por questões'
                                    label={ { 
                                        position: 'center', 
                                        fill: '#000',
                                        fontSize: 18,
                                        fontWeight: 600,
                                        angle: 0
                                    } }
                                    isAnimationActive={ false }
                                />

                                <Radar 
                                    dataKey='total_average' 
                                    stroke='#d88107'
                                    fill='#d88107'
                                    fillOpacity={0.2}
                                    name='Média geral'
                                />

                                <Tooltip content={ customTooltip } />
                                <Legend margin={ { top: 80 } } align='center' />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                    
                    <div ref={BOXS_CONTAINERS_REF}>
                        <div className={ `${styles['group-analysis-text-notes-holder']} m-t-40 flex flex-column flex-align-center` } ref={ QUALITATIVE_REF }>
                            <div className={ `${styles['group-analysis-text-notes__title']}` }>
                                <p>Pontos fortes e fracos</p>
                            </div>
                            
                            <div className={ `${styles['group-analysis-text-notes__scroll_box']} box-scroll custom-purple-scrollbar default-shadow` } ref={ QUALITATIVE_BOX_REF }>
                                { areaData.text_notes.map( ( ( note: string, index: number ) => (
                                    <div className={ `${styles['group-analysis-text-note']}` } key={ index }>
                                        <p>{ note }</p> 
                                    </div>
                                ) ) ) }
                            </div>
                        </div>

                        <div className={ `${styles['group-analysis-text-notes-holder']} m-t-40 flex flex-column flex-align-center` } ref={ QUALITATIVE_REF }>
                            <div className={ `${styles['group-analysis-text-notes__title']}` }>
                                <p>Pessoas que não conhecem a área</p>
                            </div>
                            
                            <div className={ `${styles['group-analysis-text-notes__scroll_box']} box-scroll custom-purple-scrollbar default-shadow` } ref={ QUALITATIVE_BOX_REF }>
                                { areaData.dont_know_users.map( ( ( note: string, index: number ) => (
                                    <div className={ `${styles['group-analysis-text-note']}` } key={ index }>
                                        <p>{ note }</p> 
                                    </div>
                                ) ) ) }
                            </div>
                        </div>

                        <div className={ `${styles['group-analysis-text-notes-holder']} m-t-40 flex flex-column flex-align-center` } ref={ QUALITATIVE_REF }>
                            <div className={ `${styles['group-analysis-text-notes__title']}` }>
                                <p>Pessoas que não realizaram a avaliação</p>
                            </div>
                            
                            <div className={ `${styles['group-analysis-text-notes__scroll_box']} box-scroll custom-purple-scrollbar default-shadow` } ref={ QUALITATIVE_BOX_REF }>
                                { areaData.not_done_users.map( ( ( note: string, index: number ) => (
                                    <div className={ `${styles['group-analysis-text-note']}` } key={ index }>
                                        <p>{ note }</p> 
                                    </div>
                                ) ) ) }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default GroupAnalysisByQuestions;